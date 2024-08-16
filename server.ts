import server from './src/app'
require('dotenv').config()
import config from './src/configs/config.mongodb'
const PORT = process.env.PORT || config.app.port 
server.listen(PORT,()=>{
    console.log(`an-blog-node start ${PORT}`)
}).on("error", (error:any) => {
    // gracefully handle error
    throw new Error(error.message);
  })
// process.on('SIGINT', ()=> {
//     server.close(()=> console.log(`exit`))
// })
