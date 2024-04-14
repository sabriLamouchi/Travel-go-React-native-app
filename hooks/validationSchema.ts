import * as Yup from 'yup'

export function validationSchema() {
    return Yup.object({
      email: Yup.string()
        .email("please enter a valid email").required("email is OBLIGATORY!!"),
      password: Yup.string().min(8).required("passsword is OBLIGATORY!!"),
    })
  }
