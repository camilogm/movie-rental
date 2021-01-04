# Movie-rental api

API para simular un movie-rental

# Importante

Es obligatorio correr la primera migración o tener el PG_DUMP para pruebas.
Para poder probar puedes usar la siguiente colleción de POSTMAN
https://www.getpostman.com/collections/16e5860b19095d9be1d8

import CLI ejemplo: pg_restore -U postgres -d restored_database -1 <file.sql>

### Scripts de ejecución del proyecto

| Funcionalidad     | commando                                                                    |
| ----------------- | --------------------------------------------------------------------------- |
| npm start         | Inicia el servidor con ts-node                                              |
| npm run start:dev | Inicia el servidor en modo watch                                            |
| npm run migration | Corre la primera migración si el ormconfig conecta satisfactoriamente la DB |

### headers

headers custom

- Content-Type : application/json
- Authorization : Bearer {token}

### Paths

### Resources

- [Json viewer online](http://jsonviewer.stack.hu/)

### Dependencies

- @nestjs-modules/mailer: ^1.5.1,
- @nestjs/common: ^7.5.1,
- @nestjs/config: ^0.6.1,
- @nestjs/core: ^7.5.1,
- @nestjs/jwt: ^7.2.0,
- @nestjs/mapped-types: ^0.1.1,
- @nestjs/passport: ^7.1.5,
- @nestjs/platform-express: ^7.5.1,
- @nestjs/schedule: ^0.4.1,
- @nestjs/typeorm: ^7.1.5,
- @types/bcrypt: ^3.0.0,
- bcrypt: ^5.0.0,
- bull: ^3.20.0,
- class-transformer: ^0.3.1,
- class-validator: ^0.12.2,
- joi: ^17.3.0,
- moment: ^2.29.1,
- nodemailer: ^6.4.17,
- passport: ^0.4.1,
- passport-jwt: ^4.0.0,
- pg: ^8.5.1,
- pug: ^3.0.0,
- reflect-metadata: ^0.1.13,
- rimraf: ^3.0.2,
- rxjs: ^6.6.3,
- typeorm: ^0.2.29

### Dev dependencies

- @nestjs/cli: ^7.5.1,
- @nestjs/schematics: ^7.1.3,
- @nestjs/testing: ^7.5.1,
- @types/express: ^4.17.8,
- @types/jest: ^26.0.15,
- @types/node: ^14.14.6,
- @types/passport-jwt: ^3.0.3,
- @types/supertest: ^2.0.10,
- @typescript-eslint/eslint-plugin: ^4.6.1,
- @typescript-eslint/parser: ^4.6.1,
- eslint: ^7.12.1,
- eslint-config-prettier: ^6.15.0,
- eslint-plugin-prettier: ^3.1.4,
- jest: ^26.6.3,
- prettier: ^2.1.2,
- supertest: ^6.0.0,
- ts-jest: ^26.4.3,
- ts-loader: ^8.0.8,
- ts-node: ^9.0.0,
- tsconfig-paths: ^3.9.0,
- typescript: ^4.0.5

### Repository

> [Link to gitlab](https://gitlab.com/gmcamiloe/movie-rental)

### License

- #### [ISC License](https://opensource.org/licenses/ISC)
