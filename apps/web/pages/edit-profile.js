import { Button } from "@shadcdn/ui/button";
import Spinner from "@ui/spinner";
import clsx from "clsx";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { Linkedin } from "react-bootstrap-icons";
import toast from "react-hot-toast";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { trpc } from "@calcom/trpc/react";

import { logOut } from "@lib/firebase/utils";

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

const EditProfile = () => {
  const [user] = trpc.viewer.me.useSuspenseQuery();
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState();
  const [formLoading, setFormLoading] = useState(false);
  const [profile, setProfile] = useState(user);
  const avatarRef = useRef(null);
  const [activeSetting, setActiveSetting] = useState("profile");
  const [avatarFile, setAvatarFile] = useState(null);

  const utils = trpc.useContext();
  const onSuccess = async () => {
    toast.success("Profile updated successfully 🎉");
    await utils.viewer.me.invalidate();
  };

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
  const addCompanyMutation = trpc.viewer.addCompany.useMutation();

  const addPublicationMutation = trpc.viewer.addPublication.useMutation();
  const updatePublicationMutation = trpc.viewer.updatePublication.useMutation();
  const removePublicationMutation = trpc.viewer.removePublication.useMutation();

  const addBookMutation = trpc.viewer.addBook.useMutation();
  const removeBookMutation = trpc.viewer.removeBook.useMutation();

  const addPodcastMutation = trpc.viewer.addPodcast.useMutation();
  const addVideoMutation = trpc.viewer.addVideo.useMutation();
  const updateVideoMutation = trpc.viewer.updateVideo.useMutation();
  const removeVideoMutation = trpc.viewer.removeVideo.useMutation();

  const addMediaAppearenceMutation = trpc.viewer.addMediaAppearence.useMutation();
  const updateMediaAppearenceMutation = trpc.viewer.updateMediaAppearence.useMutation();
  const removeMediaAppearenceMutation = trpc.viewer.removeMediaAppearence.useMutation();

  useEffect(() => {
    setProfile(user);
  }, [user]);

  async function updateAvatar(event) {
    event.preventDefault();
    const enteredAvatar = avatarRef.current?.value;
    mutation.mutate({
      avatar: enteredAvatar,
    });
    toast.success("Avatar updated successfully 🎉");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    delete profile.avatar;
    console.log({ profile });
    mutation.mutate(profile);

    profile?.socialLinks.map((socialLink) => {
      let now = new Date();
      let socialLinkData = {
        ...socialLink,
        userId: user?.id,
        updatedAt: now,
      };

      if (socialLink?.id) {
        updateSocialLinkMutation.mutate(socialLinkData);
      } else {
        addSocialLinkMutation.mutate(socialLinkData);
      }
    });

    profile?.facts.map((fact) => {
      let now = new Date();
      let factsData = {
        ...fact,
        userId: user?.id,
        updatedAt: now,
      };

      if (fact?.id) {
        updateFactMutation.mutate(factsData);
      } else {
        addFactMutation.mutate(factsData);
      }
    });

    toast.success(`Update profile successfully`);

    profile?.projects.map((project) => {
      let now = new Date();
      let projectData = {
        ...project,
        updatedAt: now,
      };

      if (project?.id) {
        updateProjectMutation.mutate(projectData);
      } else {
        addProjectMutation.mutate(projectData);
      }
    });

    profile?.videos.map((vid) => {
      let vidData = {
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

    profile?.workExperiences.map((exp) => {
      let companyData = {
        name: exp.company,
        url: exp.url,
        linkedInId: "",
      };
      const addCompanyRes = addCompanyMutation.mutate(companyData);

      if (exp?.roles?.length) {
        exp?.roles.map((role) => {
          const addWorkExpRes = addWorkExpMutation.mutate({
            title: role.title,
            startDay: parseInt(role.startDay),
            startMonth: parseInt(role.startMonth),
            startYear: parseInt(role.startYear),
            endDay: parseInt(role.endDay),
            endMonth: parseInt(role.endMonth),
            endYear: parseInt(role.endYear),
            description: role.description,
            updatedAt: new Date(),
            companyId: addCompanyRes?.data?.id,
            userId: user?.id,
          });
        });
      }
      let expData = {
        ...exp,
        userId: user?.id,
      };

      if (exp?.id) {
        // updateFactMutation.mutate(factsData);
      } else {
        addWorkExpMutation.mutate(expData);
      }
    });

    profile?.publications.map((pub) => {
      let pubData = {
        ...pub,
        updatedAt: new Date(),
      };

      if (pub?.id) {
        updatePublicationMutation.mutate(pubData);
      } else {
        addPublicationMutation.mutate(pubData);
      }
    });

    profile?.books.map((book) => {
      let bookData = {
        ...book,
        updatedAt: new Date(),
      };

      if (book?.createdAt) {
        removeBookMutation.mutate({ isbn: book.isbn });
        addBookMutation.mutate(bookData);
      } else {
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
      };
      if (app?.id) {
        updateMediaAppearenceMutation.mutate(appData);
      } else {
        addMediaAppearenceMutation.mutate(appData);
      }
    });

    // try {
    //   setFormLoading(true);
    //   event.preventDefault();
    //   const docData = avatarFile ? { ...profile, avatar_url: await uploadPhoto(avatarFile) } : profile;
    //   await addProfile(docData);
    //   toast.success("Profile updated successfully 🎉");
    // } catch (error) {
    //   toast.error("Something went wrong 😕");
    // } finally {
    //   setFormLoading(false);
    // }
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
          startDay: "",
          startMonth: "",
          startYear: "",
          endDay: "",
          endMonth: "",
          endYear: "",
        },
      ],
    };
    setProfile((prevProfile) => ({
      ...prevProfile,
      workExperiences: [...prevProfile.workExperiences, newExperience],
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
      converImage: "",
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
      podcasts: {
        title: "",
        url: "",
        cover_image: "",
        episodes: [
          {
            title: "",
            url: "",
          },
        ],
      },
    });
  };

  const deletePodcast = () => {
    setProfile({
      ...profile,
      podcasts: null,
    });
  };

  const addPodcastEpisode = () => {
    setProfile({
      ...profile,
      podcasts: {
        ...profile.podcasts,
        episodes: [
          ...profile.podcasts.episodes,
          {
            title: "",
            url: "",
          },
        ],
      },
    });
  };

  const removePodcastEpisode = (index) => {
    const newEpisodes = [...profile.podcasts.episodes];
    newEpisodes.splice(index, 1);
    setProfile({
      ...profile,
      podcasts: {
        ...profile.podcasts,
        episodes: newEpisodes,
      },
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

  const removeExperience = (index) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      workExperiences: prevProfile.workExperiences.filter((_, i) => i !== index),
    }));
  };

  const removeExperienceRole = (experienceIndex, roleIndex) => {
    setProfile((prevProfile) => {
      const newExperience = [...prevProfile.experience];
      newExperience[experienceIndex].roles = newExperience[experienceIndex].roles.filter(
        (_, i) => i !== roleIndex
      );
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

  // const hasBasicDetails = (profile) => {
  //   const hasName = profile.name || profile?.name?.length;
  //   const hasBio = profile?.bio?.content?.length && profile?.bio?.content[0]?.content?.length;
  //   console.info({ hasName, hasBio });
  //   return hasName && hasBio;
  // };

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
            setAvatarFile={setAvatarFile}
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
      label: "Advise",
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
      label: "Podcast Appearences",
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
      <NextSeo title="Profile Settings - Borg.id" />
      <Navbar uid={user?.uid} logOut={logOut} email={user?.email} />
      {isLoading ? (
        <div className="flex min-h-screen items-center justify-center">
          <Spinner label="Loading profile..." />
        </div>
      ) : (
        <div className="my-5 md:my-20">
          <Container width="960px" className="">
            <div className="grid items-start md:grid-cols-[200px_1fr] md:gap-12">
              <div className="flex h-[calc(100vh-200px)] max-w-full flex-row flex-nowrap gap-2 overflow-scroll whitespace-nowrap md:sticky md:top-[100px] md:flex-col md:gap-1 md:whitespace-normal">
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
  });

  if (!user) {
    throw new Error("User from session not found");
  }

  return {
    props: {
      trpcState: ssr.dehydrate(),
      user: JSON.stringify(user),
    },
  };
};

EditProfile.PageWrapper = PageWrapper;

export default EditProfile;
