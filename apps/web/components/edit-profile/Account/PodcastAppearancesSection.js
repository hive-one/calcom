import { Button, Input, Label } from "@shadcdn/ui";
import RemoveButton from "@ui/fayaz/RemoveButton";
import React from "react";

import EmptyState from "./EmptyState";
import FormBlock from "./FormBlock";

const PodcastAppearancesSection = ({
  profile,
  setProfile,
  addPodcastAppearance,
  removePodcastAppearance,
}) => {
  return (
    <FormBlock title="Podcasts appearences" description="Add links to podcasts where you have appeared.">
      {!profile?.mediaAppearences?.length > 0 && <EmptyState label="To add a appearence click below" />}
      <div className="space-y-4 divide-y">
        {profile?.mediaAppearences?.length > 0 &&
          profile.mediaAppearences.map((appearance, i) => (
            <div key={i} className="space-y-4 pt-4">
              <div className="col-span-full">
                <Label>Title</Label>
                <Input
                  value={appearance.title}
                  onChange={(e) => {
                    const newAppearances = [...profile.mediaAppearences];
                    newAppearances[i].title = e.target.value;
                    setProfile({
                      ...profile,
                      mediaAppearences: newAppearances,
                    });
                  }}
                />
              </div>
              <div className="sm:col-span-3">
                <Label>URL</Label>
                <Input
                  type="url"
                  value={appearance.url}
                  onChange={(e) => {
                    const newAppearances = [...profile.mediaAppearences];
                    newAppearances[i].url = e.target.value;
                    setProfile({
                      ...profile,
                      mediaAppearences: newAppearances,
                    });
                  }}
                />
              </div>
              <div className="col-span-full flex items-center justify-end">
                <RemoveButton
                  label="Remove"
                  onClick={() => removePodcastAppearance({ index: i, id: appearance.id })}
                />
              </div>
            </div>
          ))}
      </div>
      <div className="col-span-full mt-6">
        <Button type="button" onClick={() => addPodcastAppearance()} variant="outline" size="sm">
          Add appearence
        </Button>
      </div>
    </FormBlock>
  );
};

export default PodcastAppearancesSection;
