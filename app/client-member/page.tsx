"use client";

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function ClientMemberPage() {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client-member");
    },
  });

  return (
    <section>
      <h1>Client Member Page</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </section>
  );
}
