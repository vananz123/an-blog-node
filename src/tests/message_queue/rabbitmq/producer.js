const amqp =require('amqplib')
const message = "Hello ,RabbitMQ for an blog"
const runProducer = async()=>{
    try{
        const connection = await amqp.connect('amqp://localhost')
        const change =await connection.createChannel()
        const nameQueue = "test-topic"
        await change.assertQueue(nameQueue,{
            durable:true
        })
        change.sendToQueue(nameQueue, Buffer.from(message))
        console.log('Message send',message )
    }catch(error){
        console.error('error',error )
    }
}
runProducer().catch(console.error)