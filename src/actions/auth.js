"use server"

import bcrypt from "bcrypt"
import { getCollection } from "@/lib/mongodb";
import { RegisterFormSchema } from "@/lib/rules";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/sessions";



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

        const {email,password}=validateFormFields.data
        const userCollection=await getCollection("users");
        if(!userCollection) return {
                errors:
                {message:"Server Error!!"}
        };

        const existingUser=await userCollection.findOne({ email })
        if(existingUser){
                return{
                        errors:
                {message:"Email already exist. Please log in with your email!!"}
                }
        }
        
        const hashedPassword=await bcrypt.hash(password,10);
        const results=await userCollection.insertOne({email,password:hashedPassword})

        await createSession(results.insertedId.toString())
        redirect("/dashboard")
        
}