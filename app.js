import express, { json } from 'express' // require -> commonJS
import { randomUUID } from 'node:crypto'
import cors from 'cors'

import clientes from './clientes.json' with {type:'json'}
import { validatecliente, validatePartialcliente } from './schemas/clientes.js'

import {createRequire} from 'node:module'
import { assert } from 'node:console'
import {readJSON} from './utils.js'
const require = createRequire(import.meta.url)
const clientes = readJSON('./clientes.json')

const app = express()
app.use(json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:3245',
      'https://clientes.com'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

// Todos los recursos que sean clientes se identifica con /clientes
app.get('/clientes', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredclientes = clientes.filter(
      cliente => cliente.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredclientes)
  }
  res.json(clientes)
})

app.get('/clientes/:documento', (req, res) => {
  const { documento } = req.params
  const cliente = clientes.find(cliente => cliente.documento === documento)
  if (cliente) return res.json(cliente)
  res.status(404).json({ message: 'cliente not found' })
})

app.post('/clientes', (req, res) => {
  const result = validatecliente(req.body)

  if (!result.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // en base de datos
  const newcliente = {
    id: randomUUID(), // uuid v4
    ...result.data
  }

  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  clientes.push(newcliente)

  res.status(201).json(newcliente)
})

app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params
  const clienteIndex = clientes.findIndex(cliente => cliente.id === id)

  if (clienteIndex === -1) {
    return res.status(404).json({ message: 'cliente not found' })
  }

  clientes.splice(clienteIndex, 1)

  return res.json({ message: 'cliente deleted' })
})

app.patch('/clientes/:id', (req, res) => {
  const result = validatePartialcliente(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const clienteIndex = clientes.findIndex(cliente => cliente.id === id)

  if (clienteIndex === -1) {
    return res.status(404).json({ message: 'cliente not found' })
  }

  const updatecliente = {
    ...clientes[clienteIndex],
    ...result.data
  }

  clientes[clienteIndex] = updatecliente

  return res.json(updatecliente)
})

const PORT = process.env.PORT ?? 3245

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
