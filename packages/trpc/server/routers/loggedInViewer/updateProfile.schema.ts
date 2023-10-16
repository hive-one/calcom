import { z } from "zod";

import { FULL_NAME_LENGTH_MAX_LIMIT } from "@calcom/lib/constants";
import { bookerLayouts, userMetadata } from "@calcom/prisma/zod-utils";

export const updateUserMetadataAllowedKeys = z.object({
  sessionTimeout: z.number().optional(), // Minutes
  defaultBookerLayouts: bookerLayouts.optional(),
});

export const ZUpdateProfileInputSchema = z.object({
  username: z.string().optional(),
  name: z.string().max(FULL_NAME_LENGTH_MAX_LIMIT).optional(),
  email: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  timeZone: z.string().optional(),
  weekStart: z.string().optional(),
  hideBranding: z.boolean().optional(),
  allowDynamicBooking: z.boolean().optional(),
  allowSEOIndexing: z.boolean().optional(),
  receiveMonthlyDigestEmail: z.boolean().optional(),
  brandColor: z.string().optional(),
  darkBrandColor: z.string().optional(),
  theme: z.string().optional().nullable(),
  completedOnboarding: z.boolean().optional(),
  locale: z.string().optional(),
  timeFormat: z.number().optional(),
  disableImpersonation: z.boolean().optional(),
  metadata: userMetadata.optional(),

  //Borg
  adviceOn: z.array(z.string()).optional(),
  pricePerHour: z.number().optional(),
  priceCurrency: z.string().optional(),
});

export type TUpdateProfileInputSchema = z.infer<typeof ZUpdateProfileInputSchema>;
