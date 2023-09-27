import http , {ServerResponse, IncomingMessage} from "http";
import path from "path";
import fs from "fs";
import axios from "axios";

const Port = 3200;

interface iMessage{
    message: string,
    success: boolean,
    data: null|{}|{}[]

}

const Server = http.createServer((req: IncomingMessage , rep:ServerResponse<IncomingMessage>)=>{
    rep.setHeader("content-Type" , "application/json");

    const {method , url} = req;

    let Status = 404;

    let response:iMessage = {
        message: "failed ",
        success: false,
        data: null
    };

    if (method === "POST" && url === "/getgithubuserdetails") {
        let requestBody = "";

        req.on("data", (chunk)=>{
            requestBody += chunk;
        }).on("end", async()=>{
            let requestData = JSON.parse(requestBody);
         

            const {userName} = requestData;
            if(!userName || !requestData){
                Status = 404;

                response.message= "failed request data";
                response.success= false;
                response.data= null;

                rep.write(JSON.stringify({response , Status}));
                rep.end()
            };
            const githubendpoint = await axios.get(`http://api.github.com/users/${userName}`);
             if(githubendpoint.status){
                        const userdetails = githubendpoint.data;
        
                      const userAvatar = userdetails.avater_url;
                      const avaterFileName = `${userName}_avater.jpeg`;
        
                      const avaterFolder = path.join(__dirname, "Github_avater", avaterFileName);
        
                      const getAvaterUrl = await axios.get(userAvatar,{responseType: "stream"});
        
                         getAvaterUrl.data.pipe(fs.createWriteStream(avaterFolder));
        
                         Status = 200;
                         response.message = `${userdetails?.name? userdetails?.name:userName} avater review successful`;
                         response.data = userdetails;
                         response.success = true;
        
                         rep.write(JSON.stringify({response , Status}));
                         rep.end();
            }else{
                        Status = 404;
                        response.message = "error review";
                        response.success = false;
                        response.data = null;
        
                        rep.write(JSON.stringify({response, Status}));
                        rep.end()
                    };
       });


}else{
    
        response.message= "check up your route";
        response.success= false;
        response.data = null;

        rep.write(JSON.stringify({response, Status}));
        rep.end()
   
}
});
Server.listen(Port, ()=>{
    console.log("listen up and running");
    
})