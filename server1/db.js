const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/AbhiNote',{
    useNewUrlParser: true
}).then(()=>{
    console.log("Connection Successful");
}).catch(()=>{
    console.log("Connection Failed");
})
