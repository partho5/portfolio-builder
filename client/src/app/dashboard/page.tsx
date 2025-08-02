// dashboard/page.tsx

import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import { DashboardContainer } from "../components/dashboard/DashboardContainer";

export default async function DashboardPage() {
  const session = await getSession();
  const returnToUrl = `/dashboard`;
  
  if (!session?.user) {
    redirect(`/api/auth/login?returnTo=${encodeURIComponent(returnToUrl)}`);
  }

  const loggedInUsername = session.user.nickname || session.user.username || session.user.name;

  return <DashboardContainer username={loggedInUsername} />;
}
