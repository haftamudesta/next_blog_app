"use server"

import { RegisterFormSchema } from "@/lib/rules";

export async function register(state,formData){
        const validateFormFields=RegisterFormSchema.safeParse({
                email:formData.get("email"),
                password:formData.get("password"),
                confirmPassword:formData.get("confirmPassword")
        })
        if(!validateFormFields.success){
                return{
                        errors:validateFormFields.error.flatten().fieldErrors,
                        email:formData.get("email"),
                }
        }
}