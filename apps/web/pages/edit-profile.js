import { Button } from "@shadcdn/ui/button";
import Spinner from "@ui/spinner";
import clsx from "clsx";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Linkedin } from "react-bootstrap-icons";
import { Toaster } from "react-hot-toast";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import prisma from "@calcom/prisma";
import { trpc } from "@calcom/trpc/react";
import { showToast } from "@calcom/ui";

import PageWrapper from "@components/PageWrapper";
import AdviceSection from "@components/edit-profile/Account/AdviceSection";
import BooksSection from "@components/edit-profile/Account/BooksSection";
import ExperienceSection from "@components/edit-profile/Account/Experience";
import FactsSection from "@components/edit-profile/Account/FactsSection";
import LinkedinImporter from "@components/edit-profile/Account/LinkedinImporter";
import Links from "@components/edit-profile/Account/Links";
import Navbar from "@components/edit-profile/Account/Navbar";
import PodcastAppearancesSection from "@components/edit-profile/Account/PodcastAppearancesSection";
import PodcastsSection from "@components/edit-profile/Account/PodcastsSection";
import ProfileSection from "@components/edit-profile/Account/ProfileSection";
import ProjectsSection from "@components/edit-profile/Account/ProjectsSection";
import PublicationsSection from "@components/edit-profile/Account/PublicationsSection";
import VideosSection from "@components/edit-profile/Account/VideosSection";

import { ssrInit } from "@server/lib/ssr";

