'use strict';

module.exports = function (Listafamiliar) {
    //Haz que el id del usuario que ejecuta un POST /ListasFamiliares se le asocie como 'owner'.
    Listafamiliar.beforeRemote('create', function (context, Listafamiliar, next) {
        context.args.data.Owner = context.req.accessToken.userId;
        next();
    });
    //Una vez que se ha creado una lista familiar, busca su id y asócialo al usuario autenticado,
    // guardando, posteriormente, los nuevos datos del usuario.
    Listafamiliar.afterRemote('create', function (context, listafamiliar, next) {
        var app = listafamiliar.app;
        var a = context.req.accessToken.userId;

        var Usuario = Listafamiliar.app.models.Usuario;
        console.log(Usuario);


        Usuario.findById(a, function (err, instance) {

            instance.listaFamiliarId = listafamiliar.id;
            instance.save(function (err) {
                next();
            });
        });

    });

    //Debemos crear un punto de entrada POST /ListasFamiliares/{id}/solicitar, que inserte en la tabla
    //de solucitudes una fila que contenga el id de la lista familiar a la que se quiere pertenecer y
    //el id del usuario que está autenticado.
    Listafamiliar.prototype.crearSolicitudes = function (lista, callback) {
        var salida;
        var a = lista.req.accessToken.userId;
        var idLista = this.id;

        this.Solicitud.add(a,
            function (err) {
                if (err) callback(err);
                salida = {
                    listaFamiliarId: idLista,
                    usuarioId: a
                };
                callback(null, salida);
            });

    };

};
