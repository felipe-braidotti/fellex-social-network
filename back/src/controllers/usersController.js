const UserSchema = require("../models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET

const getAll = (req, res) => {

    const authHeader = req.get('authorization')
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send("Erro no Header")
    }

    jwt.verify(token, SECRET, (error) => {
        if (error) {
            return res.status(401).send("Não autorizado")
        }
    })
    UserSchema.find(function (err, users) {
        if(err) {
            res.status(500).send({ message: err.message })
        }
        res.status(200).send(users)
    }) 
}

const createUser = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword
    try {
        const newUser = new UserSchema(req.body);
    
        const sevedUser = await newUser.save();
    
        res.status(201).send({
            "message": "Usuário criado com sucesso",
            sevedUser
        })
    } catch (error) {
        console.log(error)
    }

}

const updateUserById = async (req, res) => {
    try {
        const findUser = await UserSchema.findById(req.params.id)

        if (findUser) {            
            findUser.name = req.body.name || findUser.name
            findUser.email = req.body.email || findUser.email
        }

        const savedUser = await findUser.save()

        res.status(200).json({
            message: "Usuário atualizada com sucesso!",
            savedUser
        })

    } catch (error) {
        console.error(error)
    }
}

const deleteUserById = async (req, res) => {
    try {
        const userFound = await UserSchema.findByIdAndDelete(req.params.id)

       res.status(200).json({
           mensagem: `Usuário '${userFound.email}' deletada com sucesso!`
       })

    } catch (err) {
        res.status(400).json({
            mensagem: err.message
        })
    }
}



module.exports = {
  getAll,
  createUser,
  updateUserById,
  deleteUserById
}