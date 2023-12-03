import serverUser from "@/lib/serverUser";
import {getUsers} from "@/actions/users";
import {getPosts} from "@/actions/posts";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import PostFeed from "@/components/post-feed";
import TweetForm from "@/components/tweet-form";
import Followbar from "@/components/followbar";

export const metadata = {
  title: "Home",
};

export default async function HomePage() {
  const user = await serverUser();
  const users = await getUsers();
  const posts = await getPosts();

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar user={user} className="w-full md:w-1/4" />
      <div className="w-full mb-5 md:mb-0 md:w-2/4">
        <Navbar title="Home" user={user} showEditor />
        <TweetForm user={user} />
        <PostFeed posts={posts} user={user} />
      </div>
      <Followbar users={users} user={user} className="w-full md:w-1/4" />
    </div>
  );
}
