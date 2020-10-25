const http = require('http');
const hostname = '127.0.0.1'
const listeningPort = 666

const requestListener = function (request, response) {
    console.log(request && 'a request was made!');
    response.writeHead(200);
    // TODO: Create logic for handling 'cors pre-flight requests' and http 'post' requests.
    response.setHeader('Content-Type', 'text/plain')
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Headers', 'origin, X-requested-with, Content-Type, Accept')
    response.end('Hello Milo');
}

const server = http.createServer(requestListener);

server.listen(listeningPort, hostname, () => {
    console.log(`server is running/listening at http://${hostname}:${listeningPort}/`)
});

// need to implement CORS policy: Access-Control-Allow-Origin' header 
// need to implement what to do with content in the request
// express.js server cors policy implementation code:
/* server.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'origin, X-requested-with, Content-Type, Accept');
    next()
}) */
// presumably when I use fetch to 'http://localhost:666' it will hit this server.
// if use a 'post' in the client request header, and I use logic on server to check for 'post' header,
// I can tell the server what to do with the body of the request (which will hopefully be the JSON form data!)
// when it recieves the post request(with content.)
