import { z } from "zod";

import { SocialLinkType } from "@calcom/prisma/enums";

export const ZSocialLinkInputSchema = z.object({
  name: z.string(),
  key: z.nativeEnum(SocialLinkType),
  url: z.string(),
  updatedAt: z.date(),
  userId: z.number().int(),
});

export type TSocialLinkInputSchema = z.infer<typeof ZSocialLinkInputSchema>;
