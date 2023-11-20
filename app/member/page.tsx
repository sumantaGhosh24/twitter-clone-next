import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

import {options} from "../api/auth/[...nextauth]/options";

export default async function MemberPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/member");
  }

  return (
    <section>
      <h1>Member Page</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </section>
  );
}
