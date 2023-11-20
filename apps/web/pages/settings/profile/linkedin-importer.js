import {
  isValidLinkedInUrl,
  extractUserNameFromLinkedinUrl,
  linkedinExperienceTransformer,
  linkedinProjectsTransformer,
  linkedinPublicationsTransformer,
} from "@ui/utilities/utils";
import { useState } from "react";

import { getLayout } from "@calcom/features/settings/layouts/SettingsLayout";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { trpc } from "@calcom/trpc/react";
import {
  Button,
  Label,
  Meta,
  showToast,
  SkeletonButton,
  SkeletonContainer,
  SkeletonText,
  Input,
} from "@calcom/ui";

import PageWrapper from "@components/PageWrapper";

const SkeletonLoader = ({ title, description }) => {
  return (
    <SkeletonContainer>
      <Meta title={title} description={description} />
      <div className="mb-8 mt-6 space-y-6">
        <SkeletonText className="h-8 w-full" />
        <SkeletonText className="h-8 w-full" />
        <SkeletonText className="h-8 w-full" />
        <SkeletonText className="h-8 w-full" />

        <SkeletonButton className="mr-6 h-8 w-20 rounded-md p-5" />
      </div>
    </SkeletonContainer>
  );
};

const LinkedinImporter = () => {
  const { t } = useLocale();

  const { data: user, isLoading } = trpc.viewer.me.useQuery();
  if (isLoading) return <SkeletonLoader title={t("general")} description={t("general_description")} />;
  if (!user) {
    throw new Error(t("something_went_wrong"));
  }
  return <GeneralView user={user} localeProp={user.locale} />;
};

const GeneralView = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [linkedinData, setLinkedinData] = useState(null);
  const [data, setData] = useState();
  const mutation = trpc.viewer.updateProfile.useMutation();

  const handleSubmit = async (url, setLoading, setLinkedinData) => {
    try {
      setLoading(true);
      if (!isValidLinkedInUrl(url)) return;
      const username = extractUserNameFromLinkedinUrl(url);
      if (!username) return;
      const response = await fetch(`/api/borg/getLinkedin?user=${username}`);
      const data = await response.json();
      console.log("data", data);
      setLinkedinData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      showToast("Something went wrong 😕");
    }
  };

  async function startAutoFill() {
    const newProfile = {
      name: linkedinData.name,
      bio: linkedinData.description,
      workExperiences: linkedinData.roles
        ? linkedinExperienceTransformer(linkedinData.roles)?.workExperiences
        : [],
      experience: linkedinData.roles
        ? linkedinExperienceTransformer({ roles: linkedinData.roles, existingExp: user?.workExperiences })
            ?.experience
        : [],
      projects: linkedinData.projects ? linkedinProjectsTransformer(linkedinData.projects) : [],
      publications: linkedinData.publications
        ? linkedinPublicationsTransformer(linkedinData.publications)
        : [],
    };
    console.log(newProfile);
    setData((prev) => ({ ...prev, ...newProfile }));
    mutation.mutate({ ...data, ...newProfile });
    showToast("Profile filled successfully, dont forget to save it");
  }
  return (
    <>
      <Meta
        title="Linkedin Importer"
        description="Have our robots fill your profile in seconds will the relevant information."
      />
      <div>
        <Label>Linkedin URL</Label>
        <Input value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
        <div className="mt-4">
          <Button
            variant="primary"
            type="button"
            size="sm"
            disabled={!isValidLinkedInUrl(linkedinUrl)}
            className={!isValidLinkedInUrl(linkedinUrl) && "cursor-not-allowed opacity-50"}
            loading={loading}
            onClick={() => handleSubmit(linkedinUrl, setLoading, setLinkedinData)}>
            Fetch profile
          </Button>
        </div>
        <br />
        <hr />
        {linkedinData && linkedinData?.name && (
          <div className="mt-4">
            <p className="mb-4 font-mono text-sm">
              ✅ LinkedIn profile data available, click the button below to prefill the form.
            </p>
            <Button type="button" variant="primary" onClick={startAutoFill}>
              Add LinkedIn Data to Profile
            </Button>
          </div>
        )}

        {linkedinData && !linkedinData?.name && (
          <div className="mt-4">
            <p className="mb-4 font-mono text-sm">
              😕 Looks like we have no data for this profile, please fill the form manually. We&apos;ve raised
              a request to our robots to start fetching the data, please check back in a few minutes
            </p>
          </div>
        )}

        <Button color="primary" onClick={handleSubmit} className="mt-8">
          Save Changes
        </Button>
      </div>
    </>
  );
};

LinkedinImporter.getLayout = getLayout;
LinkedinImporter.PageWrapper = PageWrapper;

export default LinkedinImporter;
