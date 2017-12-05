module.exports = function(app) {
    var Role = app.models.Role;
    var Usuario = app.models.Usuario;
    Role.registerResolver('miembroLista', function(role, context, cb) {
      // Q: Is the current request accessing a Project?
      if (context.modelName !== 'Producto') {
        // A: No. This role is only for projects: callback with FALSE
        return process.nextTick(() => cb(null, false));
      }
  
      //Q: Is the user logged in? (there will be an accessToken with an ID if so)
      var userId = context.accessToken.userId;
      if (!userId) {
        //A: No, user is NOT logged in: callback with FALSE
        return process.nextTick(() => cb(null, false));
      }
      
      // Q: Is the current logged-in user associated with this Project?
      // Step 1: lookup the requested project
      context.model.findById(context.modelId, function(err, project) {

        // A: The datastore produced an error! Pass error to callback
        if(err) return cb(err);
        // A: There's no project by this ID! Pass error to callback
        if(!project) return cb(new Error("Producto no encontrado"));
        // Step 2: check if User is part of the Team associated with this Project
        // (using count() because we only want to know if such a record exists)

        
        Usuario.findById(userId, function (err, usuarioBuscado) {
            var idProducto = project.listaFamiliarId;
            console.log(idProducto);
            //  console.log(usuarioBuscado);
            var usuarioId = usuarioBuscado.listaFamiliarId;
            console.log(usuarioId);
            if (idProducto === usuarioId) {
                return cb(null, true);
                
            }else{
                return cb(null, false);
                
            }
           // var id = usuarioBuscado.listaFamiliarId;
        });
        
   
      });
    });
  };
  