import * as Yup from 'yup'
import { z } from 'zod';
export function validationSchema() {
    return Yup.object({
      email: Yup.string()
        .email("please enter a valid email").required("email is OBLIGATORY!!"),
      password: Yup.string().min(8).required("passsword is OBLIGATORY!!"),
    })
  }

export const  validateSearchDistinationSchema= z.object({
    location:z.string().min(1,"Please check The location !!"),
    arrival_date:z.string().min(1,"Please check your arrival date !!"),
    departure_date:z.string().min(1,"Please check your departure date !!"),
    adults:z.string().min(1,"How many person you are ?")
})
