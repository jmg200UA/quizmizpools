const Liga = require('../models/ligas');
const Usuario = require('../models/usuarios');
const mongoose = require('mongoose');

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
        
        console.log("El req body: " + integrantes);

        if (integrantes) {            
            let listaintegrantesbusqueda = [];
            for(var i=0; i<integrantes.length;i++){
                console.log("Integrantes liga: " + integrantes[i].integrante);
                if (integrantes[i]!=null) {
                    const integranteId = new mongoose.Types.ObjectId(integrantes[i].integrante); 
                    listaintegrantesbusqueda.push(integranteId);
                    listaintegrantesinsertar.push(integranteId);
                }
            }
            
            const existenUsuarios = await Usuario.find().where('_id').in(listaintegrantesbusqueda);
            console.log("Usuarios que existen: " + existenUsuarios);
            if (existenUsuarios.length != listaintegrantesbusqueda.length) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Alguno de los usuarios no existen o están repetidos'
                });
            }
            console.log("Listaintegrantes: " + listaintegrantesinsertar);

            const liga = new Liga(req.body);
            liga.integrantes.integrante = listaintegrantesinsertar;
            await liga.save();
            

            for(var i=0; i<existenUsuarios.length;i++){
                if (existenUsuarios[i]!=null) { 
                    const usuario = await Usuario.findById(existenUsuarios[i]);
                    usuario.ligas.push(liga);
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
        const liga = await Liga.findByIdAndUpdate(uid, req.body, {new: true});

        res.json({
            ok: true,
            msg: 'Liga actualizada',
            liga
        });
           

    }catch(error){
        console.log(error);

        return res.status(400).json({
            ok: false,
            msg: 'Error actualizando liga'
        });
    }      
        
}

const sumarIntegrante = async(req, res) => { //COMO LO HACEMOS
    
    const uid = req.params.id;

    try{
        const existeLiga = await Liga.findById(uid);

        if(!existeLiga){

            return res.status(400).json({
                ok: false,
                msg: 'La liga no existe'
            });       
        }
        

    let listaintegrantesinsertar = [];
        

        if (integrantes) {         
            let listaintegrantesbusqueda = [];
            for(var i=0; i<integrantes.length;i++){
                console.log("Integrantes liga: " + integrantes[i].integrante);
                if (integrantes[i]!=null) {
                    const integranteId = new mongoose.Types.ObjectId(integrantes[i].integrante); 
                    listaintegrantesbusqueda.push(integranteId);
                    listaintegrantesinsertar.push(integranteId);
                }
            }
            
            console.log("Usuarios que existen: " + existenUsuarios);
            if (existenUsuarios.length != listaintegrantesbusqueda.length) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Alguno de los usuarios no existen o están repetidos'
                });
            }
            console.log("Listaintegrantes: " + listaintegrantesinsertar);

            const liga = await Liga.findByIdAndUpdate(uid, req.body, {new: true});
            
            liga.integrantes.integrante = listaintegrantesinsertar;
            await liga.save();

            var hayliga = 0;

            for(var i=0; i<existenUsuarios.length;i++){
                if (existenUsuarios[i]!=null) {
                    if(existenUsuarios[i].ligas.length<1){
                        existenUsuarios[i].ligas.push(uid);                                
                        await existenUsuarios[i].save();
                    } 
                    else{
                        for(var j=0; j<existenUsuarios[i].ligas.length;j++){
                            if(existenUsuarios[i].ligas[j]._id == uid){
                                existenUsuarios[i].ligas[j] = liga;                                                            
                                await existenUsuarios[i].save();
                                hayliga=1;
                            }                 
                        }                        
                        if(hayliga==0){
                            existenUsuarios[i].ligas.push(uid);                                
                            await existenUsuarios[i].save();
                        }    
                    }                   
                }
            }

            res.json({
                ok: true,
                msg: 'Liga actualizada',
                liga
            });
        }
       

    }catch(error){
        console.log(error);

        return res.status(400).json({
            ok: false,
            msg: 'Error actualizando liga'
        });    
    }
}

