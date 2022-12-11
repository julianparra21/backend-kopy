const controller = {};
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt")
const session = require("express-session");
const {
  get
} = require("../routes/customer");
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

    let contraseñaHash = bcrypt.hashSync(contraseña, 10);
    conn.query(`INSERT INTO registro set ?`, [{
      nombre: nombre,
      correo: correo,
      contraseña: contraseñaHash

    }], (err, registro) => {
      console.log("Registro guardado");
      res.render('principal_usuario');
    });
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "kopycrazyfruit@gmail.com",
        pass: "aszoehmhpmbjsozt",
      },
    });
    transporter;

    transporter.sendMail({
        from: 'kopycrazyfruit@gmail.com',
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
  });
};

controller.principal = (req, res) => {
  res.render("principal");
};

controller.login = (req, res) => {
  res.render("login");
};
// const timeExp = 1000 * 60 * 60;
// controller.use(
//   sessions({
//     secret: "rfghf66a76ythggi87au7td",
//     saveUninitialized: true,
//     cookie: { maxAge: timeExp },
//     resave: false,
//   })
// )
controller.loginya = (req, res) => {
  console.log(req.body.user);
  req.getConnection((err, conn) => {
    conn.query(`SELECT * FROM registro WHERE correo = '${req.body.user}'`, (err, rows) => {
      
      if (err) {
        res.json(err);
      }

      console.log(rows[0].nombre);
      res.render("principal_usuario", {
        data: rows[0].nombre,
      });
    });
  });
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
    conn.query(`INSERT INTO insertar_admin set ?`, [{
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
      if (err.code == "ER_DUP_ENTRY") {
        return res.send(
          "<script>alert('El id del producto ya existe'); window.location = '/insertar'</script>"


        );
      }

    })
  })
};

controller.catalogo = (req, res) => {
  res.render('catalogo');
};


controller.selec_us=(req,res)=>{
  res.render('select_register');
}
controller.saveAdmin=(req,res)=>{
  req.getConnection((err, conn) => {
    let nombre = req.body.nombre;
    let correo = req.body.correo;
    let contraseña = req.body.contraseña;

    let contraseñaHash = bcrypt.hashSync(contraseña, 10);
    conn.query(`INSERT INTO registro_us set ?`, [{
      nombre: nombre,
      correo: correo,
      contraseña: contraseñaHash

    }], (err, registro) => {
      console.log("Registro guardado");
      res.render('Principal_Admin');
    });
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "kopycrazyfruit@gmail.com",
        pass: "aszoehmhpmbjsozt",
      },
    });
    transporter;

    transporter.sendMail({
        from: 'kopycrazyfruit@gmail.com',
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
  });
}
controller.registroAdmin=(req,res)=>{
  res.render('registroAd');
}
module.exports = controller;
