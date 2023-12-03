"use client";

import Image from "next/image";

const UserHero = ({user}: {user: any}) => {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && (
          <Image
            src={user.coverImage}
            fill
            alt="cover"
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default UserHero;
