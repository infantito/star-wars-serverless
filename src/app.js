const buttonPost = document.querySelector('button.tertiary')

const createDetails = document.querySelector('#create pre')

const buttonGet = document.querySelector('button.primary')

const readDetails = document.querySelector('#read pre')

function createPeople(event) {
  const { target } = event

  const text = target.innerHTML

  target.innerHTML = '<div class="spinner"></div>'

  target.disabled = true

  readDetails.parentElement.removeAttribute('open')

  readDetails.innerHTML = ''

  const date = faker.date.past(
    50,
    new Date('Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)'),
  )

  const data = {
    nombre: faker.name.findName(),
    genero: faker.name.gender(),
    peliculas: faker.internet.url(),
    color_ojo: faker.vehicle.color(),
    color_cabello: faker.vehicle.color(),
    color_piel: faker.vehicle.color(),
    altura: faker.random.number().toString(),
    peso: faker.random.number().toString(),
    planeta_natal: faker.internet.url(),
    especies: faker.internet.url(),
    naves_estelares: faker.internet.url(),
    vehiculos: faker.internet.url(),
    url: faker.internet.url(),
    fecha_nacimiento: `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`,
  }

  fetch('https://ep2vp42qli.execute-api.us-east-1.amazonaws.com/dev/people', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json()
    })
    .then(json => {
      createDetails.innerHTML = JSON.stringify(json, null, 2)
    })
    .catch(error => {
      createDetails.innerHTML = JSON.stringify(error, null, 2)
    })
    .finally(() => {
      createDetails.parentElement.setAttribute('open', true)

      target.innerHTML = text

      target.disabled = false

      buttonGet.disabled = false
    })
}

function readPeople(event) {
  const { id } = JSON.parse(createDetails.innerHTML)

  const { target } = event

  const text = target.innerHTML

  target.innerHTML = '<div class="spinner"></div>'

  target.disabled = true

  fetch(
    `https://ep2vp42qli.execute-api.us-east-1.amazonaws.com/dev/people/${id}`,
    {
      method: 'GET',
    },
  )
    .then(response => {
      return response.json()
    })
    .then(json => {
      readDetails.innerHTML = JSON.stringify(json, null, 2)
    })
    .catch(error => {
      readDetails.innerHTML = JSON.stringify(error, null, 2)
    })
    .finally(() => {
      readDetails.parentElement.setAttribute('open', true)

      target.innerHTML = text
    })
}

buttonPost.addEventListener('click', createPeople)

buttonGet.addEventListener('click', readPeople)
