import type { GetServerSidePropsContext } from "next";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";

import PageWrapper from "@components/PageWrapper";
import Landing from "@components/landing";

function RedirectPage({ session }: any) {
  return <Landing session={session} />;
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const session = await getServerSession({ req, res });

  if (!session?.user?.id) {
    return { props: { session } };
  }

  return { redirect: { permanent: false, destination: "/event-types" } };
}

RedirectPage.PageWrapper = PageWrapper;

export default RedirectPage;
