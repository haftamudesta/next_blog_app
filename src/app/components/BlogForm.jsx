"use client"

import { useActionState } from "react"

export const BlogForm=({handler})=>{
        const [state,action,isPending]=useActionState(handler,undefined)
        console.log("State:",state)
        return (
                <form action={action} >
                        <div className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" name="title"
                                        className="border-2 border-gray-400"
                                        defaultValue={state?.title}
                                        />
                                        {state?.errors?.title&&
                                                <p className="text-red-600 font-bold">      {state.errors.title}
                                                </p>}
                               </div>
                                <div className="flex flex-col">
                                        <label htmlFor="content">Content:</label>
                                        <textarea name="content" rows={6}
                                        className="border-2 border-gray-400"
                                        defaultValue={state?.content}
                                        />
                                        {state?.errors?.content&&
                                                <p className="text-red-600 font-bold">      {state.errors.content}
                                                </p>}
                                </div>
                                        <button disabled={isPending}
                                        className="text-center bg-purple-500 text-blue-100 w-1/4 py-2 px-4 rounded-sm cursor-pointer"
                                        >{isPending?"Loading...":"Submit"}</button>
                                
                        </div>
                </form>
        )
}