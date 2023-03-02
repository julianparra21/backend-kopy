
const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const myConnection = require('express-myconnection');
// const port = 3000;

// Importing routes
const customerRoutes = require('./routes/customer');
const { urlencoded } = require('body-parser');


//settngs
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
// app.use(myConnection(mysql,{
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     port: 3306,
//     database: 'kopycrazyfruit'
// }, 'single'));
// app.use(express.urlencoded({extended: false}));

const dbconnection={
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'kopycrazyfruit'

}

try {
    app.use(myConnection(mysql,dbconnection,'single'));
    app.use(express.urlencoded({extended: false}));
} catch (error) {
    console.log(error);
    console.log('error');
    

    
}

//auth pages
app.get('/loginya', (req, res) => {
  if (req.session.loggedin) {
      res.render('loginya',{
          nombre: req.session.nombre
      });
  } else {
      res.render('loginya',{
          nombre: 'inicie sesion'
      });
  }
});



//routes
app.use('/', customerRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
  console.log(`Server is running on port 3000`);
});
