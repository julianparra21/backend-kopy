CREATE DATABASE kopyCrazyFruit;

use kopyCrazyFruit;

CREATE table registro(
    nombre varchar(50) not null,
    correo varchar(50) not null,
    contraseña varchar(50) not  null
);
CREATE table insertar_admin(
    nombre_producto varchar(50) not null,
    id_producto int(50) not null,
    categoria_productos set('pasabocas','bebida','desayuno') not  null,
    precio_producto int(50) not null,
    proveedor_producto varchar(50) not null
    
);

CREATE table registro_us(
    nombre varchar(50) not null,
    correo varchar(50) not null,
    contraseña varchar(50) not  null
)
show tables;

describe registro;