import { X } from "@phosphor-icons/react";
import { Input, Label, Button } from "@shadcdn/ui";
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
} from "react-bootstrap-icons";

import EmptyState from "./EmptyState";
import FormBlock from "./FormBlock";

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
    key: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    key: "github",
    label: "GitHub",
    icon: Github,
  },
  {
    key: "stackexchange",
    label: "Stack Exchange",
    icon: StackOverflow,
  },
  { key: "wikipedia", label: "Wikipedia", icon: Wikipedia },
  {
    key: "google-scholar",
    label: "Google scholar",
    // icon: GoogleScholar,
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: Youtube,
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: Facebook,
  },
  {
    key: "INSTAGRAM",
    label: "Instagram",
    icon: Instagram,
  },
  {
    key: "medium",
    label: "Medium",
    icon: Medium,
  },
  {
    key: "quora",
    label: "Quora",
    icon: Quora,
  },
  {
    key: "reddit",
    label: "Reddit",
    icon: Reddit,
  },
  {
    key: "twitch",
    label: "Twitch",
    icon: Twitch,
  },
  {
    key: "telegram",
    label: "Telegram",
    icon: Telegram,
  },
  {
    key: "mastodon",
    label: "Mastodon",
    icon: Mastodon,
  },
  {
    key: "keybase",
    label: "Keybase",
    // icon: Keybase,
  },
];

const LinkSection = ({ profile, setProfile }) => {
  const handleLinkTypeChange = (e, i) => {
    const newLinks = [...profile.socialLinks];
    newLinks[i].key = e.target.value;
    newLinks[i].name =
      e.target.value === "OTHER" ? "" : linkTypes.find((link) => link.key === e.target.value).label;
    setProfile({ ...profile, links: newLinks });
  };

  const handleLinkNameChange = (e, i) => {
    const newLinks = [...profile.socialLinks];
    newLinks[i].name = e.target.value;
    setProfile({ ...profile, links: newLinks });
  };

  const handleLinkUrlChange = (e, i) => {
    const newLinks = [...profile.socialLinks];
    const url = e.target.value;
    const linkType = linkTypes.find((link) => url.includes(link.key));
    newLinks[i].url = url;
    newLinks[i].key = linkType ? linkType.key : "OTHER";
    newLinks[i].name = linkType ? linkType.label : "";
    setProfile({ ...profile, links: newLinks });
  };

  const addLink = () => {
    const newLink = {
      key: "OTHER",
      name: "",
      url: "",
    };
    setProfile({ ...profile, socialLinks: [...profile.socialLinks, newLink] });
  };

  const removeLink = (i) => {
    const newLinks = [...profile.socialLinks];
    newLinks.splice(i, 1);
    setProfile({ ...profile, links: newLinks });
  };

  if (!profile?.socialLinks) {
    return ``;
  }

  return (
    <FormBlock
      title="Add your links"
      description="Add your social media or some other links you want to show on your profile.">
      {!profile?.socialLinks ||
        (profile?.socialLinks?.length === 0 && <EmptyState label="Add some links and get started." />)}
      <div className="space-y-4 divide-y">
        {profile?.socialLinks?.length > 0 &&
          profile?.socialLinks?.map((link, i) => (
            <div key={i} className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-full">
                  <Label>URL</Label>
                  <Input
                    placeholder="https://twitter.com/handle"
                    type="url"
                    value={link.url}
                    onChange={(e) => handleLinkUrlChange(e, i)}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="block text-sm font-medium leading-6 text-gray-900">Link type</p>
                  <select
                    value={link.key}
                    onChange={(e) => handleLinkTypeChange(e, i)}
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    {linkTypes.map((linkItem, index) => (
                      <option key={index} value={linkItem.key}>
                        {linkItem.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end gap-x-2">
                  <Input
                    label="Name"
                    value={link.name}
                    onChange={(e) => handleLinkNameChange(e, i)}
                    disabled={link.key !== "OTHER"}
                  />
                  <Button type="button" variant="icon">
                    <X className="h-5 w-5" onClick={() => removeLink(i)} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="col-span-full mt-6">
        <Button onClick={addLink} variant="outline" type="button" size="sm">
          Add link
        </Button>
      </div>
    </FormBlock>
  );
};

export default LinkSection;
