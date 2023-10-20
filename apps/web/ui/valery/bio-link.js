import Link from "next/link";
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

import { Keybase, GoogleScholar } from "../../ui/icons/social";

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
  { key: "wikipedia", label: "Wikipedia", icon: Wikipedia },
  {
    key: "GOOGLESCHOLAR",
    label: "Google scholar",
    icon: GoogleScholar,
  },
  {
    key: "YOUTUBE",
    label: "YouTube",
    icon: Youtube,
  },
  {
    key: "FAECBOOK",
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
    key: "KEYBASE",
    label: "Keybase",
    icon: Keybase,
  },
];

// Strip protocol from URL
const stripProtocol = (url) => url.replace(/(^\w+:|^)\/\//, "");

// Link type to icon mapping

const iconProps = {
  size: 16,
  className: "shrink-0 text-gray-400 group-hover:text-gray-500",
};

const linkTypeToIcon = (key) => {
  const IconComponent = linkTypes.find((link) => link.key.toLowerCase() === key?.toLowerCase())?.icon;
  return IconComponent ? <IconComponent {...iconProps} /> : null;
};

// TODO: Add tooltip for icon links
const BioLink = ({ itemKey, url, name }) => (
  <Link
    href={url}
    target="_blank"
    className="group flex flex-row items-center gap-1 text-gray-600 decoration-gray-300 underline-offset-4 hover:text-gray-700 hover:underline"
    title={itemKey !== "other" && itemKey !== "website" && name}
    id={`link-${itemKey}`}>
    <div className="flex h-6 flex-shrink-0 items-center justify-center">
      {linkTypeToIcon(itemKey) ?? <Link45deg {...iconProps} />}
    </div>
    {(itemKey === "generic_link" || itemKey === "website") && (
      <div className="whitespace-nowrap text-[13px] leading-6 tracking-[0.26]">
        {name ? name : stripProtocol(url)}
      </div>
    )}
  </Link>
);

export default BioLink;
