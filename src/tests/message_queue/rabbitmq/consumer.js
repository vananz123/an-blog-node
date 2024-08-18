const amqp =require('amqplib')
const runConsumer = async()=>{
    try{
        const connection = await amqp.connect('amqp://localhost')
        const change =await connection.createChannel()
        const nameQueue = "test-topic"
        await change.assertQueue(nameQueue,{
            durable:true
        })
     
        change.consume(nameQueue, (message)=>{
            console.log(`Revicer m${message?.content.toString()}` )
        },{
            noAck:true
        })
    }catch(error){
        console.error('error',error )
    }
}
runConsumer().catch(console.error)