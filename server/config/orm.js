const connection = require( './connection' );
//=========================
//  ORM
//=========================
const orm =
{
    getAllFromTable: function( tTable, tCallback )
    {
        const queryString = 'SELECT * FROM ' + tTable + ';';

        connection.query( queryString, onGetQueryComplete );

        //when the query is complete
        function onGetQueryComplete( tError, tResult )
        {  
            //if there is an error, log it, otherwise call passed callback with the data
            if( tError )
            {
                console.log( `There was an error with the db query: ${tError}` );
            }
            else
            {
                tCallback( tResult );
            }
        }
    },

    createTableEntry: function( tTable, tColumns, tValues, tCallback )
    {
        let queryString = `INSERT INTO ${ tTable } ( ${ tColumns.toString() } ) `;
        queryString += `VALUES ( ${ printQuestionMarks( tValues.length ) } )`;

        console.log( queryString );

        connection.query( queryString, tValues, onCreateEntryComplete );

        //when an entry is created, trigger the passed callback
        function onCreateEntryComplete( tError, tResult )
        {
            if( tError )
            {
                console.log( `there was an error when creating a new record: ${ tError }` );
            }
            else
            {
                tCallback( tResult );
            }
        }
    },

    deleteTableEntryById: function( tTable, tId, tCallback )
    {
        if( tTable != null && tId != null )
        {
            const queryString = `DELETE FROM ${ tTable } WHERE id = ?`;
            connection.query( queryString, tId, onDeleteEntryComplete );
        }
        else
        {
            console.log( `no table or id passed to delete table function` );
        }

        function onDeleteEntryComplete( tError, tResult )
        {
            if( tError )
            {
                console.log( `there was an error when deleting from table by id: ${ tError }` );
            }
            else
            {
                console.log( `record succesfully deleted` );
                tCallback( tResult );
            }
        }
    },

    updateTableEntryById: function( tTable, tId, tColumns, tValues, tCallback )
    {
        if( tTable != null && tId != null )
        {
            let queryString = `UPDATE ${ tTable } SET `;
            queryString += `${ arraysToKeyValue( tColumns, tValues ) } `;
            queryString += `WHERE id = ${ tId }`;

            console.log( queryString );

            connection.query( queryString, onUpdateComplete )
        }

        function onUpdateComplete( tError, tResult )
        {
            if( tError )
            {
                console.log( `there was an error when updating a record: ${ tError }` );
            }
            else
            {
                tCallback( tResult );
            }
        }
    }
}

//=========================
//  EXPORT
//=========================
module.exports = orm;

//=========================
// HELPERS
//=========================
//pass in arrays, get out key/value pairs from the arrays
function arraysToKeyValue( tColumns, tValues )
{
    //make sure they match up (are the same size arrays )
    if( tColumns.length == tValues.length )
    {
        let tempKeyValuePair = [];

        for( let i = tColumns.length - 1; i >= 0; --i )
        {
            let tempPair = tColumns[i] + ' = ' + tValues[i];
            tempKeyValuePair.push( tempPair );
        }

        return tempKeyValuePair.toString();
    }
}

// Helper function for inserting question marks based on number of arguments
function printQuestionMarks( tAmt )
{
    let tempArray = [];

    for( var i = 0; i < tAmt; i++ ) 
    {
        tempArray.push( "?" );
    }   

    return tempArray.toString();
}