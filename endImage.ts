import http, {ServerResponse, IncomingMessage} from "http";
import axios, { Axios } from "axios";
import fs from "fs";
import path from "path";


const Port = 1999

interface iMessage{
    message: string,
    success: boolean,
    Data: null|{}|{}[]
}

const Server = http.createServer((req:IncomingMessage , resp:ServerResponse<IncomingMessage>)=>{
    resp.setHeader("content-Type" , "application/json");

    
    let status = 404;
    const response:iMessage = {
        message: "not successful",
        success: false,
        Data: null
    };
    const {method , url} = req;

    
    
    if (method === "POST" && url === "/Zubby") {
        
        let requestBody = "";
        req.on("data" , (chunk)=>{
           requestBody += chunk
        }).on("end", async()=>{
            let requestData = JSON.parse(requestBody);
             
            const {id} = requestData;
            if(!id || !requestData){
                status = 404;
                response.message = "failed to get product";
                response.Data = null;
                response.success = false

                resp.write(JSON.stringify({response, status}));
                resp.end();
            }
            const fakeRepo = await axios.get(`https://fakestoreapi.com/products/${id}`)
            if(fakeRepo.status){
                  const userData = fakeRepo.data;

                  const userImage = userData.image;
                  const userId = `${id}_image.png`;

                  const imageFolder = path.join(__dirname, "Fake-Avater", userId);

                  const imageUrl = await axios.get(userImage, {responseType:"stream"});

                  imageUrl.data.pipe(fs.createWriteStream(imageFolder))

                  status = 200;
                  response.message = `${userData?.price? userData?.price : id}get image successful`;
                  response.Data =userData;
                  response.success = true;

                  resp.write(JSON.stringify({response , status}));
                resp.end();
            }else{
                status = 404;
                response.message = "no such image ";
                response.Data = null;
                response.success = false;

                resp.write(JSON.stringify({response , status}));
                resp.end();
            }
            //title
    // const Repo = await axios.get(`https://fakestoreapi.com/products/${id}`)
    
    if (fakeRepo.status) {
        const Title = fakeRepo.data;

        const getTitle = Title.title;
        
        const TitleId = `${id}.txt`

        const TitleFolder = path.join(__dirname, "Fake-Title", TitleId);
        const TitleUrl = await axios.get(getTitle,{responseType:"document"})

        TitleUrl.data.pipe(fs.createReadStream(TitleFolder));

        status = 200 ;
        response.message = `${Title?.id? Title?.id : id} Title targetted `;
        response.Data= Title;
        response.success = true;

        resp.write(JSON.stringify({response, status}));
        resp.end();
    } else {
        status = 404;
        response.message = "title not successful";
        response.Data= null;
        response.success =  false;

        resp.write(JSON.stringify({response, status}));
        resp.end();
    }
    //Categories
    if (fakeRepo.status) {
        const Categories = fakeRepo.data;
        
        const catList = Categories.category;
        
        const getCategories = catList.filter((el:any)=>{
            (el === "men's clothing" ||el === "women's clothing" || el === "jewelery" || el === "electronics")
            return getCategories;
        })

        status = 200 ;
        response.message = `${Categories?.category? Categories.category : id}`;
        response.Data = Categories;
        response.success = true;

        resp.write(JSON.stringify({response, status}));
        resp.end();
        
    } else {
        status = 404;
        response.message =  "Categories not found";
        response.Data = null;
        response.success = false;

        resp.write(JSON.stringify({response, status}));
        resp.end();
    }
        });
        
    } else {
        status = 404;
        response.message= "error in browser";
        response.Data = null;
        response.success = false;

        resp.write(JSON.stringify({response, status}))
        resp.end();
    };
    
});

Server.listen(Port, ()=>{
    console.log("listening up");
    
})