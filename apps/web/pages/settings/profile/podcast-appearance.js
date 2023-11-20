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

const PodcastAppearanceSettings = () => {
  const { t } = useLocale();

  const { data: user, isLoading } = trpc.viewer.me.useQuery();
  if (isLoading) return <SkeletonLoader title={t("general")} description={t("general_description")} />;
  if (!user) {
    throw new Error(t("something_went_wrong"));
  }
  return <GeneralView user={user} localeProp={user.locale} />;
};

const GeneralView = ({ user }) => {
  const [data, setData] = useState(user?.mediaAppearances || []);
  const addMediaAppearenceMutation = trpc.viewer.addMediaAppearance.useMutation();
  const updateMediaAppearenceMutation = trpc.viewer.updateMediaAppearance.useMutation();
  const removeMediaAppearenceMutation = trpc.viewer.removeMediaAppearance.useMutation();

  useEffect(() => {
    setData(user?.mediaAppearances);
  }, [user?.mediaAppearances]);

  const onSave = (e) => {
    e.preventDefault();
    data?.map((app) => {
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

    showToast("Changes saved", "success");
  };

  const addPodcastAppearance = () => {
    const newAppearance = {
      title: "",
      url: "",
      description: "",
    };
    setData((prev) => [...prev, newAppearance]);
  };

  const removePodcastAppearance = ({ index, id }) => {
    if (id) {
      removeMediaAppearenceMutation.mutate({ id });
    }

    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={onSave}>
      <Meta title="Appearances" description="Add links to podcasts where you have appeared" />
      {!data || (data?.length === 0 && <EmptyState label="Add links to podcasts where you have appeared" />)}
      <div className="space-y-4 divide-y">
        {data?.length > 0 &&
          data?.map((appearance, i) => (
            <div key={i} className="space-y-4 pt-4">
              <div className="col-span-full">
                <Label>Title</Label>
                <Input
                  required
                  placeholder="e.g State of the web 2021"
                  value={appearance.title}
                  onChange={(e) => {
                    const newAppearances = [...data];
                    newAppearances[i].title = e.target.value;
                    setData(newAppearances);
                  }}
                />
              </div>
              <div className="sm:col-span-3">
                <Label>URL</Label>
                <Input
                  type="url"
                  placeholder="https://yoursite.com/podcast-appearences"
                  value={appearance.url}
                  onChange={(e) => {
                    const newAppearances = [...data];
                    newAppearances[i].url = e.target.value;
                    setData(newAppearances);
                  }}
                />
              </div>
              <div className="col-span-full flex items-center justify-end">
                <Button
                  type="button"
                  variant="icon"
                  onClick={() => removePodcastAppearance({ index: i, id: appearance.id })}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        <div className="pb-2">
          <Button onClick={addPodcastAppearance} color="secondary" type="button" className="mb-3 mt-2">
            Add appearance
          </Button>
        </div>
      </div>

      <Button color="primary" type="submit" className="mt-8">
        Save Changes
      </Button>
    </form>
  );
};

PodcastAppearanceSettings.getLayout = getLayout;
PodcastAppearanceSettings.PageWrapper = PageWrapper;

export default PodcastAppearanceSettings;
