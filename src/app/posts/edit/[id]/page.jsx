import { ObjectId } from "mongodb";
import { BlogForm } from '@/app/components/BlogForm'
import { getCollection } from "@/lib/mongodb"
import { SerializePost } from "../../../../lib/serializePost";
import { updatePost } from "@/actions/posts";
import { getAutenticatedhUser } from "@/lib/getAuthUser";
import { redirect } from "next/navigation";


const EditPost = async({params}) => {
        const {id}=await params;
        const user=getAutenticatedhUser();
        const postCollection=await getCollection("posts");
        const foundPost=id.length===24? (await postCollection?.findOne({
                        _id:ObjectId.createFromHexString(id)
                })):(
                        null
                )

        const post=SerializePost(foundPost)
        console.log("user id:",user.userId)
        console.log("post id:",post.userId)
        if(user.userId!==post.userId) return redirect("/")
  return (
        <div className="flex justify-center items-center mt-6">
                                <div className="flex justify-center items-center bg-teal-700 w-1/2 text-white px-2 py-1 rounded-2xl border-2 border-red-400">
                                        <div className="w-full">
                                                <div >
                                                        <h1 className="text-center font-bold mb-4 text-xl">
                                                                Edit Post
                                                        </h1>
                                                        <BlogForm handler={updatePost} post={post} />
                                                </div>
                                        </div>
                                </div>
                        </div>
  )
}

export default EditPost