const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },  
    email: {
        type: String,
        require: true,
        unique: true
    }, 
    password:{
        type: String,
        require: true
    },
    imagen:{
        type: String
    },
    ligas:[{
        liga: {
            type: Schema.Types.ObjectId,
            ref: 'Liga',

            jornadas: [{
                type: Number, 

                partidos: [{
                    type: Number,

                    resultado: {
                        type: Number
                    },
                }],
            }], 
        }
    }]
}, {collection: 'usuarios'});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);