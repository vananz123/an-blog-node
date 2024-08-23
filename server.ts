import server from './src/app'
require('dotenv').config()
const PORT = process.env.PORT
server.listen(PORT,()=>{
    console.log(`an-blog-node start ${PORT}`)
}).on("error", (error:any) => {
    // gracefully handle error
    throw new Error(error.message);
  })
// process.on('SIGINT', ()=> {
//     server.close(()=> console.log(`exit`))
// })
