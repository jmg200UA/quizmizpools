const Usuario = require('../models/usuarios');
const Liga = require('../models/ligas');
const {response} = require('express-validator');
const bcrypt = require('bcryptjs');

const obtenerUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}).populate('__v').populate('ligas', '-__v -integrantes');

    res.json({
        ok: true,
        msg: 'getUsuarios',
        usuarios
    });
}

const crearUsuario = async(req, res = response) => {

    const {email, password} = req.body;

    try{
        const existeEmail = await Usuario.findOne({email: email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Email ya existe'
            });
        }

        const salt = bcrypt.genSaltSync();
        const c_password = bcrypt.hashSync(password,salt);

        const usuario = new Usuario(req.body);
        usuario.password = c_password;

        await usuario.save();

        res.json({
            ok: true,
            msg: 'Usuario creado',
            usuario
        });

    }catch(error){
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error creando usuario'
        });
    }       
}


const actualizarUsuario = async(req, res) => {

    const { password, email, ...object} = req.body;
    const uid = req.params.id;

    try{
        const existeEmail = await Usuario.findOne({ email: email});

        if(existeEmail){
            if(existeEmail._id != uid){

                return res.status(400).json({
                    ok: false,
                    msg: 'Email ya existe'
                });
            }            
        }

        object.email = email;

        const resultado = await Usuario.findByIdAndUpdate(uid, object, {new: true});

        res.json({
            ok: true,
            msg: 'Usuario actualizado',
            resultado
        });

    }
    catch(error){
        console.log(error);

        return res.status(400).json({
            ok: false,
            msg: 'Error actualizando usuario'
        });
    }
        
}

const borrarUsuario = async(req, res) => {

    const uid = req.params.id;

    try{

        const existeUsuario = await Usuario.findById(uid);

        if(!existeUsuario){

            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });       
        }
        
        const resultado = await Usuario.findByIdAndDelete(uid);

        const ligas = await Liga.find({});

        for (var i = 0; i < ligas.length; i++) {
            for (var j = 0; j < ligas[i].integrantes.length; j++) {
                if (ligas[i].integrantes[j].integrante == uid) {
                    ligas[i].integrantes.splice(j, 1);
                    await ligas[i].save();
                }
            }
            if(ligas[i].integrantes.length<1){
                await Liga.findByIdAndDelete(ligas[i]._id);
            }
        }

        res.json({
            ok: true,
            msg: 'Usuario borrado',
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
    obtenerUsuarios, crearUsuario, actualizarUsuario, borrarUsuario
}