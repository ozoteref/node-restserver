const mongoos = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoos.Schema;

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es necesario"]
    },
    apellido:{
        type: String,
        required: [true, "El apellido es necesario"]
    },
    email:{
        type: String,
        unique: true,
        required: [true, "El correo es necesario"]
    },
    contrasena:{
        type: String,
        required: [true, "La contraseña es necesario"]
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.contrasena;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoos.model('usuario', usuarioSchema);