const http = require('http');
// require("http")
const hostname = 'localhost';
const port = 4000;

const server = http.createServer((req, res) => {
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World');

    // if (req="/") {
    //     res.end("helo - adiv")
    // }                                                 // worng.....
    // if (req="/about") {
    //     res.end("kya haal chal")
    // }
    // else (req="/about2") 
    //     res.end("khana kha leaa...")
    if (req.url === "/") {
        res.end("helo - adiv");
    } else if (req.url === "/about") {
        res.end("kya haal chal");
    } else if (req.url === "/about2") {
        res.end("khana kha leaa...");
    } else {
        res.end("Page not found");
    }
    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});