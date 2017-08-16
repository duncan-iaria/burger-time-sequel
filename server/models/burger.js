const orm = require( '../config/orm' );

//CRUD functions for the burgers
const burger = 
{
    //return a list of all the burgers in the db
    getAll: function( tCallback )
    {
        orm.getAllFromTable( 'burgers', onGetComplete )

        function onGetComplete( tResult )
        {   
            tCallback( tResult );
        }
    },

	//create a new burger and add it to the db
    create: function( tTable, tColumns, tValues, tCallback )
    {        
        orm.createTableEntry( tTable, tColumns, tValues, tCallback );
    },

	//update an existing burger in the db (primarily for 'eating' or 'devouring' it)
    update: function( tId, tCallback )
    {
        const tempColumns = [ 'is_devoured' ];
        const tempValues = [ true ];
        
        orm.updateTableEntryById( 'burgers', tId, tempColumns, tempValues, onUpdateComplete );

        function onUpdateComplete( tResult )
        {
            tCallback( tResult );
        }
    },

	//remove a burger entry from the database
    delete: function( tId, tCallback )
    {
        orm.deleteTableEntryById( 'burgers', tId, onDeleteComplete );

        function onDeleteComplete( tResult )
        {
            tCallback( tResult );
        }
    }
}

module.exports = burger;