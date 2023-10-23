import { Input, Button, Label } from "@shadcdn/ui";
import RemoveButton from "@ui/fayaz/RemoveButton";
import React from "react";

import EmptyState from "./EmptyState";
import FormBlock from "./FormBlock";

const formatDate = (date) => date?.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });

const Experience = ({ profile, setProfile, addExperience, removeExperience }) => {
  return (
    <FormBlock title="Experience" description="Your work experience.">
      {!profile?.workExperiences?.length > 0 && <EmptyState label="Add some roles and get started." />}
      <div className="space-y-4 divide-y">
        {profile?.workExperiences?.length > 0 &&
          profile.workExperiences.map((exp, expIndex) => (
            <div key={expIndex} className="relative space-y-4 pt-4">
              {profile.workExperiences.length > 1 && (
                <RemoveButton
                  label="Remove company"
                  onClick={() => removeExperience({ index: expIndex, id: exp?.id })}
                  className="absolute right-0 top-7 z-30"
                />
              )}
              <div className="sm:col-span-3">
                <Label>Company/Institution</Label>
                <Input
                  value={exp?.company?.name}
                  onChange={(e) => {
                    const newExperience = [...profile.workExperiences];
                    newExperience[expIndex].company = e.target.value;
                    setProfile({
                      ...profile,
                      workExperiences: newExperience,
                    });
                  }}
                />
              </div>

              <div className="sm:col-span-3">
                <Label>URL</Label>
                <Input
                  label="URL"
                  type="url"
                  value={exp?.company?.url}
                  onChange={(e) => {
                    const newExperience = [...profile.workExperiences];
                    newExperience[expIndex].url = e.target.value;
                    setProfile({
                      ...profile,
                      workExperiences: newExperience,
                    });
                  }}
                />
              </div>

              <div className="sm:col-span-3">
                <Label>Role/Title</Label>
                <Input
                  label="Role/Title"
                  value={exp.title}
                  onChange={(e) => {
                    const newExperience = [...profile.workExperiences];
                    newExperience[expIndex].title = e.target.value;
                    setProfile({
                      ...profile,
                      workExperiences: newExperience,
                    });
                  }}
                />
              </div>
              <div className="sm:col-span-3">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  required
                  value={exp?.startYear + "-" + formatDate(exp?.startMonth) + "-" + formatDate(exp?.startDay)}
                  onChange={(e) => {
                    const newExperience = [...profile.workExperiences];
                    newExperience[expIndex].workStart = e.target.value;
                    newExperience[expIndex].startDay = parseInt(e.target.value.split("-")[2]);
                    newExperience[expIndex].startMonth = parseInt(e.target.value.split("-")[1]);
                    newExperience[expIndex].startYear = parseInt(e.target.value.split("-")[0]);

                    console.log(newExperience);
                    setProfile({
                      ...profile,
                      workExperiences: newExperience,
                    });
                  }}
                />
              </div>
              <div className="mt-4 sm:col-span-3">
                <Label>End Date</Label>
                <Input
                  label="End Date"
                  type="date"
                  value={exp?.endYear + "-" + formatDate(exp?.endMonth) + "-" + formatDate(exp?.endDay)}
                  required
                  onChange={(e) => {
                    const newExperience = [...profile.workExperiences];
                    newExperience[expIndex].workEnd = e.target.value;
                    newExperience[expIndex].endDay = parseInt(e.target.value.split("-")[2]);
                    newExperience[expIndex].endMonth = parseInt(e.target.value.split("-")[1]);
                    newExperience[expIndex].endYear = parseInt(e.target.value.split("-")[0]);
                    console.log("newExperience end", newExperience);
                    setProfile({
                      ...profile,
                      workExperiences: newExperience,
                    });
                  }}
                  disabled={exp?.isCurrentRole}
                />
                <label className="mt-1 inline-flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    defaultChecked={exp?.isCurrentRole}
                    onChange={(e) => {
                      const newExperience = [...profile.workExperiences];
                      if (e.target.checked) {
                        newExperience[expIndex].isCurrentRole = true;
                      } else {
                        newExperience[expIndex].isCurrentRole = false;
                      }
                      setProfile({
                        ...profile,
                        workExperiences: newExperience,
                      });
                    }}
                  />
                  <span className="ml-2 text-sm">I currently work here</span>
                </label>
              </div>
            </div>
          ))}
      </div>
      <div className="col-span-full mt-6">
        <Button type="button" onClick={addExperience} variant="outline" size="sm">
          Add experience
        </Button>
      </div>
    </FormBlock>
  );
};

export default Experience;
