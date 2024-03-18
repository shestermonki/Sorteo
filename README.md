# Hackaton CodeQuest2024 - devtalles

## Desarrolladores

Este proyecto fue desarrollado por:

- ![Bandera de Colombia](https://en.wikipedia.org/wiki/Flag_of_Colombia) **Alexander Castro** - Colombia
- ![Bandera de España](https://en.wikipedia.org/wiki/Flag_of_Spain) **Shester** - España
- ![Bandera de Bolivia](https://en.wikipedia.org/wiki/Flag_of_Bolivia) **Miguel** - Bolivia

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


## Ejecuta la aplicación con `npm run start`.
 Uso
Para iniciar la aplicación, simplemente ejecuta npm run start en la línea de comandos.

Contribuir
Si deseas contribuir al proyecto, por favor, abre un issue o una pull request.

Licencia
MIT

