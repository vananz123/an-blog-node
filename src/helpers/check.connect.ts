'use strict'
const mongoose = require('mongoose')
const os = require('os')
const pro = require('process')
const TIME = 5000
export const countConnection = (): void=> {
    const numCount =  mongoose.connection.base.connections.length;
    console.log(`Number of connenction ${numCount}`)
}
//check over load
export const checkOverLoad = ():void=>{
    setInterval(()=> {
        const numCount =  mongoose.connection.base.connections.length;
        const maxConnection = os.cpus().lenght * 5
        const memoryUsage = pro.memoryUsage().rss;
        console.log(`memory usage: ${memoryUsage}`)
        if(numCount > maxConnection){
            console.log("connection server over load!")
        }
    },TIME )
}