import { Microphone } from "@phosphor-icons/react";
import Link from "next/link";

import ExternalLinkIcon from "../../ui/icons/external-link-icon";

const PodcastItem = ({ podcast }) => {
  return (
    <div>
      <div className="mt-3 grid grid-cols-[120px_1fr] gap-3">
        <div className="">
          {podcast?.coverImage && (
            <img
              src={podcast?.coverImage}
              alt={podcast?.title}
              className="aspect-square flex-shrink-0 rounded-lg object-cover"
            />
          )}
          {!podcast?.coverImage && (
            <div className="aspect-square flex-shrink-0 rounded-lg bg-gray-200 object-cover">
              <Microphone className="h-8 w-8 text-gray-500" />
            </div>
          )}
        </div>
        <div className="flex-col space-y-3 sm:flex sm:space-y-0">
          <p className="font-semibold">{podcast?.title}</p>
          <Link href={podcast?.url || "/"} className="mt-2 text-sm text-gray-400 hover:underline">
            link
            <ExternalLinkIcon className="mt-0.5 inline-block align-top text-gray-300" />
          </Link>
          {/* <p className="text-gray-500">Recent episodes:</p>
          {podcast?.episodes?.length > 0 &&
            podcast?.episodes.map((episode, i) => (
              <a href={episode.url} target="_blank" key={i} className="block truncate">
                {episode.title}
              </a>
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default PodcastItem;
