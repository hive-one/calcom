import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import { BookerLayoutSelector } from "@calcom/features/settings/BookerLayoutSelector";
import ThemeLabel from "@calcom/features/settings/ThemeLabel";
import { getLayout } from "@calcom/features/settings/layouts/SettingsLayout";
import { checkWCAGContrastColor } from "@calcom/lib/getBrandColours";
import { useHasPaidPlan } from "@calcom/lib/hooks/useHasPaidPlan";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { validateBookerLayouts } from "@calcom/lib/validateBookerLayouts";
import type { userMetadata } from "@calcom/prisma/zod-utils";
import { trpc } from "@calcom/trpc/react";
import {
  Alert,
  Button,
  ColorPicker,
  Form,
  Meta,
  showToast,
  SkeletonButton,
  SkeletonContainer,
  SkeletonText,
} from "@calcom/ui";

import PageWrapper from "@components/PageWrapper";

const SkeletonLoader = ({ title, description }: { title: string; description: string }) => {
  return (
    <SkeletonContainer>
      <Meta title={title} description={description} />
      <div className="mb-8 mt-6 space-y-6">
        <div className="flex items-center">
          <SkeletonButton className="mr-6 h-32 w-48 rounded-md p-5" />
          <SkeletonButton className="mr-6 h-32 w-48 rounded-md p-5" />
          <SkeletonButton className="mr-6 h-32 w-48 rounded-md p-5" />
        </div>
        <div className="flex justify-between">
          <SkeletonText className="h-8 w-1/3" />
          <SkeletonText className="h-8 w-1/3" />
        </div>

        <SkeletonText className="h-8 w-full" />

        <SkeletonButton className="mr-6 h-8 w-20 rounded-md p-5" />
      </div>
    </SkeletonContainer>
  );
};

