'use strict';

module.exports = function (Usuario) {



    Usuario.prototype.usuario = function (aceptarSoli, callback) {
        var SalidaAceptarSolicitud;

        var userId = aceptarSoli.req.accessToken.userId;
        var usuarioSolicitando = this;

        Usuario.findById(userId, function (err, userAuth) {
            var usuarioValores = userAuth.listaFamiliarId;

            // console.log(usuarioValores);


            usuarioSolicitando.Solicituds(function (err, listas) {
                if (err) callback(err);
                // console.log(listas);
                var id = listas[0].id;
                // console.log(id);
                if (usuarioValores == id) {
                    usuarioSolicitando.listaFamiliarId = id;
                    // console.log(usuarioSolicitando);
                    usuarioSolicitando.save(function (err) {
                        SalidaAceptarSolicitud = {
                            id: id,
                            usuarioSolicitando
                        }
                        // console.log(listas[0]);
                        callback(null, SalidaAceptarSolicitud);

                        listas[0].Solicitud.remove(usuarioSolicitando, function (err) {

                        });
                    });
                } else {
                    SalidaAceptarSolicitud = {
                        Mensaje: "No perteneces a la lista a la que el usuario a solicitado"
                    }
                    callback(null, SalidaAceptarSolicitud);
                }


            });

        });



    }

    /**
     * Va a rechazar las solicitudes
     * @param {object} context Recibe un id
     * @param {Function(Error, array)} callback
     */

    Usuario.prototype.usuarioRechazarSolicitud = function (context, callback) {
        var listaEliminada;

        var userId = context.req.accessToken.userId;
        var usuarioSolicitando = this;

        Usuario.findById(userId, function (err, userAuth) {
            var usuarioValores = userAuth.listaFamiliarId;
            //console.log(userId);  //id de el usuario que está autenticado accesToken
            // console.log(usuarioValores); //id de el usuario que está autenticado accesToken
            // console.log(usuarioSolicitando);//todo el contenido que tiene el que está siendo solicitado

            usuarioSolicitando.Solicituds(function (err, listas) {
                if (err) callback(err);
                console.log(listas);
                var id = listas[0].id;
                console.log(id);

                console.log(usuarioSolicitando);
                
                listas[0].Solicitud.remove(usuarioSolicitando, function (err) {
                    callback(null, listaEliminada);
                })
            })

        });

    };



};

