"use server"

import { redirect } from "next/navigation";
import { getAutenticatedhUser } from "../lib/getAuthUser";
import { BlogPostSchema } from "../lib/rules";
import { getCollection } from "../lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function createPost(state,formData){
        const user=await getAutenticatedhUser();
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

export async function updatePost(state,formData){
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
        const postId= formData.get("postId");
        const postCollection=await getCollection("posts");
        const post=await postCollection.findOne({
                _id:ObjectId.createFromHexString(postId)
        })
        if(user.userId!==post.userId.toString()) return redirect("/")
        postCollection.findOneAndUpdate({_id:post._id},{
         $set:{
                title:validatedFormFields.data.title,
                content:validatedFormFields.data.content,
         }
         })
        redirect("/dashboard")
}

export async function deletePost(formData){
        const user=await getAutenticatedhUser()
        if(!user){
                return redirect("/")
        }
        const postCollection=await getCollection("posts");
        const post =await postCollection.findOne({
                _id:ObjectId.createFromHexString(formData.get("postId")),
        })
        if(user.userId!==post.userId.toString()) return redirect("/")
        postCollection.findOneAndDelete({_id: post._id});
        
        revalidatePath("/dashboard")
}