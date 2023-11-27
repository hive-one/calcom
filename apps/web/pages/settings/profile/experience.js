import { useEffect, useState } from "react";
import { X } from "react-bootstrap-icons";

import { getLayout } from "@calcom/features/settings/layouts/SettingsLayout";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { trpc } from "@calcom/trpc/react";
import {
  Button,
  Label,
  Meta,
  showToast,
  SkeletonButton,
  SkeletonContainer,
  SkeletonText,
  Input,
} from "@calcom/ui";

import PageWrapper from "@components/PageWrapper";
import EmptyState from "@components/edit-profile/Account/EmptyState";
import TimelineBlock from "@components/edit-profile/Account/TimelineBlock";

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const formatDate = (date) => date?.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });

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

const ExpSettings = () => {
  const { t } = useLocale();

  const { data: user, isLoading } = trpc.viewer.me.useQuery();
  if (isLoading) return <SkeletonLoader title={t("general")} description={t("general_description")} />;
  if (!user) {
    throw new Error(t("something_went_wrong"));
  }
  return <GeneralView user={user} localeProp={user.locale} />;
};

const GeneralView = ({ user }) => {
  console.log(user);
  const [data, setData] = useState({ experience: {}, workExperiences: user?.workExperiences || [] });
  const addWorkExpMutation = trpc.viewer.addWorkExperience.useMutation();
  const updateWorkExpMutation = trpc.viewer.updateWorkExperience.useMutation();
  const removeWorkExpMutation = trpc.viewer.removeWorkExperience.useMutation();

  const transformExpForUI = (a) => {
    return Object.entries(groupBy(a?.workExperiences, "companyId")).map(([id, exp]) => {
      if (exp?.length > 1) {
        return {
          companyId: parseInt(id),
          name: exp[0]?.company.name,
          url: exp[0]?.company.url,
          description: exp[0]?.company.description ?? "",
          roles: exp?.map((role) => {
            return {
              description: role.description ?? "",
              endDay: role.endDay,
              endMonth: role.endMonth,
              endYear: role.endYear,
              startDay: role.startDay,
              startMonth: role.startMonth,
              startYear: role.startYear,
              title: role.title,
              id: role.id ?? null,
              isCurrentRole: role.isCurrentRole,
            };
          }),
        };
      }

      return {
        companyId: parseInt(id),
        name: exp[0]?.company.name,
        url: exp[0]?.company.url,
        description: exp[0]?.company.description ?? "",
        roles: [
          {
            description: exp[0].description ?? "",
            endDay: exp[0].endDay,
            endMonth: exp[0].endMonth,
            endYear: exp[0].endYear,
            startDay: exp[0].startDay,
            startMonth: exp[0].startMonth,
            startYear: exp[0].startYear,
            title: exp[0].title,
            id: exp[0].id ?? null,
            isCurrentRole: exp[0].isCurrentRole,
          },
        ],
      };
    });
  };

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      experience: prev?.experience?.length ? prev.experience : transformExpForUI(user),
    }));
  }, [user]);

  const onSave = (e) => {
    e.preventDefault();

    Object.entries(data?.experience)?.map(([id, exp]) => {
      if (exp?.roles?.length) {
        exp.roles.map((role) => {
          if (role?.id) {
            const updateWorkExData = {
              ...role,
              startYear: role?.startYear ? parseInt(role?.startYear) : null,
              endYear: role?.endYear ? parseInt(role?.endYear) : null,
              id: role?.id,
              userId: user?.id,
              companyId: exp?.companyId,
            };

            console.log({ updateWorkExData });
            updateWorkExpMutation.mutate(updateWorkExData);
          } else {
            const addWorkExData = {
              company: {
                name: exp?.name,
                url: exp.url,
                description: exp.description ?? "",
              },
              workExperience: {
                ...role,
                startYear: role?.startYear ? parseInt(role?.startYear) : null,
                endYear: role?.endYear ? parseInt(role?.endYear) : null,
              },
            };
            console.log({ addWorkExData });
            addWorkExpMutation.mutate(addWorkExData);
          }
        });
      }
    });

    showToast("Changes saved", "success");
  };

  const addExperience = () => {
    const newExperience = {
      company: "",
      url: "",
      roles: [
        {
          title: "",
          description: "",
          start_date: "",
          end_date: "",
        },
      ],
    };
    setData((prev) => ({
      ...prev,
      experience: prev?.experience?.length ? [...prev.experience, newExperience] : [newExperience],
    }));
  };

  const removeExperience = ({ index, companyId }) => {
    console.log({ companyId });
    data?.experience?.map((exp) => {
      if (exp?.companyId === companyId) {
        exp?.roles?.map((role) => {
          removeWorkExpMutation.mutate({ id: role?.id });
        });
      }
    });

    setData((prev) => {
      let newExperience = prev.experience;
      newExperience = newExperience.filter((exp) => exp.companyId !== companyId);
      return {
        ...prev,
        experience: newExperience,
      };
    });
  };

  const removeExperienceRole = ({ roleIndex, companyId, expId }) => {
    removeWorkExpMutation.mutate({ id: expId });
    setData((prev) => {
      const newExperience = prev.experience;
      newExperience[companyId].roles = newExperience[companyId].roles.filter((_, i) => i !== roleIndex);
      return {
        ...prev,
        experience: newExperience,
      };
    });
  };

  return (
    <form onSubmit={onSave}>
      <Meta title="Experience" description="Your work experience" />
      {!data?.experience ||
        (!Object.entries(data?.experience)?.length > 0 && (
          <EmptyState label="Add some roles and get started." />
        ))}
      <div className="space-y-4 divide-y">
        {data?.experience &&
          Object.entries(data?.experience)?.length > 0 &&
          Object.entries(data.experience).map(([companyId, company], companyIndex) => (
            <div key={companyIndex} className="relative space-y-4 pt-4">
              {data?.experience?.length > 1 && (
                <Button
                  type="button"
                  variant="icon"
                  onClick={() => removeExperience({ companyId: company?.companyId, index: companyIndex })}
                  className="absolute right-0 top-7 z-30">
                  <X className="h-5 w-5" />
                </Button>
              )}
              <div className="sm:col-span-3">
                <Label>Company/Institution</Label>
                <Input
                  required
                  value={company.name}
                  onChange={(e) => {
                    const newExperience = data.experience;
                    newExperience[companyId].name = e.target.value;
                    setData((prev) => ({
                      ...prev,
                      experience: newExperience,
                    }));
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
                    const newExperience = data.experience;
                    newExperience[companyId].url = e.target.value;
                    setData((prev) => ({
                      ...prev,
                      experience: newExperience,
                    }));
                  }}
                />
              </div>

              {company?.roles?.map((role, roleIndex) => (
                <div key={roleIndex} className="relative">
                  {company.roles.length > 1 && (
                    <Button
                      type="button"
                      variant="icon"
                      onClick={() => removeExperienceRole({ roleIndex, companyId, expId: role?.id })}
                      className="absolute -top-px right-0 z-30">
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                  <TimelineBlock trail={true}>
                    <div className="sm:col-span-3">
                      <Label>Role/Title</Label>
                      <Input
                        required
                        label="Role/Title"
                        value={role.title}
                        onChange={(e) => {
                          const newExperience = data.experience;
                          newExperience[companyId].roles[roleIndex].title = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            experience: newExperience,
                          }));
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
                          const newExperience = data.experience;
                          newExperience[companyId].roles[roleIndex].startDay = parseInt(
                            e.target.value.split("-")[2]
                          );
                          newExperience[companyId].roles[roleIndex].startMonth = parseInt(
                            e.target.value.split("-")[1]
                          );
                          newExperience[companyId].roles[roleIndex].startYear = e.target.value.split("-")[0];
                          setData((prev) => ({
                            ...prev,
                            experience: newExperience,
                          }));
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
                          const newExperience = data.experience;
                          newExperience[companyId].roles[roleIndex].endDay = parseInt(
                            e.target.value.split("-")[2]
                          );
                          newExperience[companyId].roles[roleIndex].endMonth = parseInt(
                            e.target.value.split("-")[1]
                          );
                          newExperience[companyId].roles[roleIndex].endYear = e.target.value.split("-")[0];
                          setData((prev) => ({
                            ...prev,
                            experience: newExperience,
                          }));
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
                              const newExperience = data.experience;
                              if (e.target.checked) {
                                newExperience[companyId].roles[roleIndex].isCurrentRole = true;
                              } else {
                                newExperience[companyId].roles[roleIndex].isCurrentRole = false;
                              }
                              setData((prev) => ({
                                ...prev,
                                experience: newExperience,
                              }));
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
                      const newExperience = data.experience;
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
                      setData((prev) => ({
                        ...prev,
                        experience: newExperience,
                      }));
                    }}
                    variant="outline"
                    size="sm">
                    Add Role
                  </Button>
                </div>
              </TimelineBlock>
            </div>
          ))}
        <div className="pb-2">
          <Button onClick={addExperience} color="secondary" type="button" className="mb-3 mt-2">
            Add experience
          </Button>
        </div>
      </div>

      <Button color="primary" type="submit" className="mt-8">
        Save Changes
      </Button>
    </form>
  );
};

ExpSettings.getLayout = getLayout;
ExpSettings.PageWrapper = PageWrapper;

export default ExpSettings;
