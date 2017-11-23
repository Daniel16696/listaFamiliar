'use strict';

module.exports = function (Listafamiliar) {

    Listafamiliar.beforeRemote('create', function (context, Listafamiliar, next) {
        context.args.data.Owner = context.req.accessToken.userId;
        next();
    });

    Listafamiliar.afterRemote('create', function (context, listafamiliar, next) {
        var app = listafamiliar.app;
        var a = context.req.accessToken.userId;

        var Usuario = Listafamiliar.app.models.Usuario;
        console.log(Usuario);


        Usuario.findById(a, function(err,instance){

            instance.listaFamiliarId=listafamiliar.id;
            instance.save(function(err){
                next();
            });
        });
        
    });

};
