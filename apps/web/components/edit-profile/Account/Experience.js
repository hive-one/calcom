import { Input, Button, Label } from "@shadcdn/ui";
import RemoveButton from "@ui/fayaz/RemoveButton";
import React from "react";

import EmptyState from "./EmptyState";
import FormBlock from "./FormBlock";
import TimelineBlock from "./TimelineBlock";

const Experience = ({ profile, setProfile, addExperience, removeExperience, removeExperienceRole }) => {
  return (
    <FormBlock title="Experience" description="Your work experience.">
      {!profile?.workExperiences?.length > 0 && <EmptyState label="Add some roles and get started." />}
      <div className="space-y-4 divide-y">
        {profile?.workExperiences?.length > 0 &&
          profile.workExperiences.map((company, companyIndex) => (
            <div key={companyIndex} className="relative space-y-4 pt-4">
              {profile.workExperiences.length > 1 && (
                <RemoveButton
                  label="Remove company"
                  onClick={() => removeExperience(companyIndex)}
                  className="absolute right-0 top-7 z-30"
                />
              )}
              <div className="sm:col-span-3">
                <Label>Company/Institution</Label>
                <Input
                  value={company.company}
                  onChange={(e) => {
                    const newExperience = [...profile.workExperiences];
                    newExperience[companyIndex].company = e.target.value;
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
                  value={company.url}
                  onChange={(e) => {
                    const newExperience = [...profile.workExperiences];
                    newExperience[companyIndex].url = e.target.value;
                    setProfile({
                      ...profile,
                      workExperiences: newExperience,
                    });
                  }}
                />
              </div>

              {company?.roles?.map((role, roleIndex) => (
                <div key={roleIndex} className="relative">
                  {company.roles.length > 1 && (
                    <RemoveButton
                      label="Remove role"
                      onClick={() => removeExperienceRole(companyIndex, roleIndex)}
                      className="absolute -top-px right-0 z-30"
                    />
                  )}
                  <TimelineBlock trail={true}>
                    <div className="sm:col-span-3">
                      <Label>Role/Title</Label>
                      <Input
                        label="Role/Title"
                        value={role.title}
                        onChange={(e) => {
                          const newExperience = [...profile.workExperiences];
                          newExperience[companyIndex].roles[roleIndex].title = e.target.value;
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
                        value={role.start_date}
                        onChange={(e) => {
                          console.log("start", e.target.value);
                          const newExperience = [...profile.workExperiences];
                          newExperience[companyIndex].roles[roleIndex].startDay =
                            e.target.value.split("-")[0];
                          newExperience[companyIndex].roles[roleIndex].startMonth =
                            e.target.value.split("-")[1];
                          newExperience[companyIndex].roles[roleIndex].startYear =
                            e.target.value.split("-")[2];
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
                        value={role.end_date}
                        required
                        onChange={(e) => {
                          const newExperience = [...profile.workExperiences];
                          newExperience[companyIndex].roles[roleIndex].endDay = e.target.value.split("-")[0];
                          newExperience[companyIndex].roles[roleIndex].endMonth =
                            e.target.value.split("-")[1];
                          newExperience[companyIndex].roles[roleIndex].endYear = e.target.value.split("-")[2];
                          setProfile({
                            ...profile,
                            workExperiences: newExperience,
                          });
                        }}
                        disabled={role.end_date === "Present"}
                      />
                      <label className="mt-1 inline-flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          defaultChecked={role.end_date === "Present"}
                          onChange={(e) => {
                            const newExperience = [...profile.workExperiences];
                            if (e.target.checked) {
                              newExperience[companyIndex].roles[roleIndex].isCurrentRole = true;
                            } else {
                              newExperience[companyIndex].roles[roleIndex].isCurrentRole = false;
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
                  </TimelineBlock>
                </div>
              ))}
              <TimelineBlock trail={false}>
                <div className="col-span-full">
                  <Button
                    onClick={() => {
                      const newExperience = [...profile.workExperiences];
                      newExperience[companyIndex].roles.push({
                        title: "",
                        description: "",
                        start_date: "",
                        end_date: "",
                      });
                      setProfile({
                        ...profile,
                        workExperiences: newExperience,
                      });
                    }}
                    variant="outline"
                    size="sm">
                    Add Role
                  </Button>
                </div>
              </TimelineBlock>
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
