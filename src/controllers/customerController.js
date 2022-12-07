const controller = {};
const nodemailer = require("nodemailer");
<<<<<<< HEAD
const bcrypt = require("bcrypt")
const session = require("express-session");
const {
  get
} = require("../routes/customer");
=======
const bcrypt = require("bcrypt");
const session = require("express-session");
const { get } = require("../routes/customer");
>>>>>>> 8c13f65d6c7f73f84bd8e66657de2ab2ab3433c6
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
<<<<<<< HEAD
    conn.query(`INSERT INTO registro set ?`, [{
      nombre: nombre,
      correo: correo,
      contraseña: contraseñaHash

    }], (err, registro) => {
      console.log("Registro guardado");
      res.render('principal');
    });
=======
    conn.query(
      `INSERT INTO registro set ?`,
      [
        {
          nombre: nombre,
          correo: correo,
          contraseña: contraseñaHash,
        },
      ],
      (err, registro) => {
        console.log("Registro guardado");
        res.render("principal");
      }
    );
>>>>>>> 8c13f65d6c7f73f84bd8e66657de2ab2ab3433c6
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "kopycrazyfruit@gmail.com",
        pass: "aszoehmhpmbjsozt",
      },
    });
    transporter;

<<<<<<< HEAD
    transporter.sendMail({
        from: 'kopycrazyfruit@gmail.com',
        to: correo,
        subject: 'Registro exitoso',
        html: '<h1>SU REGISTRO FUE EXITOSO</h1><img src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png"><p><b>' + nombre + '</b> ,El presente correo es para informar que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Kopy  crazy fruit</b> Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web</p>',
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
=======
    transporter
      .sendMail({
        from: "kopycrazyfruit@gmail.com",
        to: correo,
        subject: "Registro exitoso",
        html:
          '<h1>SU REGISTRO FUE EXITOSO</h1><img src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png"><p><b>' +
          nombre +
          "</b>, El presente correo es para informar que ha sido registrad@ correctamente en nuestro aplicativo web <b>Kopy  crazy fruit</b> Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web</p>",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
>>>>>>> 8c13f65d6c7f73f84bd8e66657de2ab2ab3433c6
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

<<<<<<< HEAD
controller.categorias = (req, res) => {
  res.render('categorias')
}

controller.insertar = (req, res) => {
  res.render('insertar_admin')
}

controller.ingresar_producto = (req, res) => {

  // console.log(req.body);
  req.getConnection((err, conn) => {
=======

controller.categorias = (req, res) => {
  res.render("categorias");
};

controller.insertar = (req, res) => {
  res.render("insertar_admin");
};

controller.ingresar_producto = (req, res) => {
  req.getConnection((conn, err) => {
>>>>>>> 8c13f65d6c7f73f84bd8e66657de2ab2ab3433c6
    let nombre_producto = req.body.nombre;
    let id_producto = req.body.codigo;
    let categoria_productos = req.body.categoria;
    let precio_producto = req.body.precio;
<<<<<<< HEAD
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

module.exports = controller;
=======
    conn.query(
      `INSERT INTO productos set ?`,
      [
        {
          nombre: nombre_producto,
          codigo: id_producto,
          categoria: categoria_productos,
          precio: precio_producto,
        },
      ],
      (error) => {
        if (!error) {
          console.log("insert ok");
          res.send(`registro-exitoso`);
        } else {
          console.log("no se pudo insertar");
        }
      }
    );
  });
  
};

module.exports = controller;
>>>>>>> 8c13f65d6c7f73f84bd8e66657de2ab2ab3433c6
