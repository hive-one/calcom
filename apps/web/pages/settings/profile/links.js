import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Facebook,
  Github,
  Instagram,
  Link45deg,
  Linkedin,
  Mastodon,
  Medium,
  Quora,
  Reddit,
  StackOverflow,
  Telegram,
  Twitch,
  Twitter,
  Youtube,
  Wikipedia,
  X,
} from "react-bootstrap-icons";

import { getLayout } from "@calcom/features/settings/layouts/SettingsLayout";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { trpc } from "@calcom/trpc/react";
import {
  Button,
  Label,
  Meta,
  Select,
  showToast,
  SkeletonButton,
  SkeletonContainer,
  SkeletonText,
  Input,
} from "@calcom/ui";

import PageWrapper from "@components/PageWrapper";
import EmptyState from "@components/edit-profile/Account/EmptyState";

const linkTypes = [
  {
    key: "OTHER",
    label: "Custom",
    icon: Link45deg,
  },
  {
    key: "TWITTER",
    label: "Twitter",
    icon: Twitter,
  },
  {
    key: "LINKEDIN",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    key: "GITHUB",
    label: "GitHub",
    icon: Github,
  },
  {
    key: "STACKEXCHANGE",
    label: "Stack Exchange",
    icon: StackOverflow,
  },
  { key: "WIKIPEDIA", label: "Wikipedia", icon: Wikipedia },
  {
    key: "GOOGLESCHOLAR",
    label: "Google scholar",
    // icon: GoogleScholar,
  },
  {
    key: "YOUTUBE",
    label: "YouTube",
    icon: Youtube,
  },
  {
    key: "FACEBOOK",
    label: "Facebook",
    icon: Facebook,
  },
  {
    key: "INSTAGRAM",
    label: "Instagram",
    icon: Instagram,
  },
  {
    key: "MEDIUM",
    label: "Medium",
    icon: Medium,
  },
  {
    key: "QUORA",
    label: "Quora",
    icon: Quora,
  },
  {
    key: "REDDIT",
    label: "Reddit",
    icon: Reddit,
  },
  {
    key: "TWITCH",
    label: "Twitch",
    icon: Twitch,
  },
  {
    key: "TELEGRAM",
    label: "Telegram",
    icon: Telegram,
  },
  {
    key: "MASTODON",
    label: "Mastodon",
    icon: Mastodon,
  },
  {
    key: "keybase",
    label: "Keybase",
    // icon: Keybase,
  },
];

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

const LinksSettings = () => {
  const { t } = useLocale();

  const { data: user, isLoading } = trpc.viewer.me.useQuery();
  if (isLoading) return <SkeletonLoader title={t("general")} description={t("general_description")} />;
  if (!user) {
    throw new Error(t("something_went_wrong"));
  }
  return <GeneralView user={user} localeProp={user.locale} />;
};

const GeneralView = ({ user }) => {
  const [links, setLinks] = useState(user?.socialLinks || []);
  const addSocialLinkMutation = trpc.viewer.addSocialLink.useMutation();
  const updateSocialLinkMutation = trpc.viewer.updateSocialLink.useMutation();
  const removeSocialLinkMutation = trpc.viewer.removeSocialLink.useMutation();
  const utils = trpc.useContext();
  const { t } = useLocale();
  const { update } = useSession();

  useEffect(() => {
    setLinks(user?.socialLinks);
  }, [user?.socialLinks]);

  const onSave = (e) => {
    e.preventDefault();
    links?.map((socialLink) => {
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

    showToast("Changes saved", "success");
  };

  const removeLink = ({ i, id }) => {
    if (id) {
      removeSocialLinkMutation.mutate({ id });
    }
    const newLinks = [...links];
    newLinks.splice(i, 1);
    setLinks(newLinks);
  };

  const addLink = () => {
    const newLink = {
      key: "OTHER",
      name: "",
      url: "",
    };
    setLinks((prev) => [...prev, newLink]);
  };

  const handleLinkUrlChange = (e, i) => {
    const newLinks = [...links];
    const url = e.target.value;
    const linkType = linkTypes.find((link) => url.includes(link.key.toLowerCase()));
    newLinks[i].url = url;
    newLinks[i].key = linkType ? linkType.key : "OTHER";
    newLinks[i].name = linkType ? linkType.label : "";
    setLinks(newLinks);
  };

  const handleLinkTypeChange = (e, i) => {
    const newLinks = [...links];
    newLinks[i].key = e.value;
    newLinks[i].name = e.value === "OTHER" ? "" : linkTypes.find((link) => link.key === e.value).label;
    setLinks(newLinks);
  };

  const handleLinkNameChange = (e, i) => {
    const newLinks = [...links];
    newLinks[i].name = e.target.value;
    setLinks(newLinks);
  };

  return (
    <form onSubmit={onSave}>
      <Meta title="Links" description="Add your social links" />
      {!links || (links?.length === 0 && <EmptyState label="Add some links and get started." />)}
      <div className="space-y-4 divide-y">
        {links?.length > 0 &&
          links?.map((link, i) => (
            <div key={i} className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-full">
                  <Label>URL</Label>
                  <Input
                    placeholder="https://twitter.com/handle"
                    type="url"
                    required
                    value={link.url}
                    onChange={(e) => handleLinkUrlChange(e, i)}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <Label>Link type</Label>
                  <Select
                    isSearchable={true}
                    className="mb-0 mt-2 h-[38px] w-full capitalize"
                    defaultValue={linkTypes?.filter((item) => item.key === link.key)[0]?.name}
                    onChange={(e) => handleLinkTypeChange(e, i)}
                    options={linkTypes?.map((item) => ({
                      label: item.label,
                      value: item.key,
                    }))}
                    value={linkTypes?.filter((item) => item.key === link.key)[0]?.name}
                  />
                </div>
                <div className="flex w-full items-end gap-2">
                  <div className="flex w-full flex-col gap-x-2">
                    <Label>Link Label</Label>
                    <Input
                      value={link.name}
                      placeholder="Link label"
                      onChange={(e) => handleLinkNameChange(e, i)}
                      disabled={link.key !== "OTHER"}
                      className="mb-0 w-full"
                    />
                  </div>
                  <div className="col-span-full">
                    <Button type="button" variant="icon">
                      <X className="h-5 w-5" onClick={() => removeLink({ i, id: link.id })} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="pb-2">
          <Button onClick={addLink} color="secondary" type="button" className="mb-3 mt-2">
            Add link
          </Button>
        </div>
      </div>

      <Button color="primary" type="submit" className="mt-8">
        Save Changes
      </Button>
    </form>
  );
};

LinksSettings.getLayout = getLayout;
LinksSettings.PageWrapper = PageWrapper;

export default LinksSettings;
