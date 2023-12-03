import {formatDistanceToNowStrict} from "date-fns";
import {Twitter} from "lucide-react";

const NotificationFeed = ({notifications}: {notifications: any}) => {
  if (notifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-1 mt-2.5">
      {notifications.map((notification: any) => (
        <div
          key={notification.id}
          className="flex flex-row items-center py-3 px-6 gap-4 my-1.5 bg-gray-200 rounded"
        >
          <Twitter color="black" size={32} />
          <p>{notification.body}</p>
          <p className="font-light text-xs">
            {formatDistanceToNowStrict(new Date(notification?.createdAt))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotificationFeed;
