"use server"

import { redirect } from "next/navigation";
import { getAutenticatedhUser } from "../lib/getAuthUser";
import { BlogPostSchema } from "../lib/rules";
import { getCollection } from "../lib/mongodb";
import { ObjectId } from "mongodb";

export async function createPost(state,formData){
        const user=await getAutenticatedhUser()
        if(!user){
                return redirect("/")
        }
        
        const validatedFormFields=BlogPostSchema.safeParse({
                title:formData.get("title"),
                content:formData.get("content"),
        })
        if(!validatedFormFields.success){
                return{
                        errors:validatedFormFields.error.flatten().fieldErrors,
                        title,
                        content
                }
        }
        try {
                const postCollection=await getCollection("posts");
                const post={
                        title:validatedFormFields.data.title,
                        content:validatedFormFields.data.content,
                        userId:ObjectId.createFromHexString(user.userId),
                }
                await postCollection.insertOne(post);
                
        } catch (error) {
                return {
                        errors:{title:error.message}
                }
        }
        redirect("/dashboard")
}