const {Schema,model} = require('mongoose');

const LigaSchema = Schema({
    nombre: {
        type: String,
        require: true
    },  
    descripcion: {
        type: String
    }, 
    integrantes: [{  
        integrante: {      
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
        },

        jornadas:[{
            num_jornada: {                
                type: Number,
                default: 0
            },
            puntos_jornada: {                
                type: Number,
                default: 0
            }
        }],

        puntos_totales: {
            type: Number,
            default: 0
        }                     
    }]
    
}, {collection: 'ligas'});

LigaSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Liga', LigaSchema);