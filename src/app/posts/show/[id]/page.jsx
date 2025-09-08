
import PostCard from "@/app/components/PostCard";
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb";
import { SerializePost } from "../../../../lib/serializePost";

export default async function ShowPostDetail({params}){
        const {id}=await params;
        const postCollection=await getCollection("posts");
        const foundPost=id.length===24? (await postCollection?.findOne({
                _id:ObjectId.createFromHexString(id)
        })):(
                null
        )
        const post=SerializePost(foundPost)
        return (
                <div className=" w-1/2 bg-gray-200 mt-4">
                       <div>
                         {post?(
                                <div>
                                        <PostCard post={post} />
                                </div>
                        ):(
                                <h1>post not found</h1>
                        )}
                       </div>
                </div>
        )
}