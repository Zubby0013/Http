import http, {ServerResponse , IncomingMessage} from "http";

const Port = 3000

interface imessage{
    message: string,
    success: boolean,
    data: null|[] |{}[]
};

interface iData{
    id: number,
    name: string,
    age: number
};

let Data:iData[] =[
{
    id: 1,
    name: "Nzube",
    age: 20
},
{
    id: 2,
    name: "Ahmed",
    age: 17
},
{
    id: 3,
    name: "Dan",
    age: 23
},
{
    id: 4,
    name: "Zubby",
    age: 18
}
];

const server = http.createServer((req:IncomingMessage, resp:ServerResponse<IncomingMessage>)=>{
    resp.setHeader("content-Type", "application/json");

    const {method, url} = req;

    let Status = 404;

    let response:imessage = {
        message: "Failed",
        success: false,
        data: null
    };

    let Container:any = [];
    req.on("data",(chunk:any)=>{
        Container.push(chunk);
    }).on("end", ()=>{
        //Get Method
        if(url === "/home" && method === "GET"){
            Status = 200;
            response.message = "Successful";
            response.success = true;
            response.data= Data;

            resp.write(JSON.stringify({response, status}));
            resp.end()
        }
        {
            //post method
            if(url === "/" && method === "POST"){
                 Status = 201;

                 const body = JSON.parse(Container);
                 Data.push(body);

                 response.message = "Added Successfully";
                 response.success = true;
                 response.data = Data;

                 resp.write(JSON.stringify({response, Status}));
                 resp.end()
            }
        }
        {
            //Patch method 
            if(url === "/" && method === "PATCH"){
                Status = 202

                const change = JSON.parse(Container);
                
                let detail = url?.split("/")[1];

                let value = parseInt(detail);

                let GET = Data.some((el)=>{
                    return el.id === value;
                });

                if(GET === false){
                    Status = 404;

                    resp.write(JSON.stringify({response, Status}));

                    (response.message= "user not found");
                    (response.success= false);
                    (response.data = null);

                    resp.end();
                    
                }else{
                    const update = change.name;

                    Data = Data.map((el:any)=>{
                        if(el?.id === value){
                            return {
                                id: el.id,
                                name: el.update,
                                age: el.age
                            }
                        };
                        return el ;
                    })
                    Status = 200;

                    (response.message = update);
                    (response.data = Data);
                    (response.success = true);

                    resp.write(JSON.stringify({response, Status}));

                    resp.end();
                }
            }    
                {
                    // PUT method 
                    if(method === "PUT"){
                         const Change = JSON.parse(Container);

                         let detail: any = url?.split("/")[1];
                         let Dvalue = parseInt(detail);

                         let find = Data.some((el)=>{
                            return el.id === Dvalue;
                         });
                         if(find === false){
                            Status = 404;
                            (response.message = "User not found");
                            (response.data = Data);
                            (response.success = false);
                         };

                         resp.end();
                    }else{
                        let detail: any = url?.split("/")[1];

                        const Change = JSON.parse(Container)
                        const update = Change.name;
                        const updateAge = Change.age;
                        const Dvalue = parseInt(detail)

                        Data = Data.map((el:any)=>{
                             if(el?.id === Dvalue){
                                return{
                                    id: el.id,
                                    name: update,
                                    age: updateAge
                                }
                             }
                             return el
                        });
                        (response.message = "user founded");
                        (response.data = Data);
                        (response.success = true);

                        resp.write(JSON.stringify({response, Status}));

                        resp.end();
                    }
                };
                    {
                        //Delete method 
                        if(method === "DELETE"){
                             const clear = JSON.parse(Container);

                            let source:any = url?.split("/")[1];
                            const num = parseInt(Container);
                             
                            const object = Data.map((el)=>{
                                return el.id === num 
                            });
                            if(source === false){
                                Status = 404;
                                response.message = "delete failed";
                                response.data = Data;
                                response.success = false
                            }else{
                                Data = Data.map((el:any)=>{
                                       if(el?.id === num){
                                        el = null;
                                       }
                                       return el
                                });
                            }
                            Status = 200;
                            response.data=Data;
                            response.message = "delete data sucessfull";
                            response.success = true;

                            resp.write(JSON.stringify ({response , Status}));
                            resp.end()
                        }
                    }
            }
        
    })
});

server.listen(Port,()=>{
       console.log("listen up and running");     
})
