const {Schema,model} = require('mongoose');

const PartidoSchema = Schema({   

    jornadas: [{
        type: Number, 

        partidos: [{
            type: Number,

            resultado: {
                type: Number
            },
        }],
    }], 
    
}, {collection: 'partidos'});

PartidoSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('Partido', PartidoSchema);