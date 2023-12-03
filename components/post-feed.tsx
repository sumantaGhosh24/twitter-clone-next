import PostItem from "./post-item";

const PostFeed = ({posts, user}: {posts: any; user: any}) => {
  return (
    <>
      {posts.map((post: any) => (
        <PostItem key={post.id} data={post} user={user} />
      ))}
    </>
  );
};

export default PostFeed;