import { Container } from "../ui";

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const EditProfile = () => {
  const [user] = trpc.viewer.me.useSuspenseQuery();
  const [isLoading, setIsLoading] = useState();
  const [formLoading, setFormLoading] = useState(false);
  const [profile, setProfile] = useState(user);
  const avatarRef = useRef(null);
  const [activeSetting, setActiveSetting] = useState("profile");
  // console.log({ user, profile });
  // console.log({ workExp: profile?.workExperiences, exp: profile?.experience });

  const utils = trpc.useContext();
  const onSuccess = async () => {
    await utils.viewer.me.invalidate();
  };

  const transformExpForUI = (a) => {
    return Object.entries(groupBy(a?.workExperiences, "companyId")).map(([id, exp]) => {
      if (exp?.length > 1) {
        return {
          companyId: parseInt(id),
          name: exp[0]?.company.name,
          url: exp[0]?.company.url,
          description: exp[0]?.company.description ?? "",
          roles: exp?.map((role) => {
            return {
              description: role.description ?? "",
              endDay: role.endDay,
              endMonth: role.endMonth,
              endYear: role.endYear,
              startDay: role.startDay,
              startMonth: role.startMonth,
              startYear: role.startYear,
              title: role.title,
              id: role.id ?? null,
              isCurrentRole: role.isCurrentRole,
            };
          }),
        };
      }

      return {
        companyId: parseInt(id),
        name: exp[0]?.company.name,
        url: exp[0]?.company.url,
        description: exp[0]?.company.description ?? "",
        roles: [
          {
            description: exp[0].description ?? "",
            endDay: exp[0].endDay,
            endMonth: exp[0].endMonth,
            endYear: exp[0].endYear,
            startDay: exp[0].startDay,
            startMonth: exp[0].startMonth,
            startYear: exp[0].startYear,
            title: exp[0].title,
            id: exp[0].id ?? null,
            isCurrentRole: exp[0].isCurrentRole,
          },
        ],
      };
    });
  };

  useEffect(() => {
    setProfile((prev) => ({ ...prev, experience: transformExpForUI(user) }));
  }, [user]);

  const mutation = trpc.viewer.updateProfile.useMutation({
    onSuccess: onSuccess,
  });
  const addSocialLinkMutation = trpc.viewer.addSocialLink.useMutation();
  const updateSocialLinkMutation = trpc.viewer.updateSocialLink.useMutation();

  const addFactMutation = trpc.viewer.addFact.useMutation();
  const updateFactMutation = trpc.viewer.updateFact.useMutation();
  const removeFactMutation = trpc.viewer.removeFact.useMutation();
  const addProjectMutation = trpc.viewer.addProject.useMutation();
  const updateProjectMutation = trpc.viewer.updateProject.useMutation();
  const removeProjectMutation = trpc.viewer.removeProject.useMutation();

  const addWorkExpMutation = trpc.viewer.addWorkExperience.useMutation();
  const updateWorkExpMutation = trpc.viewer.updateWorkExperience.useMutation();
  const removeWorkExpMutation = trpc.viewer.removeWorkExperience.useMutation();

  const addPublicationMutation = trpc.viewer.addPublication.useMutation();
  const updatePublicationMutation = trpc.viewer.updatePublication.useMutation();
  const removePublicationMutation = trpc.viewer.removePublication.useMutation();

  const addBookMutation = trpc.viewer.addBook.useMutation();
  const removeBookMutation = trpc.viewer.removeBook.useMutation();

  const addPodcastMutation = trpc.viewer.addPodcast.useMutation();
  const updatePodcastMutation = trpc.viewer.updatePodcast.useMutation();
  const removePodcastMutation = trpc.viewer.removePodcast.useMutation();

  // const addPodcastEpMutation = trpc.viewer.addPodcastEp.useMutation();
  // const removePodcastEpMutation = trpc.viewer.removePodcastEp.useMutation();

  const addVideoMutation = trpc.viewer.addVideo.useMutation();
  const updateVideoMutation = trpc.viewer.updateVideo.useMutation();
  const removeVideoMutation = trpc.viewer.removeVideo.useMutation();

  const addMediaAppearenceMutation = trpc.viewer.addMediaAppearance.useMutation();
  const updateMediaAppearenceMutation = trpc.viewer.updateMediaAppearance.useMutation();
  const removeMediaAppearenceMutation = trpc.viewer.removeMediaAppearance.useMutation();

  async function updateAvatar(event) {
    event.preventDefault();
    const enteredAvatar = avatarRef.current?.value;
    mutation.mutate({
      avatar: enteredAvatar,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    delete profile.avatar;
    console.log({ profile });
    showToast("Changes saved", "success");
    mutation.mutate(profile);

    profile?.socialLinks?.map((socialLink) => {
      const now = new Date();
      const socialLinkData = {
        ...socialLink,
        userId: user?.id,
        updatedAt: now,
      };

      if (socialLink?.id) {
        updateSocialLinkMutation.mutate(socialLinkData);
      } else if (socialLink?.url) {
        addSocialLinkMutation.mutate(socialLinkData);
      }
    });

    profile?.facts?.map((fact) => {
      const now = new Date();
      const factsData = {
        ...fact,
        userId: user?.id,
        updatedAt: now,
      };

      if (fact?.id) {
        updateFactMutation.mutate(factsData);
      } else if (fact?.title) {
        addFactMutation.mutate(factsData);
      }
    });

    profile?.projects?.map((project) => {
      const now = new Date();
      const projectData = {
        ...project,
        updatedAt: now,
      };

      if (project?.id) {
        updateProjectMutation.mutate(projectData);
      } else if (project?.title) {
        addProjectMutation.mutate(projectData);
      }
    });

    profile?.videos?.map((vid) => {
      const vidData = {
        ...vid,
        userId: user?.id,
        updatedAt: new Date(),
      };

      if (vid?.id) {
        updateVideoMutation.mutate(vidData);
      } else {
        addVideoMutation.mutate(vidData);
      }
    });

    profile?.publications?.map((pub) => {
      const pubData = {
        ...pub,
        updatedAt: new Date(),
      };

      if (pub?.id) {
        updatePublicationMutation.mutate(pubData);
      } else if (pub?.title) {
        addPublicationMutation.mutate(pubData);
      }
    });

    profile?.books?.map((book) => {
      const bookData = {
        ...book,
        updatedAt: new Date(),
      };

      if (book?.createdAt) {
        removeBookMutation.mutate({ isbn: book.isbn });
        addBookMutation.mutate(bookData);
      } else if (book?.isbn) {
        addBookMutation.mutate(bookData);
      }
    });

    profile?.mediaAppearances?.map((app) => {
      const appData = {
        ...app,
        description: "",
        mediaType: "",
        podcastId: null,
        videoId: null,
        podcastId: null,
        updatedAt: new Date(),
      };
      if (app?.id) {
        updateMediaAppearenceMutation.mutate(appData);
      } else if (app?.title) {
        addMediaAppearenceMutation.mutate(appData);
      }
    });

    profile?.podcasts?.map((pod) => {
      const podData = {
        ...pod,
      };

      delete podData.episodes;

      if (podData?.id) {
        updatePodcastMutation.mutate({ ...podData, id: podData.id });
      } else if (pod?.title) {
        addPodcastMutation.mutate(podData);
      }
    });

    Object.entries(profile?.experience)?.map(([id, exp]) => {
      if (exp?.roles?.length) {
        exp.roles.map((role) => {
          if (role?.id) {
            const updateWorkExData = {
              ...role,
              startYear: role?.startYear ? parseInt(role?.startYear) : null,
              endYear: role?.endYear ? parseInt(role?.endYear) : null,
              id: role?.id,
              userId: user?.id,
              companyId: exp?.companyId,
            };

            console.log({ updateWorkExData });
            updateWorkExpMutation.mutate(updateWorkExData);
          } else {
            const addWorkExData = {
              company: {
                name: exp?.name,
                url: exp.url,
                description: exp.description ?? "",
              },
              workExperience: {
                ...role,
                startYear: role?.startYear ? parseInt(role?.startYear) : null,
                endYear: role?.endYear ? parseInt(role?.endYear) : null,
              },
            };
            console.log({ addWorkExData });
            addWorkExpMutation.mutate(addWorkExData);
          }
        });
      }
    });
  };

  const addAdviceItem = () => {
    const newAdviceItem = "";
    setProfile((prevProfile) => ({
      ...prevProfile,
      adviceOn: [...prevProfile.adviceOn, newAdviceItem],
    }));
  };

  const removeAdviceItem = (index) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      adviceOn: prevProfile.adviceOn.filter((_, i) => i !== index),
    }));
  };

  const addProject = () => {
    const newProject = {
      title: "",
      url: "",
      description: "",
    };
    setProfile((prevProfile) => ({
      ...prevProfile,
      projects: [...prevProfile.projects, newProject],
    }));
  };

  const addExperience = () => {
    const newExperience = {
      company: "",
      url: "",
      roles: [
        {
          title: "",
          description: "",
          start_date: "",
          end_date: "",
        },
      ],
    };
    setProfile((prevProfile) => ({
      ...prevProfile,
      experience: prevProfile?.experience?.length
        ? [...prevProfile.experience, newExperience]
        : [newExperience],
    }));
  };

  const addExperienceRole = ({ expIndex }) => {
    const newExp = [...profile.workExperiences];
    newExp[expIndex].roles = [
      ...newExp[expIndex].roles,
      {
        description: "",
        startDay: "",
        startMonth: "",
        startYear: "",
        endDay: "",
        endMonth: "",
        endYear: "",
      },
    ];
    setProfile((prevProfile) => ({
      ...prevProfile,
      workExperiences: newExp,
    }));
  };

  const addPodcastAppearance = () => {
    const newAppearance = {
      title: "",
      url: "",
      description: "",
    };
    setProfile((prevProfile) => ({
      ...prevProfile,
      mediaAppearances: [...prevProfile.mediaAppearances, newAppearance],
    }));
  };

  const addBook = () => {
    const newBook = {
      isbn: "",
      title: "",
      url: "",
      description: "",
      coverImage: "",
      updatedAt: new Date(),
    };
    setProfile((prevProfile) => ({
      ...prevProfile,
      books: prevProfile?.books?.length ? [...prevProfile.books, newBook] : [newBook],
    }));
  };

  const addVideo = () => {
    const newVideo = {
      title: "",
      url: "",
      description: "",
    };
    setProfile((prevProfile) => ({
      ...prevProfile,
      videos: prevProfile?.videos?.length ? [...prevProfile.videos, newVideo] : [newVideo],
    }));
  };

  const addFact = () => {
    const newFact = {
      title: "",
      url: "",
      description: "",
    };
    setProfile((prevProfile) => ({
      ...prevProfile,
      facts: [...prevProfile.facts, newFact],
    }));
  };

  const removeFact = ({ index, id }) => {
    removeFactMutation.mutate({ id });
    setProfile((prevProfile) => ({
      ...prevProfile,
      facts: prevProfile.facts.filter((_, i) => i !== index),
    }));
  };

  const addPodcast = () => {
    setProfile({
      ...profile,
      podcasts: [
        {
          title: "",
          url: "",
          coverImage: "",
          // episodes: [
          //   {
          //     title: "",
          //     url: "",
          //     description: "",
          //     coverImage: "",
          //   },
          // ],
        },
      ],
    });
  };

  const deletePodcast = () => {
    removePodcastMutation.mutate({ id: profile?.podcasts[0]?.id });
    setProfile({
      ...profile,
      podcasts: null,
    });
  };

  const addPodcastEpisode = () => {
    const newPods = [...profile.podcasts];
    newPods[0].episodes = newPods[0].episodes?.length
      ? [...newPods[0].episodes, { title: "", url: "", description: "", coverImage: "" }]
      : [{ title: "", url: "", description: "", coverImage: "" }];
    setProfile({
      ...profile,
      podcasts: newPods,
    });
  };

  const removePodcastEpisode = (index) => {
    const newPods = [...profile.podcasts];
    newPods[0].episodes.splice(index, 1);
    setProfile({
      ...profile,
      podcasts: newPods,
    });
  };

  const removePublication = ({ index, id }) => {
    removePublicationMutation.mutate({ id });
    setProfile((prevProfile) => ({
      ...prevProfile,
      publications: prevProfile.publications.filter((_, i) => i !== index),
    }));
  };

  const removeVideo = ({ index, id }) => {
    removeVideoMutation.mutate({ id });
    setProfile((prevProfile) => ({
      ...prevProfile,
      videos: prevProfile.videos.filter((_, i) => i !== index),
    }));
  };

  const removeBook = ({ index, isbn }) => {
    removeBookMutation.mutate({ isbn });
    setProfile((prevProfile) => ({
      ...prevProfile,
      books: prevProfile.books.filter((_, i) => i !== index),
    }));
  };

  const removeProject = ({ index, id }) => {
    removeProjectMutation.mutate({ id });
    setProfile((prevProfile) => ({
      ...prevProfile,
      projects: prevProfile.projects.filter((_, i) => i !== index),
    }));
  };

  const removePodcastAppearance = ({ index, id }) => {
    removeMediaAppearenceMutation.mutate({ id });
    setProfile((prevProfile) => ({
      ...prevProfile,
      mediaAppearances: prevProfile.mediaAppearances.filter((_, i) => i !== index),
    }));
  };

  const removeExperience = ({ index, companyId }) => {
    console.log({ companyId });
    profile?.experience?.map((exp) => {
      if (exp?.companyId === companyId) {
        exp?.roles?.map((role) => {
          removeWorkExpMutation.mutate({ id: role?.id });
        });
      }
    });

    setProfile((prevProfile) => {
      let newExperience = prevProfile.experience;
      newExperience = newExperience.filter((exp) => exp.companyId !== companyId);
      return {
        ...prevProfile,
        experience: newExperience,
      };
    });
  };

  const removeExperienceRole = ({ roleIndex, companyId, expId }) => {
    removeWorkExpMutation.mutate({ id: expId });
    setProfile((prevProfile) => {
      const newExperience = prevProfile.experience;
      newExperience[companyId].roles = newExperience[companyId].roles.filter((_, i) => i !== roleIndex);
      return {
        ...prevProfile,
        experience: newExperience,
      };
    });
  };

  const addPublication = () => {
    const newPublication = {
      title: "",
      url: "",
      description: "",
    };
    setProfile((prevProfile) => ({
      ...prevProfile,
      publications: [...prevProfile.publications, newPublication],
    }));
  };

  const SETTINGS = [
    {
      label: "Profile",
      value: "profile",
      content: (
        <>
          <ProfileSection
            updateAvatar={updateAvatar}
            avatarRef={avatarRef}
            profile={profile}
            setProfile={setProfile}
          />
        </>
      ),
    },
    {
      label: "Links",
      value: "links",
      content: <Links profile={profile} setProfile={setProfile} />,
    },
    {
      label: "Facts",
      value: "facts",
      content: (
        <FactsSection profile={profile} setProfile={setProfile} addFact={addFact} removeFact={removeFact} />
      ),
    },
    {
      label: "Advice",
      value: "advices",
      content: (
        <AdviceSection
          profile={profile}
          setProfile={setProfile}
          addAdviceItem={addAdviceItem}
          removeAdviceItem={removeAdviceItem}
        />
      ),
    },
    {
      label: "Projects",
      value: "projects",
      content: (
        <ProjectsSection
          profile={profile}
          setProfile={setProfile}
          addProject={addProject}
          removeProject={removeProject}
        />
      ),
    },
    {
      label: "Experience",
      value: "experience",
      content: (
        <ExperienceSection
          profile={profile}
          setProfile={setProfile}
          addExperience={addExperience}
          addExperienceRole={addExperienceRole}
          removeExperience={removeExperience}
          removeExperienceRole={removeExperienceRole}
        />
      ),
    },
    {
      label: "Publications",
      value: "publications",
      content: (
        <PublicationsSection
          profile={profile}
          setProfile={setProfile}
          addPublication={addPublication}
          removePublication={removePublication}
        />
      ),
    },
    {
      label: "Podcasts",
      value: "podcasts",
      content: (
        <PodcastsSection
          profile={profile}
          setProfile={setProfile}
          addPodcast={addPodcast}
          deletePodcast={deletePodcast}
          addPodcastEpisode={addPodcastEpisode}
          removePodcastEpisode={removePodcastEpisode}
        />
      ),
    },
    {
      label: "Podcast Appearances",
      value: "podcast-appearances",
      content: (
        <PodcastAppearancesSection
          profile={profile}
          setProfile={setProfile}
          addPodcastAppearance={addPodcastAppearance}
          removePodcastAppearance={removePodcastAppearance}
        />
      ),
    },
    {
      label: "Books Published",
      value: "books-published",
      content: (
        <BooksSection
          user={user}
          profile={profile}
          setProfile={setProfile}
          addBook={addBook}
          removeBook={removeBook}
        />
      ),
    },
    {
      label: "Videos",
      value: "videos",
      content: (
        <VideosSection
          profile={profile}
          setProfile={setProfile}
          addVideo={addVideo}
          removeVideo={removeVideo}
        />
      ),
    },
    {
      label: "Linkedin Importer",
      value: "linkedin-importer",
      content: <LinkedinImporter profile={profile} setProfile={setProfile} />,
      suffix: <Linkedin className="ml-auto h-4 w-4 text-[#0077b5]" />,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div>
        <Toaster position="bottom-right" />
      </div>
      <NextSeo title="Profile Settings - Borg.id" />
      <Navbar username={user?.username} />
      {isLoading ? (
        <div className="flex min-h-screen items-center justify-center">
          <Spinner label="Loading profile..." />
        </div>
      ) : (
        <div className="my-5 md:my-20">
          <Container width="960px" className="">
            <div className="grid items-start md:grid-cols-[200px_1fr] md:gap-12">
              <div className="flex h-[calc(100vh-100px)] max-w-full flex-row flex-nowrap gap-2 overflow-scroll whitespace-nowrap md:sticky md:top-[100px] md:flex-col md:gap-1 md:whitespace-normal">
                {SETTINGS?.map((item) => (
                  <div key={item?.value} className="pb-3 md:w-full md:pb-0">
                    <Button
                      // className="w-full bg-transparent text-black hover:text-white"
                      // variant={activeSetting === item?.value ? "link" : "ghost"}
                      className={clsx(
                        "h-auto w-full justify-start rounded-lg bg-transparent !py-[6px] text-base text-black hover:bg-gray-100 md:text-sm",
                        activeSetting === item?.value &&
                          "bg-black font-semibold text-white hover:!bg-black hover:!text-white"
                      )}
                      onClick={() => setActiveSetting(item?.value)}
                      suffix={item?.suffix}>
                      {item?.label}
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt:pt-0 border-t border-gray-200/60 pt-5 md:min-h-screen md:border-l md:border-t-0 md:pl-10 md:pt-0">
                <form onSubmit={handleSubmit}>
                  {SETTINGS?.filter((item) => item?.value === activeSetting)[0]?.content || ""}
                  <div className="sticky bottom-[20px] right-0 z-40 flex w-full justify-end">
                    <div className="rounded-xl backdrop-blur">
                      <div className="space-y-12" />
                      <div className="flex items-center justify-end gap-x-3 py-4">
                        <Button type="button" variant="outline" asChild="a">
                          <Link href={`/${profile?.username || profile?.uid}`}>View Profile</Link>
                        </Button>
                        <Button
                          className="bg-black text-white"
                          variant="primary"
                          loading={formLoading}
                          type="submit">
                          {formLoading ? "Submitting" : "Save Changes"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Container>
        </div>
      )}
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const { req, res } = context;

  const session = await getServerSession({ req, res });

  if (!session?.user) {
    return { redirect: { permanent: false, destination: "/auth/login" } };
  }

  const ssr = await ssrInit(context);

  await ssr.viewer.me.prefetch();

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
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

  if (!user) {
    throw new Error("User from session not found");
  }

  return {
    props: {
      trpcState: ssr.dehydrate(),
    },
  };
};

EditProfile.PageWrapper = PageWrapper;

export default EditProfile;
