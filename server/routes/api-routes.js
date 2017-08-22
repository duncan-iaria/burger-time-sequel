const router = require( 'express' ).Router();
const db = require( '../models' );

//=========================
// GET BURGERS
//=========================
router.get( '/', onGetBurgers );

function onGetBurgers( tRequest, tResponse )
{
    db.Burger.findAll().then( onGetBurgersComplete );
    
    function onGetBurgersComplete( tData )
    {
        tResponse.render( 'index', { burgers: tData } );
    }
}

//=========================
// POST BURGER
//=========================
router.post( '/', onPostBurger )

function onPostBurger( tRequest, tResponse )
{
    let tempBurger = 
    {
        burger_name: tRequest.body.name,
        is_devoured: false
    }

    db.Burger.create( tempBurger ).then( onPostBurgerComplete );
    
    function onPostBurgerComplete( tResult )
    {
        //refresh the page
        console.log( `successfully added burger to database: ${ tResult }` );
        tResponse.redirect( '/' );
    }
}

//=========================
//  BURGER UPDATE
//=========================
router.put( '/:id', onUpdateBurger )

function onUpdateBurger( tRequest, tResponse )
{
    if( tRequest.params.id != null )
    {
        console.log( `update burger with id ${ tRequest.params.id }` );
        db.Burger.update
        ( 
            { is_devoured: true }, 
            { where: { id: tRequest.params.id } }
        ).then( onUpdateBurgerComplete );
    }
    else
    {
        console.log( `there was an error when attempting to update a burger (no id passed)` );
    }

    function onUpdateBurgerComplete( tResult )
    {
        console.log( tResult );
        tResponse.redirect( '/' );
    }
}

//=========================
//  BURGER DELETE
//=========================
router.delete( '/:id', onDeleteBurger )

function onDeleteBurger( tRequest, tResponse )
{
    //console.log( `delete burger ${ tRequest.params.id }` );
    db.Burger.destroy( { where: { id: tRequest.params.id } } ).then( onDeleteBurgerComplete );

    function onDeleteBurgerComplete( tResult )
    {
        console.log( tResult );
        tResponse.redirect( '/' );
    }
}

//=========================
// EXPOTS
//=========================
module.exports = router;