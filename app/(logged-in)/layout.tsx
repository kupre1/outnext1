import { auth } from "@/auth";
import LogoutButton from "@/components/logaout-button/LogoutButton";

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-200 flex justify-between p-4 items-baseline">
        <ul className="flex gap-4">
          <li>
            <Link href="/my-account">
              {session?.user?.email && <div>{session.user.email}</div>}
            </Link>
          </li>
          <li>
            <Link href="/change-password">change password</Link>
          </li>
        </ul>
        <div>
          <LogoutButton />
        </div>
      </nav>
      <div className="flex-1 justify-center items-center">{children}</div>
    </div>
  );
}
