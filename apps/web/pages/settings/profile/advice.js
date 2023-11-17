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

const AdviceSettings = () => {
  const { t } = useLocale();

  const { data: user, isLoading } = trpc.viewer.me.useQuery();
  if (isLoading) return <SkeletonLoader title={t("general")} description={t("general_description")} />;
  if (!user) {
    throw new Error(t("something_went_wrong"));
  }
  return <GeneralView user={user} localeProp={user.locale} />;
};

const GeneralView = ({ user }) => {
  const [data, setData] = useState(user?.adviceOn || []);
  const mutation = trpc.viewer.updateProfile.useMutation();

  useEffect(() => {
    setData(user?.adviceOn);
  }, [user?.adviceOn]);

  const onSave = (e) => {
    e.preventDefault();
    mutation.mutate({ adviceOn: data });

    showToast("Changes saved", "success");
  };

  const addAdvice = () => {
    const newAdviceItem = "";
    setData((prev) => [...prev, newAdviceItem]);
  };

  const removeAdvice = (index) => {
    let newData = data.filter((_, i) => i !== index);
    setData(newData);
    mutation.mutate({ adviceOn: newData });
  };

  return (
    <form onSubmit={onSave}>
      <Meta title="Advises" description="Add topics you can advice on" />
      {!data || (data?.length === 0 && <EmptyState label="Add topics you can advice on" />)}
      <div className="space-y-4 divide-y">
        {data?.length > 0 &&
          data?.map((advice, i) => (
            <div key={i} className="space-y-4 pt-2">
              <div>
                <Label>{`Advice #${i + 1}`}</Label>
                <div className="flex items-end gap-x-2">
                  <Input
                    placeholder="e.g. How to get started with public speaking"
                    value={advice}
                    onChange={(e) => {
                      const newAdvice = [...data];
                      newAdvice[i] = e.target.value.slice(0, 100);
                      setData(newAdvice);
                    }}
                    required
                  />
                  <Button onClick={() => removeAdvice(i)} type="button" variant="icon">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="mt-1 pr-12 text-right text-xs text-gray-400">{advice.length}/100</div>
              </div>
            </div>
          ))}
        <div className="pb-2">
          <Button onClick={addAdvice} color="secondary" type="button" className="mb-3 mt-2">
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

AdviceSettings.getLayout = getLayout;
AdviceSettings.PageWrapper = PageWrapper;

export default AdviceSettings;
