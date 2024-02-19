const Usuario = require('../models/usuarios');

const obtenerUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({});

    res.json({
        ok: true,
        msg: 'getUsuarios',
        usuarios
    });
}

const crearUsuario = async(req, res) => {

    res.json({
        ok: true,
        msg: 'crearUsuarios'
    });
        
}

const actualizarUsuario = async(req, res) => {

    res.json({
        ok: true,
        msg: 'actualizarUsuario'
    });
        
}

const borrarUsuario = async(req, res) => {

    res.json({
        ok: true,
        msg: 'borrarUsuario'
    });
        
}

module.exports = {
    obtenerUsuarios, crearUsuario, actualizarUsuario, borrarUsuario
}