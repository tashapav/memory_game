import path, { dirname} from 'path'
import { fileURLToPath } from 'url'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import "@babel/polyfill"


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimiz = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

export default {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill','./index.js'],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist')
    },
    optimization: optimiz(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({patterns: [
            {
                from: path.resolve(__dirname,'src/favicon.ico'),
                to:path.resolve(__dirname,'dist')
            },
        ]}),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
}