const AppearanceView = () => {
  const { t } = useLocale();
  const utils = trpc.useContext();
  const { data: user, isLoading } = trpc.viewer.me.useQuery();
  const [darkModeError, setDarkModeError] = useState(false);
  const [lightModeError, setLightModeError] = useState(false);

  const { isLoading: isTeamPlanStatusLoading, hasPaidPlan } = useHasPaidPlan();

  const formMethods = useForm({
    defaultValues: {
      theme: user?.theme,
      brandColor: user?.brandColor || "#292929",
      darkBrandColor: user?.darkBrandColor || "#fafafa",
      hideBranding: user?.hideBranding,
      metadata: user?.metadata as z.infer<typeof userMetadata>,
    },
  });

  const selectedTheme = formMethods.watch("theme");
  const selectedThemeIsDark =
    selectedTheme === "dark" ||
    (selectedTheme === "" &&
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"));

  const {
    formState: { isSubmitting, isDirty },
    reset,
  } = formMethods;

  const mutation = trpc.viewer.updateProfile.useMutation({
    onSuccess: async (data) => {
      await utils.viewer.me.invalidate();
      showToast(t("settings_updated_successfully"), "success");
      reset(data);
    },
    onError: (error) => {
      if (error.message) {
        showToast(error.message, "error");
      } else {
        showToast(t("error_updating_settings"), "error");
      }
    },
  });

  if (isLoading || isTeamPlanStatusLoading)
    return <SkeletonLoader title={t("appearance")} description={t("appearance_description")} />;

  if (!user) return null;

  const isDisabled = isSubmitting || !isDirty;

  return (
    <Form
      form={formMethods}
      handleSubmit={(values) => {
        const layoutError = validateBookerLayouts(values?.metadata?.defaultBookerLayouts || null);
        if (layoutError) throw new Error(t(layoutError));

        mutation.mutate({
          ...values,
          // Radio values don't support null as values, therefore we convert an empty string
          // back to null here.
          theme: values.theme || null,
        });
      }}>
      <Meta title={t("appearance")} description={t("appearance_description")} />
      <div className="mb-6 flex items-center text-sm">
        <div>
          <p className="text-default font-semibold">{t("theme")}</p>
          <p className="text-default">{t("theme_applies_note")}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between sm:flex-row">
        <ThemeLabel
          variant="system"
          value={null}
          label={t("theme_system")}
          defaultChecked={user.theme === null}
          register={formMethods.register}
        />
        <ThemeLabel
          variant="light"
          value="light"
          label={t("light")}
          defaultChecked={user.theme === "light"}
          register={formMethods.register}
        />
        <ThemeLabel
          variant="dark"
          value="dark"
          label={t("dark")}
          defaultChecked={user.theme === "dark"}
          register={formMethods.register}
        />
      </div>

      <hr className="border-subtle my-8 border [&:has(+hr)]:hidden" />
      <BookerLayoutSelector
        isDark={selectedThemeIsDark}
        name="metadata.defaultBookerLayouts"
        title={t("bookerlayout_user_settings_title")}
        description={t("bookerlayout_user_settings_description")}
      />

      <hr className="border-subtle my-8 border" />
      <div className="mb-6 flex items-center text-sm">
        <div>
          <p className="text-default font-semibold">{t("custom_brand_colors")}</p>
          <p className="text-default mt-0.5 leading-5">{t("customize_your_brand_colors")}</p>
        </div>
      </div>

      <div className="block justify-between sm:flex">
        <Controller
          name="brandColor"
          control={formMethods.control}
          defaultValue={user.brandColor}
          render={() => (
            <div>
              <p className="text-default mb-2 block text-sm font-medium">{t("light_brand_color")}</p>
              <ColorPicker
                defaultValue={user.brandColor}
                resetDefaultValue="#292929"
                onChange={(value) => {
                  if (!checkWCAGContrastColor("#ffffff", value)) {
                    setLightModeError(true);
                  } else {
                    setLightModeError(false);
                  }
                  formMethods.setValue("brandColor", value, { shouldDirty: true });
                }}
              />
            </div>
          )}
        />
        <Controller
          name="darkBrandColor"
          control={formMethods.control}
          defaultValue={user.darkBrandColor}
          render={() => (
            <div className="mt-6 sm:mt-0">
              <p className="text-default mb-2 block text-sm font-medium">{t("dark_brand_color")}</p>
              <ColorPicker
                defaultValue={user.darkBrandColor}
                resetDefaultValue="#fafafa"
                onChange={(value) => {
                  if (!checkWCAGContrastColor("#101010", value)) {
                    setDarkModeError(true);
                  } else {
                    setDarkModeError(false);
                  }
                  formMethods.setValue("darkBrandColor", value, { shouldDirty: true });
                }}
              />
            </div>
          )}
        />
      </div>
      {darkModeError ? (
        <div className="mt-4">
          <Alert
            severity="warning"
            message="Dark Theme color doesn't pass contrast check. We recommend you change this colour so your buttons will be more visible."
          />
        </div>
      ) : null}
      {lightModeError ? (
        <div className="mt-4">
          <Alert
            severity="warning"
            message="Light Theme color doesn't pass contrast check. We recommend you change this colour so your buttons will be more visible."
          />
        </div>
      ) : null}
      {/* TODO future PR to preview brandColors */}
      {/* <Button
        color="secondary"
        EndIcon={ExternalLink}
        className="mt-6"
        onClick={() => window.open(`${WEBAPP_URL}/${user.username}/${user.eventTypes[0].title}`, "_blank")}>
        Preview
      </Button> */}
      {/* <hr className="border-subtle my-8 border" />
      <Controller
        name="hideBranding"
        control={formMethods.control}
        defaultValue={user.hideBranding}
        render={({ field: { value } }) => (
          <>
            <div className="flex w-full text-sm">
              <div className="mr-1 flex-grow">
                <div className="flex items-center">
                  <p className="text-default font-semibold ltr:mr-2 rtl:ml-2">
                    {t("disable_cal_branding", { appName: APP_NAME })}
                  </p>
                  <UpgradeTeamsBadge />
                </div>
                <p className="text-default  mt-0.5">{t("removes_cal_branding", { appName: APP_NAME })}</p>
              </div>
              <div className="flex-none">
                <Switch
                  id="hideBranding"
                  disabled={!hasPaidPlan}
                  onCheckedChange={(checked) =>
                    formMethods.setValue("hideBranding", checked, { shouldDirty: true })
                  }
                  checked={hasPaidPlan ? value : false}
                />
              </div>
            </div>
          </>
        )}
      /> */}
      <Button
        disabled={isDisabled}
        type="submit"
        loading={mutation.isLoading}
        color="primary"
        className="mt-8"
        data-testid="update-theme-btn">
        {t("update")}
      </Button>
    </Form>
  );
};

AppearanceView.getLayout = getLayout;
AppearanceView.PageWrapper = PageWrapper;

export default AppearanceView;
