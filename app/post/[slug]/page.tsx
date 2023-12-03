import {getUsers} from "@/actions/users";
import {getPost} from "@/actions/posts";
import serverUser from "@/lib/serverUser";
import Followbar from "@/components/followbar";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import PostItem from "@/components/post-item";
import CommentForm from "@/components/comment-form";
import CommentFeed from "@/components/comment-feed";

export default async function UserDetailedPage({
  params,
}: {
  params: {slug: string};
}) {
  const user = await serverUser();
  const users = await getUsers();
  const post = await getPost(params.slug);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar user={user} className="w-full md:w-1/4" />
      <div className="w-full mb-5 md:mb-0 md:w-2/4">
        <Navbar title="Tweet" user={user} showEditor showBackArrow />
        <PostItem user={user} data={post} />
        <CommentForm user={user} postId={params.slug} />
        <CommentFeed comments={post?.comments} />
      </div>
      <Followbar users={users} user={user} className="w-full md:w-1/4" />
    </div>
  );
}
