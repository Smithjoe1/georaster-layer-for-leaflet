import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

//import envisage from "envisage";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isLite = process.env.LITE === "true";

const config = {
  watch: process.env.WEBPACK_WATCH === "true",
  entry: "./src/georaster-layer-for-leaflet.ts",
  mode: "production",
  target: "web",
  output: {
    filename: "georaster-layer-for-leaflet" + (isLite ? ".lite" : "") + ".js",
    path: resolve(__dirname, "./dist/webpack"),
    library: {
      export: "default",
      name: "GeoRasterLayer",
      type: "umd"
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
      test: /\.(?:js|mjs|cjs)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ]
          }
        }
      },
    ]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    ie: 11
                  }
                }
              ],
              "@babel/preset-typescript"
            ]
          }
        }
      }
    ]
  },
  optimization: {
    minimize: false
 },
  externals: {
    leaflet: { root: "L", commonjs: "leaflet", amd: "leaflet", commonjs2: "leaflet" }
  }
};  

//envisage.assign({ target: config, prefix: "WEBPACK" });

export default config;
