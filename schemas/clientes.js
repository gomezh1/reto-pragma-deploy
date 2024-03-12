const z = require('zod')

const clienteSchema = z.object({
  tipoDocumento: z.string({
    invalid_type_error: 'tipoDocumento title must be a string',
    required_error: 'tipoDocumento title is required.'
  }),
  documento: z.string({
    invalid_type_error: 'documento title must be a string',
    required_error: 'documento title is required.'
  }),
  primerNombre: z.string({
    invalid_type_error: 'primerNombre title must be a string',
    required_error: 'primerNombre title is required.'
  }),
  segundoNombre: z.string({
    invalid_type_error: 'segundoNombre title must be a string',
    //required_error: 'primerNombre title is required.'
  }),
  primerApellido: z.string({
    invalid_type_error: 'primerApellido title must be a string',
    required_error: 'primerApellido title is required.'
  }),
  segundoApellido: z.string({
    invalid_type_error: 'segundoApellido title must be a string',
    //required_error: 'segundoApellido title is required.'
  }),
  ingresos : z.number({invalid_type_error: 'ingresos most be a number',
    required_error: 'Cliente ingreso is required' 
      }).positive(),
      ciudadUbicacion: z.string({
    invalid_type_error: 'ciudadUbicacion title must be a string',
    required_error: 'ciudadUbicacion title is required.'
      }),    
  telefono : z.string({invalid_type_error: 'telefono most be a number',
    required_error: 'telefono ingreso is required' 
      }).max(15),  
  edad : z.number({invalid_type_error: 'edad most be a number',
    required_error: 'edad ingreso is required' 
      }).positive().max(110),      
  genero: z.array(
    z.enum(['M', 'F']),
    {
      required_error: 'genero  is required.',
      invalid_type_error: 'genero  must be an array of enum Genre'
    }
  ),
  email: z.string().url({
    message: 'email must be a valid URL'
  }),
})

function validatecliente (input) {
  return clienteSchema.safeParse(input)
}

function validatePartialcliente (input) {
  return clienteSchema.partial().safeParse(input)
}

module.exports = {
  validatecliente,
  validatePartialcliente
}
