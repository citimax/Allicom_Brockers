const http = require('http');
const App = require('./app');

const port = process.env.PORT || 5001;
const server = http.createServer(App);

server.listen(port, console.log(`server started at port ${port}`));



// const server = http.createServer((req, res) => {
//     res.end('Welcome to Node!');
// });

// server.listen(port, () => {
//     console.log(`server listening on host: ${hostname} port: ${port}`);
// });