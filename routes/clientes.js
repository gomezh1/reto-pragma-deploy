import { randomUUID} from "express"
import { Router } from "express"
import { validatecliente, validatePartialcliente } from './schemas/clientes.js'
import clientes from './clientes.json' with {type:'json'}

export const clienteRouter = Router()


clienteRouter.get('./', (req, res) => {
    const { genero } = req.query
    if (genero) {
      const filteredclientes = clientes.filter(
        cliente => cliente.genero.some(g => g.toLowerCase() === genero.toLowerCase())
      )
      return res.json(filteredclientes)
    }
    res.json(clientes)
})

clienteRouter.get('./:documento',(req, res) => {
    const { documento } = req.params
    const cliente = clientes.find(cliente => cliente.documento === documento)
    if (cliente) return res.json(cliente)
    res.status(404).json({ message: 'cliente not found' })
  })

  clienteRouter.post('./',(req, res) => {
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

  clienteRouter.delete('./:documento',(req, res) => {
    const { id } = req.params
    const clienteIndex = clientes.findIndex(cliente => cliente.id === id)
  
    if (clienteIndex === -1) {
      return res.status(404).json({ message: 'cliente not found' })
    }
  
    clientes.splice(clienteIndex, 1)
  
    return res.json({ message: 'cliente deleted' })
  })

  clienteRouter.patch(':id', (req, res) => {
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