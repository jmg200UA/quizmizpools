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
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }]
    
}, {collection: 'ligas'});

LigaSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Liga', LigaSchema);