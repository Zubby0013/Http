import http,{ServerResponse ,Server, IncomingMessage} from "http";
import fs from "fs";
import path from "path";


const PORT:number = 1889

const DataSet = [
    {
        id: "1",
        name: "Daniel",
        stack: "half-stack"
    },
    {
        id: "2",
        name: "Jemima",
        stack: "Entry-level",
    },
    {
        id: "3",
        name: "Sean",
        stack: "Full-stack"
    }
]

const server = http.createServer((req: IncomingMessage, res:ServerResponse<IncomingMessage>)=>{
    res.writeHead(200);

    if(req.url === "/", req.method === "GET", res.statusCode === 200){
          res.setHeader("Content-Type", "application/json");
          res.write(JSON.stringify(DataSet));
          res.end()
    }
    res.end()
    
    
//     let connect: string = "site/";

//     switch (req.url){
//         case "/":
//             connect += "home.html";
//             res.statusCode = 200;
//             break;
//             case "/about":
//                 connect += "about.html";
//                 res.statusCode = 200;
//                 break;
//             case "/service":
//                 connect += "service.html";
//                 res.statusCode = 200;
//                 break;
//             case "/404":
//                 connect += "404.html";
//                 res.statusCode = 200;
//                 break;
//     }
//         fs.readFile(path.join(__dirname, connect),(err,data)=>{
//             if(err){
//                 console.log("An error occured",err);
//                 res.end();
//             }else{
//                 res.write(data);
//                 res.end();
//             }
//         })
    
})

server.listen(PORT, () =>{
    console.log(`listening on port: ${PORT}`);
    
})