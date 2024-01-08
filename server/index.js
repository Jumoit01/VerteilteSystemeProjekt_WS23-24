const app = require('./app')
const mongoose = require('mongoose')

// MongoDB local connection
try {
    mongoose.connect("mongodb://localhost:27018/footballBase");
} catch(error) {
    console.log(error.message)
}

app.listen(8080, () => {
    console.log('Server started in port', 8080);
    mongoose.connection.once('open', () => console.log('Connected to Database'))
})