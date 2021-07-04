/** @type {import("snowpack").SnowpackUserConfig } */
import sveltePreprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";
import proxy from "http2-proxy";

export default {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
  plugins: [
    [
      "@snowpack/plugin-svelte",
      {
        preprocess: sveltePreprocess({
          defaults: {
            script: 'typescript',
          },
          postcss: {
            plugins: [autoprefixer()]
          }
        })
      }
    ],
    "@snowpack/plugin-dotenv",
    [
      "@snowpack/plugin-typescript",
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: "yarn pnpify tsc" } : {}),
      },
    ],
    "@snowpack/plugin-sass",
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
    {
      src: "/api/.*",
      dest: (req, res) => {
        return proxy.web(req, res, {
          hostname: "localhost",
          port: "5000"
        })
      },
    }
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
    port: 8080,
  },
  buildOptions: {
    /* ... */
  },
};
