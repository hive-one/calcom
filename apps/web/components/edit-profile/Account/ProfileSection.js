import { Input } from "@shadcdn/ui/input";
import { Label } from "@shadcdn/ui/label";
import Tiptap from "@ui/tiptap";

import OrganizationAvatar from "@calcom/features/ee/organizations/components/OrganizationAvatar";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { ImageUploader } from "@calcom/ui";

import FormBlock from "./FormBlock";

const ProfileSection = ({ profile, setProfile, updateAvatar, setAvatarFile, avatarRef }) => {
  const { t } = useLocale();
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
          <div className="focus-within:ring-ring mt-2 rounded-lg border p-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <Tiptap
              hideInfo
              value={profile.bio}
              onChange={(value) => setProfile({ ...profile, bio: value })}
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
            buttonMsg={t("add_profile_photo")}
            handleAvatarChange={(newAvatar) => {
              setProfile((prev) => ({ ...prev, avatar: newAvatar }));
              console.log({ newAvatar });
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

        {/* <PhotoUpload
          avatarUrl={profile.avatar_url}
          onPhotoChange={(file) => {
            setAvatarFile(file);
          }}
        /> */}
        <div className="sm:col-span-3">
          <Label>Company/Institute</Label>
          <Input
            name="company"
            className="mt-2"
            value={profile.company}
            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
          />
        </div>
        <div className="sm:col-span-3">
          <Label>Role/Position</Label>
          <Input
            name="role"
            className="mt-2"
            label="Role/Position"
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          />
        </div>
      </div>
    </FormBlock>
  );
};

export default ProfileSection;
