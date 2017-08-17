require( 'dotenv' ).config( { path: './server/.env' } );
const express = require( 'express' );
const exphbs  = require( 'express-handlebars' );
const bodyParser = require( 'body-parser' );
const methodOverride = require( 'method-override' );
const path = require( 'path' );

// const routes = require( './controllers/burger.controller.js' );

const db = require( './models' );

//=========================
//  SERVER
//=========================
const server = express();
const port = process.env.PORT;
const router = express.Router();

//view paths
const viewPath = path.join( __dirname, 'views/' );
const layoutPath = viewPath + 'layouts/';
const partialPath = viewPath + 'partials/';

//=========================
//  VIEW ENGINE
//=========================
server.engine( 'handlebars', exphbs( { defaultLayout: 'main', layoutsDir: layoutPath, partialsDir: partialPath } ) );
server.set( 'views', viewPath );
server.set( 'view engine', 'handlebars' );

//=========================
//  MIDDLEWARE
//=========================
server.use( express.static( path.join( __dirname, 'public' ) ) );
server.use( bodyParser.urlencoded( { extended: false } ) );
server.use( methodOverride( '_method' ) );

//=========================
//  MAIN ROUTES
//=========================
// server.use( "/", routes );

//=========================
//  INIT
//=========================
//server.listen( port, onServerInit )

db.sequelize.sync().then( function(){ server.listen( port, onServerInit ) } );

function onServerInit()
{
    console.log( `Server is listening at ${ port }` );
}