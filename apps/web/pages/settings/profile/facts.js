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

const FactsSettings = () => {
  const { t } = useLocale();

  const { data: user, isLoading } = trpc.viewer.me.useQuery();
  if (isLoading) return <SkeletonLoader title={t("general")} description={t("general_description")} />;
  if (!user) {
    throw new Error(t("something_went_wrong"));
  }
  return <GeneralView user={user} localeProp={user.locale} />;
};

const GeneralView = ({ user }) => {
  const [data, setData] = useState(user?.facts || []);
  const addFactMutation = trpc.viewer.addFact.useMutation();
  const updateFactMutation = trpc.viewer.updateFact.useMutation();
  const removeFactMutation = trpc.viewer.removeFact.useMutation();

  useEffect(() => {
    setData(user?.facts);
  }, [user?.facts]);

  const onSave = (e) => {
    e.preventDefault();
    data?.map((fact) => {
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

    showToast("Changes saved", "success");
  };

  const removeFact = ({ i: index, id }) => {
    if (id) {
      removeFactMutation.mutate({ id });
    }
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  const addFact = () => {
    const newFact = {
      title: "",
      url: "",
      description: "",
    };
    setData((prev) => [...prev, newFact]);
  };

  return (
    <form onSubmit={onSave}>
      <Meta title="Facts" description="Add facts about yourself" />
      {!data || (data?.length === 0 && <EmptyState label="Add facts about yourself" />)}
      <div className="space-y-4 divide-y">
        {data?.length > 0 &&
          data?.map((fact, i) => (
            <div key={i} className="space-y-4 pt-4">
              <div className="sm:col-span-3">
                <Label>Title</Label>
                <Input
                  placeHolder="e.g Published 500+ tech articles on Medium"
                  required
                  value={fact.title}
                  onChange={(e) => {
                    const newFacts = [...data];
                    newFacts[i].title = e.target.value;
                    setData(newFacts);
                  }}
                />
              </div>
              <div className="sm:col-span-3">
                <Label>URL</Label>
                <Input
                  placeHolder="https://yoursite.com/articles"
                  type="url"
                  value={fact.url}
                  onChange={(e) => {
                    const newFacts = [...data];
                    newFacts[i].url = e.target.value;
                    setData(newFacts);
                  }}
                />
              </div>
              <div className="col-span-full">
                <Label>Description</Label>
                <TextArea
                  label="Description"
                  value={fact.description}
                  onChange={(e) => {
                    const newFacts = [...data];
                    newFacts[i].description = e.target.value;
                    setData(newFacts);
                  }}
                />
              </div>
              <div className="col-span-full flex items-center justify-end">
                <Button type="button" variant="icon">
                  <X className="h-5 w-5" onClick={() => removeFact({ index: i, id: fact.id })} />
                </Button>
              </div>
            </div>
          ))}
        <div className="pb-2">
          <Button onClick={addFact} color="secondary" type="button" className="mb-3 mt-2">
            Add fact
          </Button>
        </div>
      </div>

      <Button color="primary" type="submit" className="mt-8">
        Save Changes
      </Button>
    </form>
  );
};

FactsSettings.getLayout = getLayout;
FactsSettings.PageWrapper = PageWrapper;

export default FactsSettings;
