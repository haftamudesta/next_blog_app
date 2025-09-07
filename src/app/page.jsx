import { getCollection } from "@/lib/mongodb";
import PostCard from "./components/PostCard";

export default async function Home() {
  const postCollection=await getCollection("posts");
  const posts = await postCollection?.find().sort({$natural: -1}).toArray();

  if(!posts){
    return(
      <h1 className="text-center font-bold text-pink-400">There is no any post yet!!!</h1>
    )
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {posts.map((post)=>(
        <div key={post._id}>
         <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
