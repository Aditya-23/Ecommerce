import * as Yup from "yup"

export const Signup_validators = Yup.object().shape({
    firstname : Yup.string().required("Required!").min(4, "min 4 characters"). max(15, "max 15 characters"),
    lastname : Yup.string().required("Required!").min(4, "min 4 characters"). max(15, "max 15 characters"),
    email : Yup.string().email().required("Required!"),
    password : Yup.string().min(6, "min 6 characters").max(15, "max 15 characters"),
    phone : Yup.number().min(10, "min 10 characters")
})

export const Signin_validators = Yup.object().shape({
    email : Yup.string().email().required("Required!"),
    password : Yup.string().min(6, "min 6 characters").max(15, "max 15 characters").required("Required!")
})
