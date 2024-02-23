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
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',

            puntos_por_jornada:[{
                type: Number
            }],
            puntos_totales: {
                type: Number
            }
        },                      
    }]
    
}, {collection: 'ligas'});

LigaSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Liga', LigaSchema);