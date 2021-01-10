# Star Wars API

Challenge Rimac Serverless - AWS Lambdas + Node + Typescript + Dynamodb

### Pasos

Instalar dependencias

```sh
npm ci
```

### Configurar .env (.env.example)

### Instalar Dynamodb localmente

```sh
sls dynamodb install
```

### Correr migraciones

```sh
sls dynamodb executeAll
```

Click (aquí)[https://www.serverless.com/plugins/serverless-dynamodb-local] para más detalles


### Iniciar proyecto localmente

```sh
npm start
```

Visitar: (http://localhost:8000)[http://localhost:8000]

### Ejecutar tests

Debes tener en cuenta que el servidor esté funcionando

```sh
npm run test
```

### Apis

- people

| servicio      | detalle                       |
|:--------------|:----------------------------------|
| `dev/people`      | Guardar un people. |
| `dev/people/{id}` | Obtener un people |

### Despliegue

Tener en cuenta instalar `serverless` de manera global o usar `npx`.
También deber tener un usuario con los permisos correspondientes. (IAM)[https://docs.aws.amazon.com/es_es/IAM/latest/UserGuide/introduction.html]

```sh
sls deploy
```

### Para más detalles

Revisar (TEMPLATE.md)[https://github.com/infantito/star-wars-serverless/blob/master/TEMPLATE.md]