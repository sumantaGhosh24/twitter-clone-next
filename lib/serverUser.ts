import {getServerSession} from "next-auth";

import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const serverUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};

export default serverUser;
