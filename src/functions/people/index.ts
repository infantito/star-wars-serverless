import schema from './schema'

export const post = {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/post.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'people',
        request: {
          schema: {
            'application/json': schema,
          },
        },
      },
    },
  ],
}

export const get = {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/get.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'people',
      },
    },
  ],
}
