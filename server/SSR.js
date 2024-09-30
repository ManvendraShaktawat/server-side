const React = require("react");
const ReactDomServer = require("react-dom/server");

const App = require("../build/SSRApp").default;

module.exports = (req, res) => {
  const appString = ReactDomServer.renderToString(React.createElement(App));
  res.send(`
    <html>
    <head>
        <title>SSR Example</title>
    </head>
    <body>
        <div id="app">${appString}</div>
        <script src="/path/to/client/bundle.js"></script>
    </body>
    </html>
  `);
};
