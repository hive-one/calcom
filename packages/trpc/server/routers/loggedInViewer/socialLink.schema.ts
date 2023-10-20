import { z } from "zod";

import { SocialLinkType } from "@calcom/prisma/enums";

export const ZSocialLinkInputSchema = z.object({
  name: z.string(),
  key: z.nativeEnum(SocialLinkType),
  url: z.string(),
  updatedAt: z.date(),
  userId: z.number().int(),
});

export const ZSocialLinkRemoveSchema = z.object({
  id: z.number().int(),
});

export const ZSocialLinkUpdateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  key: z.nativeEnum(SocialLinkType),
  url: z.string(),
  updatedAt: z.date(),
  userId: z.number().int(),
});

export type TSocialLinkInputSchema = z.infer<typeof ZSocialLinkInputSchema>;
export type TSocialLinkRemoveSchema = z.infer<typeof ZSocialLinkRemoveSchema>;
export type TSocialLinkUpdateSchema = z.infer<typeof ZSocialLinkUpdateSchema>;
