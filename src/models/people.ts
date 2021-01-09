import * as dynamoose from 'dynamoose'
import { Document } from 'dynamoose/dist/Document'
import { ModelType } from 'dynamoose/dist/General'

const TABLE_NAME = 'people'

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

const schema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
})

export default dynamoose.model(TABLE_NAME, schema) as ModelType<
  People & Document
>
