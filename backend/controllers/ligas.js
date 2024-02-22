const Liga = require('../models/ligas');
const Usuario = require('../models/usuarios');

const {response} = require('express-validator');

const obtenerLigas = async(req, res) => {

    try {

        const ligas = await Liga.find({}).populate('__v').populate('integrantes', '-password -__v -ligas');

        res.json({
            ok: true,
            msg: 'getLigas',
            ligas
        });
        
    } catch (error) {
        console.log(error);

        return res.status(400).json({
            ok: false,
            msg: 'Error obteniendo ligas'
        });
    }

    
}

const crearLiga = async(req, res = response) => {   
    
    const { integrantes } = req.body;
    
    try{ 

        let listaintegrantesinsertar = [];
        

        if (integrantes) {            
            let listaintegrantesbusqueda = [];
            for(var i=0; i<integrantes.length;i++){
                if (integrantes[i]!=null) { 
                    console.log("Integrantes: "+ integrantes[i]);
                    listaintegrantesbusqueda.push(integrantes[i]);
                    listaintegrantesinsertar.push(integrantes[i]);
                }
            }

            const existenUsuarios = await Usuario.find().where('_id').in(listaintegrantesbusqueda);

            if (existenUsuarios.length != listaintegrantesbusqueda.length) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Alguno de los usuarios no existen o están repetidos'
                });
            }

            const liga = new Liga(req.body);
            liga.integrantes = listaintegrantesinsertar;
            await liga.save();

            for(var i=0; i<existenUsuarios.length;i++){
                if (existenUsuarios[i]!=null) { 
                    const usuario = await Usuario.findById(existenUsuarios[i]._id);
                    usuario.ligas.push(liga._id);
                    await usuario.save();
                }
            }
            

            res.json({
                ok: true,
                msg: 'Liga creado',
                liga
            }); 
        }       
        

    }
    catch(error){
        console.log(error);

        return res.status(400).json({
            ok: false,
            msg: 'Error creando liga'
        });
    }
}


const actualizarLiga = async(req, res) => {

    const uid = req.params.id;

    try{

        const existeLiga = await Liga.findById(uid);

        if(!existeLiga){

            return res.status(400).json({
                ok: false,
                msg: 'La liga no existe'
            });       
        }
        
        const resultado = await Liga.findByIdAndUpdate(uid, object, {new: true});

        res.json({
            ok: true,
            msg: 'Liga actualizada',
            resultado
        });

    }catch(error){
        console.log(error);

        return res.status(400).json({
            ok: false,
            msg: 'Error actualizando liga'
        });
    }      
        
}

const borrarLiga = async(req, res) => {

    const uid = req.params.id;

    try{

        const existeLiga = await Liga.findById(uid);

        if(!existeLiga){

            return res.status(400).json({
                ok: false,
                msg: 'La liga no existe'
            });       
        }
        
        const resultado = await Liga.findByIdAndRemove(uid); //PORQUE NO FUNCIONA????

        res.json({
            ok: true,
            msg: 'Liga borrada',
            resultado
        });

    }catch(error){
        console.log(error);

        return res.status(400).json({
            ok: false,
            msg: 'Error borrando usuario'
        });
    }        
}

module.exports = {
    obtenerLigas, crearLiga, actualizarLiga, borrarLiga
}