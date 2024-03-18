# Hackaton CodeQuest2024 - devtalles

## Desarrolladores

# 🚀 EQUIPO# 24 : TitanesDev

Este proyecto fue desarrollado por el equipo **TitanesDev**, compuesto por:

- ![alt text](colombia.png)**Alexander Castro** - Colombia
- ![alt text](spain.png) **Shester** - España!
- ![alt text](bandera.png)**Miguel** - Bolivia
Cada uno de estos desarrolladores ha contribuido significativamente al proyecto. ¡Gracias por su arduo trabajo y dedicación!


## Descripción

Esta es una aplicación web desarrollada con Express.js para el backend y Angular para el frontend. La aplicación permite a los usuarios registrarse y participar en sorteos. Los usuarios pueden tener uno de dos roles: administrador o participante.

Los participantes generalmente se registran a través de Discord y pueden ver el listado de sorteos y premios, y registrarse en ellos. Los administradores pueden iniciar sesión a través de correo electrónico y contraseña, y tienen la capacidad de realizar operaciones CRUD en los sorteos y premios, así como asignar un ganador.

## Instalación

Para instalar y ejecutar esta aplicación, express - backend

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT= 3000
MONGO_URI=
JWT_SECRET=
JWT_LIFETIME=
APP_ID=
PUBLIC_KEY=
CLIENT_REDIRECT_URI=
CLIENT_ID=
CLIENT_SECRET=
REDIRECT_DISCORD_URI=
DISCORD_TOKEN=
BASE_DICORD_URL=


Para instalación en el front end 
1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. npm run start


## Ejecuta la aplicación con `npm run start`.
 Uso
Para iniciar la aplicación, simplemente ejecuta npm run start en la línea de comandos.

Contribuir
Si deseas contribuir al proyecto, por favor, abre un issue o una pull request.

Licencia
MIT


.env

PORT= 3000
MONGO_URI=mongodb+srv://titanes_dev:qqc7h6GlJNESdqn3@titanes_db.drxgzvy.mongodb.net/sorteo

JWT_SECRET=thisissecretois
JWT_LIFETIME=30d

CLIENT_ID=1216790330196627477
CLIENT_SECRET=aja0wSj2RATZxiSQw8BoQwD9t3mUHvQX

DISCORD_TOKEN=MTIxNjc5MDMzMDE5NjYyNzQ3Nw.G7HN69.sz7By3jCOxnkasdFW5UxgyTgQAnPPjHiBuLy5w
BASE_DICORD_URL=https://discord.com/api/v10

# Auth Dc
CLIENT_REDIRECT_URI=http://localhost:3000/auth/redirect

# DISCORD
CLIENT_ID=1216790330196627477
CLIENT_SECRET=aja0wSj2RATZxiSQw8BoQwD9t3mUHvQX
REDIRECT_DISCORD_URI=http://localhost:3000/api/discord/authorize
#REDIRECT_DISCORD_URI=http://localhost:3000/api/redirect


JWT_SECRET=diegoLoco

