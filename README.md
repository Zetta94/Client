# _API Movies_ : Prueba Técnica 

## Tabla de Contenidos

- [Descripción](#descripción)
  - [Funcionalidades](#funcionalidades)
- [Alojamiento](#Alojamiento)
- [Instalación y Ejecución](#instalación-y-ejecución)
  - [Backend](#backend)
  - [Frontend](#frontend)

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

1.**Clona el repositorio**
  ```sh
   git init
   git clone https://github.com/Zetta94/Client-Prueba-Tecnica.git
  ``` 
    
2.**Instala las dependencias necesarias para poder ejecutar el proyecto

   ```bash
   npm install
  ```

3. **Inicia la aplicación**
   
    ```bash
   npm start
    ```
<blockquote>
<strong>Nota:</strong> _Por defecto va a iniciar en localhost:3000_
</blockquote>

<br>

<div align="center">
  <h1 style="color: #4CAF50; margin-bottom: 20px;">🎉 ¡Listo! 🎉</h1>
  <h2 style="margin-top: 20px;">¡Ya puedes navegar por la web y comprobar sus funcionalidades!</h2>
</div>



   
