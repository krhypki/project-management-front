import type { YupSchema } from 'vee-validate'
import * as Yup from 'yup'

type validationFields = 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword'

export const useValidationSchema = (fields: validationFields[]) => {
  const validators = {
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(4).required(),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
  }

  const validationSchema = Yup.object().shape(
    fields.reduce(
      (obj, el) => {
        obj[el] = validators[el]
        return obj
      },
      {} as { [key: string]: any }
    )
  )

  return {
    validationSchema
  }
}
