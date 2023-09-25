
const http = require("http")

const PORT = 3500

const Server = http.createServer((req,resp)=>{
    if(req.url === "/"){
        resp.writeHead(200, {"content-type":"text/html"});
        resp.write("<html><body><p>This is my Home</p></body></html>");
        resp.end()
    }else if(req.url === "/about"){
        resp.writeHead(200, {"content-type": "text/html"})
        resp.write("<html><body><p>This is my About </p></body></html>")
        resp.end()
    }else if(req.url === "/contact"){
        resp.writeHead(200, {"content-type": "text/html"})
        resp.write("<html><body><p>This is my Contact</p></body></html>")
        resp.end()
    }else resp.end("Invalid request")
})

Server.listen(PORT,()=>{
    console.log(`server up and listening`);
})