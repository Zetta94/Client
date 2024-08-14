# _API Movies_ : Prueba Técnica 

## Tabla de Contenidos

- [Descripción](#descripción)
- [Alojamiento](#Alojamiento)
- [Instalación y Ejecución](#instalación-y-ejecución)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Tecnologías](#Tecnologías)
- [Requerimientos](#Requerimientos)
  
## Descripción

Este proyecto es una aplicación web desarrollada en **TypeScript** utilizando **React** para el frontend y **Express** con **MongoDB** para el backend. La aplicación permite realizar operaciones CRUD sobre una entidad principal, basada en datos consumidos desde una API gratuita y almacenados en MongoDB. 

### Funcionalidades

- **CRUD Completo:** Permite crear, leer, actualizar y eliminar datos.
- **Interfaz de Usuario:** Desarrollo con React,Typescript y TailwindCSS proporcionando una experiencia de usuario interactiva.
- **Paginación:** Implementada en el backend y en el frontend para manejar grandes volúmenes de datos.
- **API de Datos:** Consumo de datos desde una API gratuita ( `Themoviedb` ) y almacenamiento en MongoDB.

## Alojamiento

| DESARROLLO | URL |
| ------ | ------ |
| Backend | https://api-prueba-tecnica.onrender.com |
| Frontend | https://client-prueba-tecnica-579mfy2vj-manuels-projects-5a3093b2.vercel.app |

## Instalación y Ejecución

<blockquote>
<strong>Nota:</strong> Solo ejecuta los siguientes pasos si quieres ejecutar el proyecto de forma local
</blockquote>

### Backend

1. **Clona el repositorio**

   ```sh
   git init
   git clone https://github.com/Zetta94/API-Prueba-Tecnica.git
   ```

2. **Instala las dependencias necesarias**
   
   ```bash
   npm install
   ```
   
3. **Crea una cuenta en Themoviedb**
    
    -  Ingresa a https://developer.themoviedb.org/ y genera tu usuario para obtener una key y un token.
   
4. **Crea un archivo .env en la raíz del directorio y configura las siguientes variables de entorno**
   
   ```sh
   ##CONECTION
   PORT=<puerto-para-ejecutar-backend>
   MONGODB_URL=<tu-url-de-mongodb>
   
   ##LOGIN
   SECRET_KEY=<key-secreta>
   
   ##API
   API_URL= https://api.themoviedb.org/3
   API_KEY= <api-key-brindada-por-https://api.themoviedb.org/3>
   API_TOKEN= <token-brindado-por-https://api.themoviedb.org/3>
   ```
   
5. **Inicia el servidor**
   
   ```bash
   npm run dev
   ```
   
6. **Puedes revisar la documentación de la API ingresando en el siguiente endpoint (Reemplaza PORT por el puerto confirado en .env)** 
   ```bash
   localhost:<PORT>/apidocs
   ```
   
8. **Pruebas**
 
   **Puedes realizar pruebas utilizando <u>Postman</u> para comprobar el funcionamiento de los distintos endpoints**
    
### Frontend

1. **Clona el repositorio**
  ```sh
   git init
   git clone https://github.com/Zetta94/Client-Prueba-Tecnica.git
  ```  
2. **Instala las dependencias necesarias para poder ejecutar el proyecto**
   ```bash
   npm install
   
3. **Inicia la aplicación**
   
    ```bash
   npm start
    ```
<blockquote>
<strong>Nota:</strong> _Por defecto va a iniciar en localhost:3000_
</blockquote>

<br>

<div align="center">
  <h1 style="color: #4CAF50;">🎉 ¡Listo! 🎉 </h1>
  <h2>¡Ya puedes navegar por la web y comprobar sus funcionalidades!</h2>
</div>

## Tecnologías

- * Se utilizaron diversas tecnologias, plataformas y librerias, entre las que destacan las siguientes:

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Requerimientos

<div align="center">
  <h1> Requerimientos Backend  </h1>
</div>

### Entidades y CRUD

- **Desarrollo**: Se desarrolló utilizando **NodeJS**, **Typescript**, **MONGODB** y **ExpressJS**
- **Modelos**: Se implementaron dos modelos 'movies' y 'User'.
- **Operaciones CRUD**: Se realiza un CRUD para cada uno de los modelos que involucra diversos endpoints.
- **Almacenamiento**:  Se almacena en la base de datos de MONGODB la información resultado de la creación de nuevos elementos.

### Consumo de API

- **Servicio Backend**: Se realizó un servicio en el backend que consume datos de una API externa y los almacena en la base de datos de MongoDB.
- **Sincronización**: Se permite la sincronización de datos desde la API externa a la base de datos.

### Plus

- **Autenticación**: Se implemento ` passport ` para manejar la autenticación de los usuarios.
- **Seguridad**: Se utilizó ` crypto-js ` para manejar de forma segura las contraseñas de los usuarios, y se utilizó ` .env ` para proteger las variables de entorno.
- **Documentación**: Se documentaron las rutas de la API utilizando ` Swagger `.
- **Paginación**: Se implemento una paginación en la aplicación.
- **Despliegue**: Se implemento el despliegue de la aplicación.

<div align="center">
  <h1> Requerimientos Frontend  </h1>
</div>

### Interfaz de Usuario

- **Desarrollo**: Se creó una interfaz utilizando **React**, **TailwindCSS** y **Typescript**
- **Componentes**: Se utilizan recursos como formularios, botones, inputs y otros componentes para lograr una UI usable y óptima.

### Consumo de la API Backend

- **Integración CRUD**: Se consumen las rutas del backend para realizar operaciones CRUD desde el frontend.
- **Visualización de Datos**: Se muestran los datos obtenidos desde la base de datos con la posibilidad de ver detalles de estos.

### Plus

- **Estilos**: Se utilizó **TailwindCSS** para el estilizado de la aplicación.
- **Animaciones**: Se implemento al menos una animación utilizando CSS o una biblioteca de animaciones de React. En este caso se usó ` react-spring/web `
- **Búsqueda y Filtrado**: Se añadió un sistema de búsqueda y filtrado para mejorar la navegación y accesibilidad de los datos.

