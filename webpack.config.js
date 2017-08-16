const path = require( 'path' );

module.exports =
{
    entry: './server/public/assets/js/main.js',

    output:
    {
        filename: 'bundle.js',
        path: path.resolve( __dirname, 'server/public/build' )
    },

    module:
    {
        rules:
        [
            //CSS BUILD
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            //SASS BUILD
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            //FONTS
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [ 'file-loader' ]
            }
        ]
    }
};