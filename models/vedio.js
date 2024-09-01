const mongoose = require("mongoose");

//database adress
const url = "mongodb://localhost:27017/deepfake"

mongoose.connect(url).then((success) => {
    console.log('Connected to database: ', success)
}).catch((err) => {
    console.log(err)
})
