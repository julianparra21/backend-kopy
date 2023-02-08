-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-02-2023 a las 21:46:45
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `kopycrazyfruit`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insertar_producto`
--

CREATE TABLE `insertar_producto` (
  `nombre_producto` varchar(50) NOT NULL,
  `id_producto` int(50) NOT NULL,
  `categoria_productos` set('pasabocas','bebida','desayuno') NOT NULL,
  `precio_producto` int(50) NOT NULL,
  `proveedor_producto` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `nombre` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contraseña` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`nombre`, `correo`, `contraseña`) VALUES
('com', 'com@com', '$2b$10$v0cwcILEr8LCIw.LBFalUu1T4QhCuj8wE8buKXUS.22'),
('julianParra', 'julianparraos147@gmail.com', '$2b$10$zQTlotuh2kwzutqSTIJ6Le8lF7ULnEn/Jqx1xKiInVw');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_us`
--

CREATE TABLE `registro_us` (
  `nombre` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contraseña` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `registro_us`
--
ALTER TABLE `registro_us`
  ADD UNIQUE KEY `correo` (`correo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
