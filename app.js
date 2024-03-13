import express, { json } from 'express' // require -> commonJS
import { clienteRouter }  from './routes/clientes.js'
import { corsMiddleware } from './middleware/cors.js' 

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

// Todos los recursos que sean clientes se identifica con /clientes
app.use('./clientes'.clientesRouter)

const PORT = process.env.PORT ?? 3245

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
