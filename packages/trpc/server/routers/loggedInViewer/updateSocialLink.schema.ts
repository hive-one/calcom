import { z } from "zod";

import { SocialLinkType } from "@calcom/prisma/enums";

export const ZSocialLinkUpdateSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  key: z.nativeEnum(SocialLinkType),
  url: z.string(),
  updatedAt: z.date(),
  userId: z.number().int(),
});

export type TSocialLinkUpdateSchema = z.infer<typeof ZSocialLinkUpdateSchema>;
