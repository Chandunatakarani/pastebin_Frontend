const mongoose = require("mongoose")

const connectDb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongodb connected at ${conn.connection.host}`)
    }catch(e){
        console.log(`error in connecting mongdb ${e}`)
        process.exit(1)
    }
}

module.exports = connectDb
