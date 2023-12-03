import {searchPost} from "@/actions/posts";
import {getUsers} from "@/actions/users";
import serverUser from "@/lib/serverUser";
import Followbar from "@/components/followbar";
import Navbar from "@/components/navbar";
import PostFeed from "@/components/post-feed";
import Searchbar from "@/components/searchbar";
import Sidebar from "@/components/sidebar";

export const metadata = {
  title: "Search Post",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {[key: string]: string | undefined};
}) {
  const user = await serverUser();
  const users = await getUsers();
  const posts = await searchPost(searchParams?.q);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar user={user} className="w-full md:w-1/4" />
      <div className="w-full mb-5 md:mb-0 md:w-2/4">
        <Navbar title="Search" user={user} showEditor />
        <Searchbar />
        {posts?.length > 0 ? (
          <PostFeed posts={posts} user={user} />
        ) : (
          <p className="text-center font-bold">Search a valid query</p>
        )}
      </div>
      <Followbar users={users} user={user} className="w-full md:w-1/4" />
    </div>
  );
}
