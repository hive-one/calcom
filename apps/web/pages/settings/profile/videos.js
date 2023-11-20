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

const VideosSettings = () => {
  const { t } = useLocale();

  const { data: user, isLoading } = trpc.viewer.me.useQuery();
  if (isLoading) return <SkeletonLoader title={t("general")} description={t("general_description")} />;
  if (!user) {
    throw new Error(t("something_went_wrong"));
  }
  return <GeneralView user={user} localeProp={user.locale} />;
};

const GeneralView = ({ user }) => {
  const [data, setData] = useState(user?.videos || []);
  const addVideoMutation = trpc.viewer.addVideo.useMutation();
  const updateVideoMutation = trpc.viewer.updateVideo.useMutation();
  const removeVideoMutation = trpc.viewer.removeVideo.useMutation();

  useEffect(() => {
    setData(user?.videos);
  }, [user?.videos]);

  const onSave = (e) => {
    e.preventDefault();
    data?.map((vid) => {
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
    showToast("Changes saved", "success");
  };

  const addVideo = () => {
    const newVideo = {
      title: "",
      url: "",
      description: "",
    };
    setData((prev) => (prev?.length ? [...prev, newVideo] : [newVideo]));
  };

  const removeVideo = ({ index, id }) => {
    if (id) {
      removeVideoMutation.mutate({ id });
    }
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={onSave}>
      <Meta title="Videos" description="Add your most popular and interesting videos" />
      {!data || (data?.length === 0 && <EmptyState label="Add your most popular and interesting videos" />)}
      <div className="space-y-4 divide-y">
        {data?.length > 0 &&
          data?.map((video, i) => (
            <div key={i} className="relative space-y-4 pt-4">
              <div className="col-span-full">
                <Label>Title</Label>
                <Input
                  required
                  value={video.title}
                  placeholder="Enter video title"
                  onChange={(e) => {
                    const newVideo = data?.length ? [...data] : [];
                    newVideo[i].title = e.target.value;
                    setData(newVideo);
                  }}
                />
              </div>
              <div className="col-span-2">
                <Label>URL</Label>
                <Input
                  required
                  value={video.url}
                  placeholder="e.g https://youtube.com/watch?v=1234"
                  onChange={(e) => {
                    const newVideo = data?.length ? [...data] : [];
                    newVideo[i].url = e.target.value;
                    setData(newVideo);
                  }}
                />
              </div>
              <div className="sm:col-span-3">
                <Label>Description</Label>
                <TextArea
                  value={video.description}
                  onChange={(e) => {
                    const newVideo = data?.length ? [...data] : [];
                    newVideo[i].description = e.target.value;
                    setData(newVideo);
                  }}
                />
              </div>
              <div className="col-span-full flex items-center justify-end">
                <Button type="button" variant="icon" onClick={() => removeVideo({ index: i, id: video.id })}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        <div className="pb-2">
          <Button onClick={addVideo} color="secondary" type="button" className="mb-3 mt-2">
            Add video
          </Button>
        </div>
      </div>

      <Button color="primary" type="submit" className="mt-8">
        Save Changes
      </Button>
    </form>
  );
};

VideosSettings.getLayout = getLayout;
VideosSettings.PageWrapper = PageWrapper;

export default VideosSettings;
