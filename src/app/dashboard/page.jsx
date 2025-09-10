import { getCollection } from "@/lib/mongodb";
import { getAutenticatedhUser } from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { deletePost } from "@/actions/posts";
import { SerializePost } from "@/lib/serializePost";


export default async function DashBoard(){
        const user=await getAutenticatedhUser();
        const postsCollection=await getCollection("posts");
        const userPosts=await postsCollection?.find({userId:ObjectId.createFromHexString(user.userId)}).sort({$natural:-1}).toArray();
       
        if(!userPosts) return <p>Faild to fetch data from database</p>
        if(userPosts.length===0) return <p>There is no any post yet.</p>
        return(
                <div>
                <h1 className="text-3xl text-center underline">DashBoard</h1>
                <h2>Welcome </h2>
                {userPosts &&(
                        <table>
                                <thead>
                                        <tr>
                                                <th className="w-3/6 px-8 py-3">
                                                Title
                                                </th>
                                                <th className="w-3/6 sr-only px-8 py-3">
                                                View
                                                </th>
                                                <th className="w-3/6 sr-only px-8 py-3">
                                                Edit
                                                </th>
                                                <th className="w-3/6 sr-only px-6 py-3">
                                                Delete
                                                </th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {userPosts.map((post)=>(
                                                <tr key={post._id.toString()}>
                                                        <td className="w-3/6 px-8 py-3">
                                                        {post.title}
                                                        </td>
                                                        <td className="px-8 py-3">
                                                        <Link href={`/posts/show/${post._id.toString()}`} className="w-3/6 text-purple-300">
                                                        View
                                                        </Link>
                                                        </td>
                                                        <td className="px-8 py-3">
                                                        <Link href={`/posts/edit/${post._id.toString()}`} className="w-3/6 text-amber-300">
                                                        Edit
                                                        </Link>
                                                        </td>
                                                        <td className="text-red-500 px-8 py-3 ">
                                                                <form action={deletePost}>
                                                                <input type="hidden" name="postId" defaultValue={post._id.toString()} />
                                                                <button type="submit" className="cursor-pointer">
                                                                        Delete
                                                                </button>
                                                                </form>
                                                        </td>
                                                </tr>
                                        ))}
                                </tbody>
                        </table>
                )}
                </div>
        )
}