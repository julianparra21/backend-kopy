const controller={};
const nodemailer = require("nodemailer");
const { get } = require("../routes/customer");
controller.registro=(req,res)=>{
        req.getConnection((err,conn)=>{
            conn.query('SELECT * FROM registro',(err,registro)=>{
                if(err){
                    res.json(err);
                }
                res.render('registro',{
                    data:registro
                })
            });
        });
};
controller.save=(req,res)=>{  
      req.getConnection((err,conn)=>{
          const data=req.body;
          let nombre = req.body.nombre;
          let correo = req.body.correo;
          let contraseña = req.body.contraseña;
          conn.query(`INSERT INTO registro set ?`,[data],(err,registro)=>{
            console.log("Registro guardado");
            res.render('principal');
          });
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: "11traintickets11@gmail.com",
              pass: "whvzzawcqsprwwgu",
            },
          });
          transporter
           
            transporter.sendMail({
              from: 'tickettrain121@gmail.com',
              to: correo,
              subject: 'Registro exitoso',
              html: '<h1>SU REGISTRO FUE EXITOSO</h1><img src="https://res.cloudinary.com/dfgp6rfmc/image/upload/v1666142034/kopy/logo_uf0miv.png"><p><b>'+nombre+'</b> ,El presente correo es para informar que ha sido registrado(a) correctamente en nuestro aplicativo web <b>Kopy  crazy fruit</b> Esperamos que nuestra aplicación sea de su agrado y disfrute de todas las herramientas brindadas en nuestro aplicativo web</p>',
          }).then((res) => { console.log(res); }).catch((err) => { console.log(err); })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
      });
};

controller.principal=(req,res)=>{
    res.render('principal');
};

controller.login=(req,res)=>{
    res.render('login');
};
controller.loginya=(req,res)=>{
  const data=req.body;
  let correo = req.body.correo;
  req.getConnection((err,conn)=>{
    
    conn.query( "SELECT contraseña FROM registro WHERE correo= ?",[data.correo=correo],(err,rows)=>{
        if (rows) {
            if (bcrypt.compareSync(contraseña, rows.contraseña)) {
              session = req.session;
              session.correo = correo;
              return res.render("principal");
            }
            return res.send("La contraseña es incorrecta");
          }
          return res.send("El usuario no existe");
  });
  });
};

module.exports = controller;