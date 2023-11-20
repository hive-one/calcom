import { useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";

import { getLayout } from "@calcom/features/settings/layouts/SettingsLayout";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { trpc } from "@calcom/trpc/react";
import {
  Button,
  Label,
  Meta,
  TextArea,
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

const PublicationsSettings = () => {
  const { t } = useLocale();

  const { data: user, isLoading } = trpc.viewer.me.useQuery();
  if (isLoading) return <SkeletonLoader title={t("general")} description={t("general_description")} />;
  if (!user) {
    throw new Error(t("something_went_wrong"));
  }
  return <GeneralView user={user} localeProp={user.locale} />;
};

const GeneralView = ({ user }) => {
  const [data, setData] = useState(user?.publications || []);
  const addPublicationMutation = trpc.viewer.addPublication.useMutation();
  const updatePublicationMutation = trpc.viewer.updatePublication.useMutation();
  const removePublicationMutation = trpc.viewer.removePublication.useMutation();

  useEffect(() => {
    setData(user?.publications);
  }, [user?.publications]);

  const onSave = (e) => {
    e.preventDefault();
    data?.map((pub) => {
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

    showToast("Changes saved", "success");
  };

  const removePublication = ({ index, id }) => {
    if (id) {
      removePublicationMutation.mutate({ id });
    }
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  const addPublication = () => {
    const newPublication = {
      title: "",
      url: "",
      description: "",
    };
    setData((prev) => [...prev, newPublication]);
  };

  return (
    <form onSubmit={onSave}>
      <Meta
        title="Publications"
        description="Ever published something, a paper or a blog post? Add it here."
      />
      {!data ||
        (data?.length === 0 && (
          <EmptyState label="Ever published something, a paper or a blog post? Add it here." />
        ))}
      <div className="space-y-4 divide-y">
        {data?.length > 0 &&
          data?.map((publication, i) => (
            <div key={i} className="space-y-4 pt-2">
              <div className="sm:col-span-3">
                <Label>Title</Label>
                <Input
                  placeholder="e.g How to build strong teams"
                  required
                  value={publication.title}
                  onChange={(e) => {
                    const newPublicationss = [...data];
                    newPublicationss[i].title = e.target.value;
                    setData(newPublicationss);
                  }}
                />
              </div>
              <div className="sm:col-span-3">
                <Label>URL</Label>
                <Input
                  label="URL"
                  type="url"
                  placeholder="https://yoursite.com/blog/build-teams"
                  required
                  value={publication.url}
                  onChange={(e) => {
                    const newPublicationss = [...data];
                    newPublicationss[i].url = e.target.value;
                    setData(newPublicationss);
                  }}
                />
              </div>
              <div className="col-span-full">
                <Label>Description</Label>
                <TextArea
                  value={publication.description}
                  onChange={(e) => {
                    const newPublicationss = [...data];
                    newPublicationss[i].description = e.target.value;
                    setData(newPublicationss);
                  }}
                />
              </div>
              <div className="col-span-full flex items-center justify-end">
                <Button
                  type="button"
                  variant="icon"
                  onClick={() => removePublication({ index: i, id: publication.id })}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        <div className="pb-2">
          <Button onClick={addPublication} color="secondary" type="button" className="mb-3 mt-2">
            Add publication
          </Button>
        </div>
      </div>

      <Button color="primary" type="submit" className="mt-8">
        Save Changes
      </Button>
    </form>
  );
};

PublicationsSettings.getLayout = getLayout;
PublicationsSettings.PageWrapper = PageWrapper;

export default PublicationsSettings;
