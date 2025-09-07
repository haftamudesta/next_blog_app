import { createPost } from "@/actions/posts";
import { BlogForm } from "@/app/components/BlogForm";

export default async function createNewPost(){
        return (
                <div className="flex justify-center items-center mt-6">
                        <div className="flex justify-center items-center bg-teal-700 w-1/2 text-white px-2 py-1">
                                <div className="w-full">
                                        <div >
                                                <h1 className="text-center font-bold mb-4 text-xl">
                                                        Create New Post
                                                </h1>
                                                <BlogForm handler={createPost} />
                                        </div>
                                </div>
                        </div>
                </div>
        )

}