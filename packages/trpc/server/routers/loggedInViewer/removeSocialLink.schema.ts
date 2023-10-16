import { z } from "zod";

export const ZSocialLinkRemoveSchema = z.object({
  id: z.number().int(),
});

export type TSocialLinkRemoveSchema = z.infer<typeof ZSocialLinkRemoveSchema>;
