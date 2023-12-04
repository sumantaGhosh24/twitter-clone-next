import {getUsers} from "@/actions/users";
import {getNotifications} from "@/actions/notifications";
import serverUser from "@/lib/serverUser";
import Followbar from "@/components/followbar";
import Navbar from "@/components/navbar";
import NotificationFeed from "@/components/notification-feed";
import Sidebar from "@/components/sidebar";

export default async function NotificationsPage() {
  const user = await serverUser();
  const users = await getUsers();
  const notifications = await getNotifications(user?.id);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar user={user} />
      <div className="w-full mb-5 md:mb-0 md:w-2/4">
        <Navbar title="Notifications" user={user} showEditor />
        <NotificationFeed notifications={notifications} />
      </div>
      <Followbar users={users} user={user} />
    </div>
  );
}
