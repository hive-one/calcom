import { useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";

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
  TextArea,
} from "@calcom/ui";

import PageWrapper from "@components/PageWrapper";
import EmptyState from "@components/edit-profile/Account/EmptyState";

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

const ProjectsSettings = () => {
  const { t } = useLocale();

  const { data: user, isLoading } = trpc.viewer.me.useQuery();
  if (isLoading) return <SkeletonLoader title={t("general")} description={t("general_description")} />;
  if (!user) {
    throw new Error(t("something_went_wrong"));
  }
  return <GeneralView user={user} localeProp={user.locale} />;
};

const GeneralView = ({ user }) => {
  const [data, setData] = useState(user?.projects || []);
  const addProjectMutation = trpc.viewer.addProject.useMutation();
  const updateProjectMutation = trpc.viewer.updateProject.useMutation();
  const removeProjectMutation = trpc.viewer.removeProject.useMutation();

  useEffect(() => {
    setData(user?.projects);
  }, [user?.projects]);

  const onSave = (e) => {
    e.preventDefault();
    data?.map((project) => {
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

    showToast("Changes saved", "success");
  };

  const addProject = () => {
    const newProject = {
      title: "",
      url: "",
      description: "",
    };
    setData((prev) => [...prev, newProject]);
  };

  const removeProject = ({ index, id }) => {
    if (id) {
      removeProjectMutation.mutate({ id });
    }
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={onSave}>
      <Meta title="Projects" description="Add projects you've worked on" />
      {!data || (data?.length === 0 && <EmptyState label="Add projects you've worked on" />)}
      <div className="space-y-4 divide-y">
        {data?.length > 0 &&
          data?.map((project, i) => (
            <div key={i} className="space-y-4 pt-2">
              <div className="sm:col-span-3">
                <Label>Title</Label>
                <Input
                  required
                  placeholder="e.g Social media app for private circles"
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = [...data];
                    newProjects[i].title = e.target.value;
                    setData(newProjects);
                  }}
                />
              </div>
              <div className="sm:col-span-3">
                <Label>URL</Label>
                <Input
                  placeholder="https://yoursite.com/social-app"
                  type="url"
                  value={project.url}
                  onChange={(e) => {
                    const newProjects = [...data];
                    newProjects[i].url = e.target.value;
                    setData(newProjects);
                  }}
                />
              </div>
              <div className="col-span-full">
                <Label>Description</Label>
                <TextArea
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...data];
                    newProjects[i].description = e.target.value;
                    setData(newProjects);
                  }}
                />
              </div>
              <div className="col-span-full flex items-center justify-end">
                <Button type="button" variant="icon" onClick={() => removeProject({ i, id: project.id })}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        <div className="pb-2">
          <Button onClick={addProject} color="secondary" type="button" className="mb-3 mt-2">
            Add project
          </Button>
        </div>
      </div>

      <Button color="primary" type="submit" className="mt-8">
        Save Changes
      </Button>
    </form>
  );
};

ProjectsSettings.getLayout = getLayout;
ProjectsSettings.PageWrapper = PageWrapper;

export default ProjectsSettings;
