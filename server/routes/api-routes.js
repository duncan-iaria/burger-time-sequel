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
// EXPOTS
//=========================
module.exports = router;