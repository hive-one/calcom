import { Input, Button, Label } from "@shadcdn/ui";
import RemoveButton from "@ui/fayaz/RemoveButton";
import React from "react";

import EmptyState from "./EmptyState";
import FormBlock from "./FormBlock";
import TimelineBlock from "./TimelineBlock";

const formatDate = (date) => date?.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });

const Experience = ({ profile, setProfile, addExperience, removeExperience, removeExperienceRole }) => {
  return (
    <FormBlock title="Experience" description="Your work experience.">
      {!profile?.experience ||
        (!Object.entries(profile?.experience)?.length > 0 && (
          <EmptyState label="Add some roles and get started." />
        ))}
      <div className="space-y-4 divide-y">
        {profile?.experience &&
          Object.entries(profile?.experience)?.length > 0 &&
          Object.entries(profile.experience).map(([companyId, company], companyIndex) => (
            <div key={companyIndex} className="relative space-y-4 pt-4">
              {profile.experience.length > 1 && (
                <RemoveButton
                  label="Remove company"
                  onClick={() => removeExperience({ companyId: company?.companyId, index: companyIndex })}
                  className="absolute right-0 top-7 z-30"
                />
              )}
              <div className="sm:col-span-3">
                <Label>Company/Institution</Label>
                <Input
                  value={company.name}
                  onChange={(e) => {
                    const newExperience = profile.experience;
                    newExperience[companyId].name = e.target.value;
                    setProfile({
                      ...profile,
                      experience: newExperience,
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
                    const newExperience = profile.experience;
                    newExperience[companyId].url = e.target.value;
                    setProfile({
                      ...profile,
                      experience: newExperience,
                    });
                  }}
                />
              </div>

              {company?.roles?.map((role, roleIndex) => (
                <div key={roleIndex} className="relative">
                  {company.roles.length > 1 && (
                    <RemoveButton
                      label="Remove role"
                      onClick={() => removeExperienceRole({ roleIndex, companyId, expId: role?.id })}
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
                          const newExperience = profile.experience;
                          newExperience[companyId].roles[roleIndex].title = e.target.value;
                          setProfile({
                            ...profile,
                            experience: newExperience,
                          });
                        }}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        required
                        value={
                          role?.startYear +
                          "-" +
                          formatDate(role?.startMonth) +
                          "-" +
                          formatDate(role?.startDay)
                        }
                        onChange={(e) => {
                          const newExperience = profile.experience;
                          newExperience[companyId].roles[roleIndex].startDay = parseInt(
                            e.target.value.split("-")[2]
                          );
                          newExperience[companyId].roles[roleIndex].startMonth = parseInt(
                            e.target.value.split("-")[1]
                          );
                          newExperience[companyId].roles[roleIndex].startYear = parseInt(
                            e.target.value.split("-")[0]
                          );
                          setProfile({
                            ...profile,
                            experience: newExperience,
                          });
                        }}
                      />
                    </div>
                    <div className="mt-4 sm:col-span-3">
                      <Label>End Date</Label>
                      <Input
                        label="End Date"
                        type="date"
                        value={
                          role?.endYear + "-" + formatDate(role?.endMonth) + "-" + formatDate(role?.endDay)
                        }
                        required
                        onChange={(e) => {
                          const newExperience = profile.experience;
                          newExperience[companyId].roles[roleIndex].endDay = parseInt(
                            e.target.value.split("-")[2]
                          );
                          newExperience[companyId].roles[roleIndex].endMonth = parseInt(
                            e.target.value.split("-")[1]
                          );
                          newExperience[companyId].roles[roleIndex].endYear = parseInt(
                            e.target.value.split("-")[0]
                          );
                          setProfile({
                            ...profile,
                            experience: newExperience,
                          });
                        }}
                        disabled={role.isCurrentRole}
                      />
                      <div>
                        <label className="mt-1 inline-flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            defaultChecked={role.end_date === "Present"}
                            onChange={(e) => {
                              const newExperience = profile.experience;
                              if (e.target.checked) {
                                newExperience[companyId].roles[roleIndex].isCurrentRole = true;
                              } else {
                                newExperience[companyId].roles[roleIndex].isCurrentRole = false;
                              }
                              setProfile({
                                ...profile,
                                experience: newExperience,
                              });
                            }}
                          />
                          <span className="ml-2 text-sm">I currently work here</span>
                        </label>
                      </div>
                    </div>
                  </TimelineBlock>
                </div>
              ))}
              <TimelineBlock trail={false}>
                <div className="col-span-full">
                  <Button
                    type="button"
                    onClick={() => {
                      const newExperience = profile.experience;
                      newExperience[companyId].roles.push({
                        title: "",
                        description: "",
                        startDay: "",
                        startMonth: "",
                        startYear: "",
                        endDay: "",
                        endMonth: "",
                        endYear: "",
                      });
                      setProfile({
                        ...profile,
                        experience: newExperience,
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
