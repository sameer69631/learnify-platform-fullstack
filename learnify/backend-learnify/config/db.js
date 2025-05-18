// in this we will have info about how we can connect database

const mongoose = require('mongoose');
const config = require(".");  // since we are specifing "." it will by default pick the index file which has all configurations
mongoose.set("strictQuery", true);

mongoose.connect(config.DB_URL).then(() => console.log("connected to data base")).catch(err => console.log("unable to connect database "+err))

mongoose.connection.on("connected", ()=>{
    console.log("mongoose has been connected");
})

mongoose.connection.on("error", (err)=>{
    console.log("error in connetion with mongoose");

})

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoose disconnected");
})

process.on("SIGINT", ()=>{
    process.exit(0);
})

module.exports = mongoose.connection;