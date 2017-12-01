'use strict';

module.exports = function (Producto) {
    /**
     * Va a mostrar todos los valores a false como si los hubiera comprado todos los productos
     * @param {object} context Recibe un id
     * @param {Function(Error, array)} callback
     */

    Producto.todosProductosComprados = function (context, callback) {
        var producto;

        var userId = context.req.accessToken.userId;

        var Usuario = Producto.app.models.Usuario;



        Usuario.findById(userId, function (err, usuariosBuscados) {
         //   console.log(usuariosBuscados.listaFamiliarId);
            var id= usuariosBuscados.listaFamiliarId;

                
                Producto.updateAll({listaFamiliarId:id},{comprar:"0"}, function(err, productos) {
                    Producto.find({ where: { listaFamiliarId:id } }, function (err,muestraProductos) {
                        callback(err,muestraProductos);
                    })
                    //console.log(productos);
                });
            


        });
        
    };


};
