import http, {IncomingMessage, ServerResponse} from 'http';
import os from "os"

const port: number = 2800
const server = http.createServer((req: IncomingMessage, res:ServerResponse<IncomingMessage>) => {
    res.writeHead(200,)

    let userAgent = req.rawHeaders.splice(7,3).toString().split(",")[2];
    console.log(userAgent)
    res.write(`you are using ${userAgent} with a version of ${os.version()}, a total memory of ${os.totalmem} and an arch of ${os.arch}to access me`);
    res.end();
})


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});