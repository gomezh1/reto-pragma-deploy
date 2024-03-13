import z from 'zod'

const clienteSchema = object({
  tipoDocumento: string({
    invalid_type_error: 'tipoDocumento title must be a string',
    required_error: 'tipoDocumento title is required.'
  }),
  documento: string({
    invalid_type_error: 'documento title must be a string',
    required_error: 'documento title is required.'
  }),
  primerNombre: string({
    invalid_type_error: 'primerNombre title must be a string',
    required_error: 'primerNombre title is required.'
  }),
  segundoNombre: string({
    invalid_type_error: 'segundoNombre title must be a string',
    //required_error: 'primerNombre title is required.'
  }),
  primerApellido: string({
    invalid_type_error: 'primerApellido title must be a string',
    required_error: 'primerApellido title is required.'
  }),
  segundoApellido: string({
    invalid_type_error: 'segundoApellido title must be a string',
    //required_error: 'segundoApellido title is required.'
  }),
  ingresos : number({invalid_type_error: 'ingresos most be a number',
    required_error: 'Cliente ingreso is required' 
      }).positive(),
      ciudadUbicacion: string({
    invalid_type_error: 'ciudadUbicacion title must be a string',
    required_error: 'ciudadUbicacion title is required.'
      }),    
  telefono : string({invalid_type_error: 'telefono most be a number',
    required_error: 'telefono ingreso is required' 
      }).max(15),  
  edad : number({invalid_type_error: 'edad most be a number',
    required_error: 'edad ingreso is required' 
      }).positive().max(110),      
  genero: array(
    (['M', 'F']),
    {
      required_error: 'genero  is required.',
      invalid_type_error: 'genero  must be an array of enum'
    }
  ),
  email: string().url({
    message: 'email must be a valid URL'
  }),
})

export function validatecliente (input) {
  return clienteSchema.safeParse(input)
}

export function validatePartialcliente (input) {
  return clienteSchema.partial().safeParse(input)
}


