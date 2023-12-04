import {getUser, getUsers} from "@/actions/users";
import {getPosts} from "@/actions/posts";
import serverUser from "@/lib/serverUser";
import Followbar from "@/components/followbar";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import UserHero from "@/components/user-hero";
import UserBio from "@/components/user-bio";
import PostFeed from "@/components/post-feed";

export const metadata = {
  title: "User Profile",
};

export default async function UserDetailedPage({
  params,
}: {
  params: {slug: string};
}) {
  const user = await serverUser();
  const users = await getUsers();
  const fetchUser = await getUser(params.slug);
  const posts = await getPosts(params.slug);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar user={user} />
      <div className="w-full mb-5 md:mb-0 md:w-2/4">
        <Navbar
          title="Profile"
          user={user}
          showBackArrow
          showEditor={user?.id === fetchUser?.id}
        />
        <UserHero user={fetchUser} />
        <UserBio userId={params.slug} fetchUser={fetchUser} user={user} />
        <PostFeed posts={posts} user={user} />
      </div>
      <Followbar users={users} user={user} />
    </div>
  );
}
