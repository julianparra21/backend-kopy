const controller = {};
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt")

const {
  get
} = require("../routes/customer");
const { loadavg } = require("os");
controller.registro = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM registro", (err, registro) => {
      console.log(registro);
      if (err) {
        res.json(err);
      }
      res.render("registro", {
        data: registro,
      });
    });
  });
};
controller.save = (req, res) => {
  req.getConnection((err, conn) => {
    let nombre = req.body.nombre;
    let correo = req.body.correo;
    let contraseña = req.body.contraseña;
   //validations
    if (nombre == "" || correo == "" || contraseña == "") {
      res.render('registro', {
        alert: true,
        alertTitle: "Error",
        alertMessage: "Todos los campos son obligatorios",
        alertIcon: "error",
        showConfirmButton: true,
        timer: 1500,
        ruta: 'registro'
      });
    }else{
    let contraseñaHash = bcrypt.hashSync(contraseña, 10);
    conn.query(`INSERT INTO registro set ?`, [{
      nombre: nombre,
      correo: correo,
      contraseña: contraseñaHash

    }], (err, registro) => {
      console.log("Registro guardado");
      res.render('login');
    });
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "kopycrazy@gmail.com",
        pass: "rcyxbrlzopvcmaks",
      },
    });
    transporter;

    transporter.sendMail({
      from: 'kopycrazy@gmail.com',
      to: correo,
      subject: 'Registro exitoso',
      html: '<h1>SU REGISTRO FUE EXITOSO</h1><img src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png"><p><b>' + nombre + '</b> ,El presente correo es para informar que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Kopy  crazy fruit</b> Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web</p>',
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });

};

controller.principal = (req, res) => {
  res.render("principal");
};

controller.login = (req, res) => {
  res.render("login");
};

controller.loginya = (req, res) => {
  console.log(req.body.user);
  //validations
  if (req.body.user == "" || req.body.password == "") {
    res.send(
      "<script>alert('Todos los campos son requeridos'); window.location = '/login'</script>"
    )
    
  } else {
    
  req.getConnection((err, conn) => {
    conn.query(`SELECT * FROM registro WHERE correo = '${req.body.user}'`, (err, rows) => {

      if (err) {
        res.json(err);
      }


      res.render("principal_usuario", {

      });
    });
  });
}
};

controller.categorias = (req, res) => {
  res.render('categorias')
}

controller.insertar = (req, res) => {
  res.render('insertar_admin')
}

controller.ingresar_producto = (req, res) => {

  // console.log(req.body);
  req.getConnection((err, conn) => {
    let nombre_producto = req.body.nombre;
    let id_producto = req.body.codigo;
    let categoria_productos = req.body.categoria;
    let precio_producto = req.body.precio;
    let proveedor_producto = req.body.proveedor;
    if (categoria_productos == 1) {
      categoria_productos = 'pasabocas'
    } else if (categoria_productos == 2) {
      categoria_productos = 'bebida'
    } else if (categoria_productos == 3) {
      categoria_productos = 'desayuno'
    }
    conn.query(`INSERT INTO insertar_Producto set ?`, [{
      nombre_producto: nombre_producto,
      id_producto: id_producto,
      categoria_productos: categoria_productos,
      precio_producto: precio_producto,
      proveedor_producto: proveedor_producto
    }], (err, rows) => {
      if (err) {
        console.log("------------------------------ERROR--------------------");
        console.log(err);
        console.log("---------------------------------------------");
      }
      res.send(
        "<script>alert('El  producto fue agregado correctamente'); window.location = '/insertar'</script>"

      )
      res.render('catalogo_Admin')
    

    })
  })
};

controller.catalogo = (req, res) => {
  res.render('catalogo');
};


controller.selec_us = (req, res) => {
  res.render('select_register');
}


//inicio de sesion del administrador
controller.loginAdmin = (req, res) => {
  res.render('loginAd')
};
controller.loginAdminYa = (req, res) => {
  console.log(req.body.user);
  req.getConnection((err, conn) => {
    conn.query(`SELECT * FROM registro_us WHERE correo = '${req.body.user}'`, (err, rows) => {

      if (err) {
        res.json(err);
      }

      res.render("Principal_Admin", {

      });
    });
  });
}

controller.recuperar = (req, res) => {
  res.render('recover-password');
}

controller.recuperarYa = (req, res) => {

  req.getConnection((err, conn) => {
    let correo = req.body.correo;
    conn.query(`SELECT * FROM registro WHERE correo = '${req.body.correo}'`, (err, rows) => {
     
      if (err) {
        res.json(err);
      } else {

        let contraseñaDefinitiva = Math.floor(Math.random() * 10000);
        // let contraseñaDefinitivaHast = bcrypt.hashSync(contraseñaDefinitiva, 10);

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          auth: {
            user: "kopycrazy@gmail.com",
            pass: "rcyxbrlzopvcmaks",
          }
        });

        transporter.sendMail({
          from: 'kopycrazy@gmail.com',
          to: correo,
          subject: "Recuperar contraseña",
          html:
            `Hola Su Codigo de verificacion es ${contraseñaDefinitiva}`
        })
          .then((res) => {
            console.log("___________________________________________________");
            console.log("Correo enviado");
            console.log(res);
            console.log("___________________________________________________");

          })
          .catch((err) => {
            console.log("Error en el envio del correo____________________________________");
            console.log(err);
          });

        conn.query("UPDATE registro SET contraseña = ? WHERE correo = ?", [contraseñaDefinitiva, correo], (err, rows) => {
          if (err) {
            console.log("___________________________________________________");
            console.log("Error en la base de datos")
            console.log(err);
            console.log("___________________________________________________");
          } else {
            console.log("___________________________________________________");
            console.log("Contraseña cambiada");
            console.log("___________________________________________________");
          }
        })
        res.render('recuperar')
      }

    });
  })
}
controller.verificar = (req, res) => {
  console.log("_________________________Ya casiiiiiii__________________________");  
  console.log(req.body);
  let correo = req.body.email;
  let id = req.body.id;
  let contraseña = req.body.password;
  req.getConnection((err, conn) => {
    conn.query("SELECT contraseña from registro where correo = ? ", [correo], (err, rows) => {
      if(!err){
        console.log("________________________________ VAMOS ______________________________________________");
        let contraseñaRows = rows[0].contraseña;
        if (bcrypt.compareSync(contraseñaRows, id)) {
          res.send('recuperar');
        } else {
          // res.send('recover-password');
          res.render('principal_usuario')
        }
      } else if(err){
        console.log("______________________________________________________________________________");
        console.log(err);
      }
     })
  }
  )
}


controller.catalogoAdmi = (req, res) => {
  res.render('catalogo_Admin');
}
controller.principalAdmin = (req, res) => {
  res.render('Principal_Admin');
}
controller.categoriasAdmin = (req, res) => {
  res.render('categorias_Admin');
}


module.exports = controller;
