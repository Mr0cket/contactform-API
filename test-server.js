const http = require('http');
const hostname = 'localhost'
const listeningPort = 666
const fs = require('fs')
const _ = require('')
const formData = require('form-data')

function getBoundary(request) {
    console.log(`getting boundary...`)
    let contentType = request.headers['content-type']
    const contentTypeString = contentType.split('/')[1].trim()
    const boundaryPrefix = ';'
    let boundary = contentTypeString + boundaryPrefix
    console.log(`contentType: ${contentType}, contentTypeString: ${contentTypeString}`)
    return boundary
  }


// chunk is the body (content) of the request, as a stream 
// i.e: a stream of binary data. the stream is passed through the callbackFn when the req 'data' event occurs. 
// When the 'end' event occurs, the stream is fully pushed into 'chunk'.
const logData = (chunk) => {
    // chunk: Form-data object encoded as a binary file stream.

    console.log(`formdata: ${chunk}`)

    // data parsing stuff
    // let regex = /[- ,]+|,*WebKitFormBoundary*/g //[a-zA-Z0-9]
    // let parsedForm = data.toString().split(regex)

}

// server response logic
// request: incoming readable stream
// response: server response which is sent to client.
const requestListener = function (request, response) {
    console.log(request && `a ${request.method} request was made!`);
    console.log('reading strimm..')
    console.log('connection:', request.headers.connection)
    if (request.headers['content-type'] === 'multipart/form-data') {
        // Use latin1 encoding to parse binary files correctly. (don't know why yet)
        request.setEncoding('latin1')       
    }
    let boundary = getBoundary(request)
    let regex = new RegExp(boundary + '|' + '\r\n', 'g')
    console.log(`boundary: ${boundary}`)
    request.on('data', (chunk) => {

        console.log(chunk.toString().split(regex).sort(() => true))
    })




    
    /* request.on('data', chunk => {

        console.log(`Data available: \nType: ${typeof(chunk)}\nData: \n${chunk}\n data finished.`)
        // fs.writeFile('./formData-string.txt', parsedForm, () => console.log('file created: /learning Node/formData-string.txt'))
        response.write(chunk);

    }) */
    //set server response properties
    response.statuscode = 202;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", 'origin, X-requested-with, Content-Type, Accept')
    response.shouldKeepAlive = false;

    /* console.log(`statusCode: ${response.statuscode}, \n
    connection: ${response.connection} socket: ${response.socket} finished: ${response.finished}
    outputData: `); */
    // console.log(response.outputData)

    request.on('end', () => {
        console.log('stream finished.');
        response.end('message finished');
    })
}
/* --CORS response headers--
response.setHeader('Content-Type', 'text/html');
response.setHeader("Access-Control-Allow-Origin", "*");
response.setHeader("Access-Control-Allow-Headers", 'origin, X-requested-with, Content-Type, Accept') 
*/

/* Good ${timeOfDay()}, you made a ${request.method} request
            <div>
                        <h1>Good ${timeOfDay()}, you made a ${request.method} request</h1>

                        <h3>body<h3>
                        <p>${response.url}</p>
                        
                        <h3>url: ${request.url}</h3>
                        <h3>Your Headers</h3>
                        <h5>connection: ${request.headers.connection} </h5>
                        <h5>Cache-Control: ${request.headers['cache-control']}</h5>
                        <h5>user-agent: ${request.headers['user-agent']}</h5>
                        <h5>sec-fetch-site: ${request.headers['sec-fetch-site']}</h5>
                        <h5>sec-fetch-mode: ${request.headers['sec-fetch-mode']}</h5>
                        <h5>accept-encoding: ${request.headers['accept-encoding']}</h5>
                        <h5>host: ${request.headers.host}</h5>
                    </div> */

const server = http.createServer(requestListener);

// server listener
server.listen(listeningPort, hostname, () => {
    console.log(`server is running/listening at http://${hostname}:${listeningPort}/`)
});

const timeOfDay = () => {
    let hoursOfDay = new Date().getHours();
    let timeOfDay = new String('');
    if (hoursOfDay < 12) {
        timeOfDay = 'morning';
    } else if (hoursOfDay < 18) {
        timeOfDay = 'afternoon';
    } else timeOfDay = 'evening'

    return timeOfDay;
}

// need to implement CORS policy: Access-Control-Allow-Origin' header 
// need to implement what to do with content in the request
// express.js server cors policy implementation code:
/* 
    server.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'origin, X-requested-with, Content-Type, Accept');
    next()
}) */
// presumably when I use fetch to 'http://localhost:666' it will hit this server.
// if use a 'post' in the client request header, and I use logic on server to check for 'post' header,
// I can tell the server what to do with the body of the request (which will hopefully be the JSON form data!)
// when it recieves the post request(with content.)
