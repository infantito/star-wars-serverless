import aws from 'aws-sdk'

const dynamodb = new aws.DynamoDB({ region: process.env.SERVERLESS_REGION })

export interface People {
  id: string
  nombre: string
  genero: string
  peliculas: string[]
  color_ojo: string
  color_cabello: string
  color_piel: string
  altura: string
  peso: string
  planeta_natal: string
  especies: string[]
  naves_estelares: string[]
  vehiculos: string[]
  url: string
  fecha_nacimiento: string
  fecha_creacion: string
  fecha_edicion: string
}

const createTable = async () => {
  await dynamodb
    .createTable({
      AttributeDefinitions: [
        {
          AttributeName: 'name',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'name',
          KeyType: 'HASH',
        },
      ],
      BillingMode: 'PROVISIONED',
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 10,
      },
      TableName: 'People',
    })
    .promise()

  await dynamodb.waitFor('tableExists', { TableName: 'People' }).promise()

  console.log('Table has been created, please continue to insert data')
}

createTable().catch(error => console.error(JSON.stringify(error, null, 2)))
