import { Button } from "@shadcdn/ui";
import RichContentParser from "@ui/fayaz/RichContentParser";
import insertNonBreakingSpaces from "@ui/utilities/insert-non-breaking-spaces";
import BioLink from "@ui/valery/bio-link";
import BookItem from "@ui/valery/book-item";
import CirclesBackground from "@ui/valery/circles-background";
import ExperienceItem from "@ui/valery/experience-item";
import FactItem from "@ui/valery/fact-item";
import PodcastItem from "@ui/valery/podcast-item";
import ProjectItem from "@ui/valery/project-item";
import Publication from "@ui/valery/publication-item";
import VideoItem from "@ui/valery/video-item";
import { cva } from "class-variance-authority";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { CalendarPlus } from "react-bootstrap-icons";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { getUsernameList } from "@calcom/lib/defaultEvents";
import { Tooltip } from "@calcom/ui";

import PageWrapper from "@components/PageWrapper";

const Section = ({ title, tileLayout = false, children }) => {
  const childrenLayoutClasses = cva([], {
    variants: {
      tileLayout: {
        true: ["sm:columns-2", "gap-14"],
        false: ["flex", "flex-col", "gap-7"],
      },
    },
  });
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-medium uppercase tracking-[0.08em] text-gray-500">{title}</h2>
      <div className={childrenLayoutClasses({ tileLayout })}>{children}</div>
    </section>
  );
};

// Two-part links section.
// Top: Links to social media, etc. (Icon-only.)
// Bottom: Generic links
const LinksSection = ({ links }) => {
  const iconLinks = links?.filter(({ key, url }) => key !== "other" && key !== "website" && url !== "");
  const genericLinks = links?.filter(({ key, url }) => key === "other" || (key === "website" && url !== ""));

  // Two-part variant
  // return (
  //   <div className="flex max-w-md flex-col gap-3">
  //     {/* Icon links */}
  //     <div className="flex flex-wrap gap-x-4 gap-y-1">
  //       {iconLinks.map(({ key, url, name }, index) => (
  //         <BioLink key={index} {...{ type: key, url, name }} />
  //       ))}
  //     </div>
  //     {/* Generic links */}
  //     <div className="flex flex-wrap gap-x-3.5 gap-y-1">
  //       {genericLinks.map(({ key, url, name }, index) => (
  //         <BioLink key={index} {...{ type: key, url, name }} />
  //       ))}
  //     </div>
  //   </div>
  // );

  // One-part variant
  return (
    <div className="flex max-w-md flex-col gap-3">
      <div className="flex flex-wrap gap-x-5 gap-y-1">
        {iconLinks.map((item) => {
          return <BioLink key={item?.id} itemKey={item?.key} name={item?.name} url={item?.url} />;
        })}
        {genericLinks.map((item) => (
          <BioLink key={item?.id} itemKey={item?.key} name={item?.name} url={item?.url} />
        ))}
      </div>
    </div>
  );
};

