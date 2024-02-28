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
        },        
//puede que esto sobre
        jornadas:[{
            num_jornada: {                
                type: Number,
                default: 0
            },
            resultado: { //ponerlo en liga           
                type: Number,
                default: 0
            }
        }],
    }]
}, {collection: 'usuarios'});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);