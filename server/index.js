const app = require('./app')
const mongoose = require('mongoose')

// MongoDB local connection
try {
    mongoose.connect("mongodb://host.docker.internal:27018/footballBase");
} catch(error) {
    console.log(error.message)
}

app.listen(4321, () => {
    console.log('Server started in port', 4321);
    mongoose.connection.once('open', () => console.log('Connected to Database'))
})