const ProfilePage = ({ user, userEvents, userSession }) => {
  const profileData = JSON.parse(user);
  const eventTypes = JSON.parse(userEvents);
  const session = userSession ? JSON.parse(userSession) : null;

  console.log({ profileData, eventTypes, session });
  const bookCallLink = `/${profileData?.username}/${
    eventTypes?.filter((item) => item.length === 30)[0]?.slug
  }`;

  const userPhoto = () => {
    if (profileData.avatar) return profileData?.avatar;
    if (profileData.name) return `https://api.dicebear.com/6.x/initials/svg?seed=${profileData.name}`;
    return `https://api.dicebear.com/7.x/shapes/svg?seed=${profileData.uid}`;
  };

  const userPlainTextBio =
    profileData?.bio?.content?.length && profileData?.bio?.content[0]?.content
      ? profileData.bio.content[0].content.map((item) => item?.text ?? "").join("")
      : "";

  const isLoggedInUser = profileData?.id === session?.user?.id;

  return (
    <div className="flex flex-col items-center bg-white leading-6 text-gray-900">
      {/* Profile header */}
      <NextSeo
        title={`${profileData?.name} – Book a call with me`}
        description={profileData?.bio ? userPlainTextBio : `${profileData?.name} profile on Borg.id`}
        openGraph={{
          site_name: "Borg.id",
          title: `${profileData?.name} – Book a call with me`,
          description: `${profileData?.bio ? userPlainTextBio : `${profileData?.name} profile on Borg.id`}`,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL}/api/og?p=${encodeURIComponent(userPhoto())}&n=${
                profileData?.name
              }&w=${encodeURIComponent(profileData?.company)}&r=${encodeURIComponent(
                profileData?.role
              )}&t=${encodeURIComponent(profileData?.advice_on)}`,
              // url: `${process.env.NEXT_PUBLIC_APP_URL}/api/og?profileID=${profileID}`,
              width: 1200,
              height: 630,
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      {/* {process.env.NODE_ENV === "production" ? "" : <Header />} */}
      <div className="mx-[5%] mb-12 mt-20 flex w-[90%] max-w-2xl flex-col gap-8 md:w-full">
        {/* Top */}
        <div className="grid w-full grid-flow-dense grid-cols-[auto_1fr] gap-x-[18px] gap-y-4 sm:grid-cols-[auto_1fr_auto] ">
          <img
            src={userPhoto()}
            className="w-[88px] shrink-0 self-start rounded-full"
            alt={profileData?.name}
          />
          <div className="col-span-2 mr-5 flex flex-col self-center sm:col-span-1 sm:self-start sm:pt-2">
            <div className="font-bold" id="name">
              {profileData?.name}
            </div>
            {/* {profileData?.role && (
              <div className="text-sm leading-6" id="role">
                {titleCase(profileData?.role)}
              </div>
            )} */}
            {profileData?.company && (
              <div className="flex flex-row items-start gap-1.5 text-sm leading-6">
                <div className="w-3 shrink-0 text-gray-400">at</div>
                <div id="company">{insertNonBreakingSpaces(profileData?.company)}</div>
              </div>
            )}
          </div>

          {/* Button block */}
          <div
            id="call-charges"
            className="flex flex-col items-center gap-1.5 self-center justify-self-end leading-6 sm:self-center">
            <Button
              className="flex h-10 flex-row items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 text-white hover:bg-gray-800 active:bg-gray-950"
              asChild>
              <Link href={bookCallLink}>
                <CalendarPlus size={16} />
                <div className="whitespace-nowrap ">Book a Call →</div>
              </Link>
            </Button>

            <div className="text-[15px] text-gray-900">${profileData?.pricePerHour}/hr</div>
          </div>
        </div>
        {/* Links */}
        {profileData.socialLinks?.length > 0 && <LinksSection links={profileData.socialLinks} />}

        <div className="flex items-center gap-2">
          {isLoggedInUser ? (
            <Button variant="outline" size="sm" asChild>
              <Link href="/edit-profile">Edit profile</Link>
            </Button>
          ) : (
            ""
          )}
          {user?.email?.includes("hive.one") || user?.email?.includes("bord.id") ? (
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const filename = "data.json";
                  const jsonStr = JSON.stringify(profileData);
                  const element = document.createElement("a");
                  element.setAttribute(
                    "href",
                    "data:text/plain;charset=utf-8," + encodeURIComponent(jsonStr)
                  );
                  element.setAttribute("download", filename);
                  element.style.display = "none";
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}>
                Export profile
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* About */}
        {profileData?.bio ? <RichContentParser content={profileData.bio} /> : ""}
      </div>
      {/* Gray section */}
      <div className="relative flex w-full flex-col items-center bg-gray-200 pb-[88px] pt-14">
        <div className="relative z-10 mx-[5%] flex w-[90%] max-w-2xl flex-col gap-16 md:w-full">
          {/* Facts */}
          {profileData?.facts?.length > 0 && (
            <Section title="Facts">
              <div id="facts" className="grid gap-5 sm:grid-cols-2">
                {profileData?.facts.map(({ id, title, description, url }, index) => (
                  <FactItem key={index} {...{ id, title, description, url }} />
                ))}
              </div>
            </Section>
          )}
          {/* Advise on */}
          {profileData?.adviceOn?.length ? (
            <Section title="Advise On">
              <div id="advice" className="flex flex-wrap gap-2">
                {profileData?.adviceOn?.map((title) => (
                  <Tooltip
                    show={title?.length > 50}
                    text={<div className="w-[400px] break-all">{title}</div>}
                    key={title}>
                    <div className="flex flex-col whitespace-nowrap rounded-lg border border-solid border-gray-300 bg-gray-50 px-[15px] py-[7px] text-lg leading-[24px] text-gray-600">
                      {title?.slice(0, 50)}
                      {title?.length > 50 ? "..." : ""}
                    </div>
                  </Tooltip>
                ))}
              </div>
            </Section>
          ) : (
            ""
          )}
        </div>
        <div className="absolute top-0 flex h-full w-full items-center justify-center overflow-hidden">
          <CirclesBackground className="absolute" />
        </div>
      </div>
      {/* Details */}
      <div className="mx-[5%] mb-40 flex w-[90%] max-w-2xl flex-col gap-28 pt-28 md:w-full">
        {profileData?.projects?.length ? (
          <Section id="projects" title="Selected Projects" tileLayout>
            {profileData?.projects?.map((project, index) => (
              <ProjectItem key={index} {...project} />
            ))}
          </Section>
        ) : (
          ""
        )}
        {profileData?.books?.length ? (
          <Section title="Books">
            <div
              id="books"
              className="grid w-full grid-cols-2 flex-row flex-wrap justify-between gap-16 max-[480px]:gap-8 sm:grid-cols-[repeat(3,_160px)] sm:gap-8">
              {profileData?.books?.map((book, index) => (
                <BookItem key={index} book={book} />
              ))}
            </div>
          </Section>
        ) : (
          ""
        )}
        {profileData?.podcasts?.length && (
          <Section title="Podcasts">
            <div id="podcasts">
              <PodcastItem podcast={profileData?.podcasts} />
            </div>
          </Section>
        )}
        {profileData?.mediaAppearances && profileData?.mediaAppearances?.length > 0 && (
          <Section title="Podcasts (appearances)">
            <div id="podcasts-appearances">
              <ul className="space-y-3">
                {profileData.mediaAppearances.map((appearance, index) => (
                  <li key={index}>
                    <a href={appearance.url} target="_blank" rel="noopener noreferrer">
                      {appearance.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )}
        {profileData?.videos?.length ? (
          <Section title="Videos">
            <div
              id="videos"
              className="grid grid-cols-1 gap-x-5 gap-y-7 min-[430px]:grid-cols-2 md:grid-cols-3 ">
              {profileData?.videos?.map((video, index) => (
                <VideoItem key={index} video={video} />
              ))}
            </div>
          </Section>
        ) : (
          ""
        )}
        {profileData?.workExperiences?.length ? (
          <Section id="experience" title="Experience">
            {profileData?.workExperiences?.map((experience, index) => (
              <ExperienceItem
                key={index}
                experience={experience}
                trail={index === profileData?.workExperiences?.length - 1 ? false : true}
              />
            ))}
          </Section>
        ) : (
          ""
        )}
        {profileData?.publications?.length > 0 && (
          <Section id="publications" title="Selected Publications">
            {profileData?.publications?.map((publication, index) => (
              <Publication key={index} {...publication} />
            ))}
          </Section>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getServerSession({ req, res });
  const usernameList = getUsernameList(context.query.user);

  const user = await prisma.user.findFirst({
    where: {
      username: usernameList[0],
    },
    include: {
      publications: true,
      projects: true,
      podcasts: true,
      videos: true,
      workExperiences: {
        include: {
          company: true,
        },
      },
      books: true,
      socialLinks: true,
      facts: true,
      mediaAppearances: true,
    },
  });

  const userEvents = await prisma.eventType.findMany({
    where: {
      AND: [
        {
          teamId: null,
        },
        {
          OR: [
            {
              userId: user?.id,
            },
            {
              users: {
                some: {
                  id: user?.id,
                },
              },
            },
          ],
        },
      ],
    },
  });

  if (!user) {
    throw new Error("User from session not found");
  }

  return {
    props: {
      user: JSON.stringify(user),
      userEvents: JSON.stringify(userEvents ?? []),
      userSession: session ? JSON.stringify(session) : null,
    },
  };
};

ProfilePage.PageWrapper = PageWrapper;

export default ProfilePage;
