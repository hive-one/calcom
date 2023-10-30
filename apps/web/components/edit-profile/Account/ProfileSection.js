import { Input } from "@shadcdn/ui/input";
import { Label } from "@shadcdn/ui/label";
import { useState } from "react";

import OrganizationAvatar from "@calcom/features/ee/organizations/components/OrganizationAvatar";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { md } from "@calcom/lib/markdownIt";
import { ImageUploader, Editor } from "@calcom/ui";

import FormBlock from "./FormBlock";

const ProfileSection = ({ profile, setProfile, updateAvatar, avatarRef }) => {
  const { t } = useLocale();
  const [firstRender, setFirstRender] = useState(true);
  return (
    <FormBlock title="Profile" description="This information will be linked to your account.">
      <div className="space-y-5">
        <div className="col-span-full">
          <Label>Full name</Label>
          <Input
            className="mt-2"
            name="name"
            autoFocus
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            required
          />
        </div>
        <div className="col-span-full">
          <Label>Write a bio about yourself</Label>
          <div className="mt-2">
            <Editor
              getText={() => md.render(profile?.bio || "")}
              setText={(value) => {
                setProfile({ ...profile, bio: value });
              }}
              excludedToolbarItems={["blockType"]}
              firstRender={firstRender}
              setFirstRender={setFirstRender}
            />
          </div>
        </div>
        <input
          ref={avatarRef}
          type="hidden"
          name="avatar"
          id="avatar"
          placeholder="URL"
          className="border-default focus:ring-empthasis mt-1 block w-full rounded-sm border px-3 py-2 text-sm focus:border-gray-800 focus:outline-none"
          defaultValue={profile?.avatar}
        />

        <div className="flex items-center gap-5 py-5">
          {profile && (
            <OrganizationAvatar
              alt={profile.username || "user avatar"}
              size="lg"
              imageSrc={profile?.avatar}
              organizationSlug={profile.organization?.slug}
            />
          )}
          <ImageUploader
            target="avatar"
            id="avatar-upload"
            buttonMsg="Change avatar"
            handleAvatarChange={(newAvatar) => {
              setProfile((prev) => ({ ...prev, avatar: newAvatar }));
              if (avatarRef.current) {
                avatarRef.current.value = newAvatar;
              }
              const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value"
              )?.set;
              nativeInputValueSetter?.call(avatarRef.current, newAvatar);
              const ev2 = new Event("input", { bubbles: true });
              avatarRef.current?.dispatchEvent(ev2);
              updateAvatar(ev2);
              setProfile((prev) => ({ ...prev, avatar: newAvatar }));
            }}
            imageSrc={profile?.avatar}
          />
        </div>
      </div>
    </FormBlock>
  );
};

export default ProfileSection;