const restarIntegrante = async(req, res) => {
    
    const uid = req.params.id;
    const usuario = req.params.usuario;

    try{
        const existeLiga = await Liga.findById(uid);
        const existeUsuario = await Usuario.findById(usuario);

        if(!existeLiga || !existeUsuario){

            return res.status(400).json({
                ok: false,
                msg: 'La liga o el usuario no existe'
            });       
        }   
        
        for (var j = 0; j < existeLiga.integrantes.length; j++) {
            if (existeLiga.integrantes[j].integrante == usuario) {                
                console.log("Llegamos para eliminar usuario en ligas");
                existeLiga.integrantes.splice(j, 1);
                await existeLiga.save();
            }
        }

        
        if(existeLiga.integrantes.length<1){
            console.log("Ultimo usu adios liga");
            //Hay que llamar a delete
        }     


        for (var j = 0; j < existeUsuario.ligas.length; j++) {
            if (existeUsuario.ligas[j]._id == uid) {
                console.log("Llegamos para eliminar liga en usuarios");
                existeUsuario.ligas.splice(j, 1);
                await existeUsuario.save();
            }
        }

        res.json({
            ok: true,
            msg: 'Integrante eliminado',
            existeLiga
        });       
       

    }catch(error){
        console.log(error);

        return res.status(400).json({
            ok: false,
            msg: 'Error eliminando integrante liga'
        });    
    }
}

const actualizarPuntos = async(req,res) => {
    const { jornada, puntos } = req.body;
    const uid = req.params.id;
    const usu = req.params.usuario;

    try{

        var puntosAnteriores;
        var puntosSumar;
        var entra=0;

        const existeLiga = await Liga.findById(uid);
        const existeUsuario = await Usuario.findById(usu);

        if(!existeLiga || !existeUsuario){

            return res.status(400).json({
                ok: false,
                msg: 'La liga o el usuario no existe'
            });       
        }
        console.log("Usuario: " + usu);

        for(var i=0; i<existeLiga.integrantes.length;i++){

            console.log("Liga integrantes: " + existeLiga.integrantes[i]);

            if(existeLiga.integrantes[i].integrante == usu){
                console.log("FUNCIONA");
                
                //console.log("ENTRA con integrante: " + existeUsuario);

                puntosAnteriores = existeLiga.integrantes[i].jornadas[jornada].puntos_jornada;

                console.log("Debe ser 0: " + puntosAnteriores);

                existeLiga.integrantes[i].jornadas[jornada].puntos_jornada = puntos;
                puntosSumar = puntos - puntosAnteriores;     
                existeLiga.integrantes[i].puntos_totales += puntosSumar;    
                entra=1;
            }
        }
        if(entra==0){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no está en esta liga'
            }); 
        }

        await existeLiga.save();       

        res.json({
            ok: true,
            msg: 'Puntos actualizada'
        });           

    }catch(error){
        console.log(error);

        return res.status(400).json({
            ok: false,
            msg: 'Error actualizando puntos'
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
        
        const resultado = await Liga.findByIdAndDelete(uid);
        const usuarios = await Usuario.find({});

        for (var i = 0; i < usuarios.length; i++) {
            for (var j = 0; j < usuarios[i].ligas.length; j++) {
                console.log("Usuario liga: " + usuarios[i].ligas[j]);
                console.log("Liga uid: " + uid);
                if (usuarios[i].ligas[j]._id == uid) {
                    console.log("Llegamos para eliminar");
                    usuarios[i].ligas.splice(j, 1);
                    await usuarios[i].save();
                }
            }
        }

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
    obtenerLigas, crearLiga, actualizarLiga, sumarIntegrante, restarIntegrante, actualizarPuntos, borrarLiga
}