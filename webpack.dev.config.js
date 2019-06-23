const path = require('path');
// a la fin on retire new TerserPlugin(), car pas de minified en dev
//const TerserPlugin = require('terser-webpack-plugin');
// plus besoin de MiniCssExtractPlugin en dev
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // le fichier js d'entrée
    entry: {
        'hello-world': './src/hello-world.js',
        'kiwi': './src/kiwi.js'
    },

    // ou nous allons mettre tout nos fichier après le npm run build (voir package.json)
    // publicPath car les images vont chercher ici
    /* première config
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'dist/'
    },
    */
   // deuxième config gestion du cache, on change le nom du bundle pour que le navigateur sache quand le dl 
    /* 
   output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'dist/'
    },
    */
    // troisieme config gestion du html via HtmlWebpackPlugin, on change 
    // le nom du du public path pour qu'il ne soit plus dansles balise html 
    /*
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },
    */
    // 4 eme config en dev on ne veut pas rajouter le contenthash au nom du fichier
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },
    //mode: 'none',
    //mode: 'production',
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        index: 'index.html',
        port: 9001
    },
    // pour le css nous utilisons 2 loaders car hcacun fait des choses différentes, ils sont complémentaires.
    // babel loader :
    // presets: ['@babel/env'] permet de prendre les derniers javascript et de transformer pour du javascript
    // compréhensible poru tout les navigateur.
    // plugins: ['transform-class-properties'] les class ne faisant pas partient de javascript dans le preset
    // on est obligé d'ajouter ça.
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['transform-class-properties']
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: [
                    'handlebars-loader'
                ]
            },
        ]
    },
    // plugins sont des librairies qui font ce que les loader ne peuvent faire
    // par exemple, uglifyJSPlugin va minmifier le bundle.js
    // on peut aussi avec d'autre pluggin créer des constante etc ...
    // TerserPlugin to minimize bundle js, TerserPlugin is more recommended of uglifyJsPlugin
    // c'est mieux de faire plusieurs fichier (js, css etc...) car ils sont téléchargé en parallèle 
    // et ça prend moins de temps. MiniCssExtractPlugin va créer un fichier css
    // du coup dans les loader on utilise plus 'style-loader' mais MiniCssExtractPlugin.loader
    // on ajoute ensuite dans le fichier html :
    // contenthash pour changer le nom pour le cache du browser
    // CleanWebpackPlugin va supprimer tout les fichier du dist folder avant un run build
    // HtmlWebpackPlugin va remettre les bon nom de css et js pour le telechargement des fichiers
    // a la fin on retire new TerserPlugin(), car pas de minified en dev
    // plus besoin de MiniCssExtractPlugin en dev
    plugins: [
        //new TerserPlugin(),
        /*
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        */
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'hello-world.html',
            chunks: ['hello-world'],
            title: 'hello world',
            template: 'src/page-template.hbs',
            description: 'hello world'
        }),
        new HtmlWebpackPlugin({
            filename: 'kiwi.html',
            chunks: ['kiwi'],
            title: 'kiwi',
            template: 'src/page-template.hbs',
            description: 'kiwi'
        })
    ]
}