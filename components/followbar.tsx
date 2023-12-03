import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar";
import {ScrollArea} from "./ui/scroll-area";

interface FollowbarType {
  users: any;
  user: any;
  className: any;
}

const Followbar = ({users, user, className}: FollowbarType) => {
  if (users.length === 0) return null;

  const filterUsers = users.filter((el: any) => el.id != user.id);

  return (
    <div
      className={cn("bg-gray-200 h-[50vh] mb-5 md:mb-0 md:h-screen", className)}
    >
      <div className="px-3 py-5">
        <h2 className="text-xl font-semibold">Who to follow</h2>
        <ScrollArea className="bg-gray-100 flex flex-col rounded-md border px-2 h-[40vh] md:h-[80vh] mt-5">
          {filterUsers.map((user: any) => (
            <div
              key={user.id}
              className="flex flex-row mt-5 bg-gray-200 p-3 rounded"
            >
              <Avatar>
                <AvatarImage src={user?.profileImage} />
                <AvatarFallback>{user?.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col ml-1">
                <p className="font-semibold text-sm">{user?.name}</p>
                <p className="text-sm">@{user?.username}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Followbar;
