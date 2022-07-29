const mongoose = require('mongoose')
const URI_MONGODB = process.env.URI_MONGODB

const connect = async () => {
    try {
        await mongoose.connect(URI_MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Banco conectado")
    } catch (error) {
        console.error("Erro: ", error.message)
    }
}

module.exports = {
    connect
}