export const SerializePost = (post) => {
  if (!post) return null;

  return {
    ...post,
    _id: post._id.toString(),
    userId: post.userId ? post.userId.toString() : null,
  };
};