import { Button, Input, Label } from "@shadcdn/ui";
import {
  isValidLinkedInUrl,
  extractUserNameFromLinkedinUrl,
  linkedinExperienceTransformer,
  linkedinProjectsTransformer,
  linkedinPublicationsTransformer,
} from "@ui/utilities/utils";
import { useState } from "react";

import { showToast } from "@calcom/ui";

import FormBlock from "./FormBlock";

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

const LinkedinImporter = ({ profile, setProfile }) => {
  const [loading, setLoading] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [linkedinData, setLinkedinData] = useState(null);

  async function startAutoFill() {
    const newProfile = {
      name: linkedinData.name,
      bio: linkedinData.description,
      workExperiences: linkedinData.roles
        ? linkedinExperienceTransformer(linkedinData.roles)?.workExperiences
        : [],
      experience: linkedinData.roles
        ? linkedinExperienceTransformer({ roles: linkedinData.roles, existingExp: profile?.workExperiences })
            ?.experience
        : [],
      projects: linkedinData.projects ? linkedinProjectsTransformer(linkedinData.projects) : [],
      publications: linkedinData.publications
        ? linkedinPublicationsTransformer(linkedinData.publications)
        : [],
    };
    console.log(newProfile);
    setProfile((prev) => ({ ...prev, ...newProfile }));
    showToast("Profile filled successfully, dont forget to save it");
  }

  return (
    <FormBlock
      title="Linkedin Importer"
      description="Have our robots fill your profile in seconds will the relevant information.">
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
      </div>
    </FormBlock>
  );
};

export default LinkedinImporter;
