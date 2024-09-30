<!--
    Node.js 'server' folder has its separate package.json ('npm init -y' in 'server')
    Node.js runs on PORT 3000, hence we have a 'proxy' field in clients's package.json
    Clent app runs separately on PORT 3001

    This CRA project contains code examples of the below:

        1. Express server listening to client's HTTP requests
            - Dev server is WebpackDevServer, not Express (for HMR)
            - Sequence of middlewares and routes
        2. Session management and Authentication
            - Session-based authentication (deprecated)
            - JWT-based authentication - stateless
            - Login, Logout, check-session
            - password encryption
        3. Middlewares
            - errorHandler middleware
            - authMiddleware and jwtAuthMiddleware
            - requestLogger middleware
            - Inbuilt Rate limiter middleware
            - difference between error and regular middlewares
        4. Logging
            - Winston logging (logger.js and local file dump)
            - Error and Request logs
        5. API design and Route handling
            - REST API CRUD endpoints, corresponding 'fetch' calls at client-side
            - user auth and product routes
        6. SSR with Node and Express (served on base url of node server '/)
            - Client code served by Node.js instead of WebpackDevServer
            - Transpile client code using babel
                - npx babel src/SSRApp.js --out-file build/SSRApp.js
            - Integrate client code in node.js via ReactDOMServer (server/SSR.js)
            - Serve the server-side rendered HTML (node server.js)
            ** NOTE: the hydration and react hooks are not working in SSRApp.js **
 -->
