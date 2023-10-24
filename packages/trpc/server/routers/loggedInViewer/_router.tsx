import authedProcedure from "../../procedures/authedProcedure";
import { router } from "../../trpc";
import { ZAppByIdInputSchema } from "./appById.schema";
import { ZAppCredentialsByTypeInputSchema } from "./appCredentialsByType.schema";
import { ZAwayInputSchema } from "./away.schema";
import { ZBookAddSchema, ZBookUpdateSchema, ZBookRemoveSchema } from "./book.schema";
import { ZCompanyAddSchema } from "./company.schema";
import { ZConnectedCalendarsInputSchema } from "./connectedCalendars.schema";
import { ZDeleteCredentialInputSchema } from "./deleteCredential.schema";
import { ZDeleteMeInputSchema } from "./deleteMe.schema";
import { ZEventTypeOrderInputSchema } from "./eventTypeOrder.schema";
import { ZFactAddSchema, ZFactRemoveSchema, ZFactUpdateSchema } from "./fact.schema";
import { ZGetCalVideoRecordingsInputSchema } from "./getCalVideoRecordings.schema";
import { ZGetDownloadLinkOfCalVideoRecordingsInputSchema } from "./getDownloadLinkOfCalVideoRecordings.schema";
import { ZIntegrationsInputSchema } from "./integrations.schema";
import { ZLocationOptionsInputSchema } from "./locationOptions.schema";
import {
  ZMediaAppearanceAddSchema,
  ZMediaAppearanceRemoveSchema,
  ZMediaAppearanceUpdateSchema,
} from "./mediaAppearance.schema";
import { ZPodcastAddSchema, ZPodcastDeleteSchema, ZPodcastUpdateSchema } from "./podcast.schema";
import { ZPodcastEpisodeAddSchema } from "./podcastEpisode.schema";
import { ZProjectAddSchema, ZProjectUpdateSchema, ZProjectRemoveSchema } from "./project.schema";
import {
  ZPublicationAddSchema,
  ZPublicationUpdateSchema,
  ZPublicationRemoveSchema,
} from "./publication.schema";
import { ZRoutingFormOrderInputSchema } from "./routingFormOrder.schema";
import { ZSetDestinationCalendarInputSchema } from "./setDestinationCalendar.schema";
import {
  ZSocialLinkInputSchema,
  ZSocialLinkRemoveSchema,
  ZSocialLinkUpdateSchema,
} from "./socialLink.schema";
import { ZSubmitFeedbackInputSchema } from "./submitFeedback.schema";
import { ZUpdateProfileInputSchema } from "./updateProfile.schema";
import { ZUpdateUserDefaultConferencingAppInputSchema } from "./updateUserDefaultConferencingApp.schema";
import { ZVideoAddSchema, ZVideoUpdateSchema, ZVideoRemoveSchema } from "./video.schema";
import {
  ZWorkExperienceAddSchema,
  ZWorkExperienceUpdateSchema,
  ZWorkExperienceDeleteSchema,
} from "./workExperience.schema";
import { ZWorkflowOrderInputSchema } from "./workflowOrder.schema";

type AppsRouterHandlerCache = {
  me?: typeof import("./me.handler").meHandler;
  shouldVerifyEmail?: typeof import("./shouldVerifyEmail.handler").shouldVerifyEmailHandler;
  avatar?: typeof import("./avatar.handler").avatarHandler;
  deleteMe?: typeof import("./deleteMe.handler").deleteMeHandler;
  deleteMeWithoutPassword?: typeof import("./deleteMeWithoutPassword.handler").deleteMeWithoutPasswordHandler;
  away?: typeof import("./away.handler").awayHandler;
  connectedCalendars?: typeof import("./connectedCalendars.handler").connectedCalendarsHandler;
  setDestinationCalendar?: typeof import("./setDestinationCalendar.handler").setDestinationCalendarHandler;
  integrations?: typeof import("./integrations.handler").integrationsHandler;
  appById?: typeof import("./appById.handler").appByIdHandler;
  appCredentialsByType?: typeof import("./appCredentialsByType.handler").appCredentialsByTypeHandler;
  stripeCustomer?: typeof import("./stripeCustomer.handler").stripeCustomerHandler;
  updateProfile?: typeof import("./updateProfile.handler").updateProfileHandler;
  eventTypeOrder?: typeof import("./eventTypeOrder.handler").eventTypeOrderHandler;
  routingFormOrder?: typeof import("./routingFormOrder.handler").routingFormOrderHandler;
  workflowOrder?: typeof import("./workflowOrder.handler").workflowOrderHandler;
  submitFeedback?: typeof import("./submitFeedback.handler").submitFeedbackHandler;
  locationOptions?: typeof import("./locationOptions.handler").locationOptionsHandler;
  deleteCredential?: typeof import("./deleteCredential.handler").deleteCredentialHandler;
  bookingUnconfirmedCount?: typeof import("./bookingUnconfirmedCount.handler").bookingUnconfirmedCountHandler;
  getCalVideoRecordings?: typeof import("./getCalVideoRecordings.handler").getCalVideoRecordingsHandler;
  getDownloadLinkOfCalVideoRecordings?: typeof import("./getDownloadLinkOfCalVideoRecordings.handler").getDownloadLinkOfCalVideoRecordingsHandler;
  getUsersDefaultConferencingApp?: typeof import("./getUsersDefaultConferencingApp.handler").getUsersDefaultConferencingAppHandler;
  updateUserDefaultConferencingApp?: typeof import("./updateUserDefaultConferencingApp.handler").updateUserDefaultConferencingAppHandler;
  teamsAndUserProfilesQuery?: typeof import("./teamsAndUserProfilesQuery.handler").teamsAndUserProfilesQuery;
  addSocialLink?: typeof import("./socialLink.handler").addSocialLinkHandler;
  removeSocialLink?: typeof import("./socialLink.handler").removeSocialLinkHandler;
  updateSocialLink?: typeof import("./socialLink.handler").updateSocialLinkHandler;
  addFact?: typeof import("./fact.handler").addFactHandler;
  updateFact?: typeof import("./fact.handler").updateFactHandler;
  removeFact?: typeof import("./fact.handler").removeFactHandler;
  addProject?: typeof import("./project.handler").addProjectHandler;
  updateProject?: typeof import("./project.handler").updateProjectHandler;
  removeProject?: typeof import("./project.handler").removeProjectHandler;
  addWorkExperience?: typeof import("./workExperience.handler").addWorkExperienceHandler;
  updateWorkExperience?: typeof import("./workExperience.handler").updateWorkExperienceHandler;
  removeWorkExperience?: typeof import("./workExperience.handler").removeWorkExperienceHandler;
  addCompany?: typeof import("./company.handler").addCompanyHandler;
  addPublication?: typeof import("./publication.handler").addPublicationHandler;
  updatePublication?: typeof import("./publication.handler").updatePublicationHandler;
  removePublication?: typeof import("./publication.handler").removePublicationHandler;
  addBook?: typeof import("./book.handler").addBookHandler;
  updateBook?: typeof import("./book.handler").updateBookHandler;
  removeBook?: typeof import("./book.handler").removeBookHandler;
  addPodcast?: typeof import("./podcast.handler").addPodcastHandler;
  updatePodcast?: typeof import("./podcast.handler").updatePodcastHandler;
  addPodcastEp?: typeof import("./podcastEpisode.handler").addPodcastEpisodeHandler;
  removePodcastEp?: typeof import("./podcastEpisode.handler").removePodcastEpisodeHandler;
  addVideo?: typeof import("./video.handler").addVideoHandler;
  updateVideo?: typeof import("./video.handler").updateVideoHandler;
  removeVideo?: typeof import("./video.handler").removeVideoHandler;
  addMediaAppearance?: typeof import("./mediaAppearance.handler").addMediaAppearanceHandler;
  updateMediaAppearance?: typeof import("./mediaAppearance.handler").updateMediaAppearanceHandler;
  removeMediaAppearance?: typeof import("./mediaAppearance.handler").removeMediaAppearanceHandler;
};

const UNSTABLE_HANDLER_CACHE: AppsRouterHandlerCache = {};

export const loggedInViewerRouter = router({
  me: authedProcedure.query(async ({ ctx }) => {
    if (!UNSTABLE_HANDLER_CACHE.me) {
      UNSTABLE_HANDLER_CACHE.me = (await import("./me.handler")).meHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.me) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.me({ ctx });
  }),

  avatar: authedProcedure.query(async ({ ctx }) => {
    if (!UNSTABLE_HANDLER_CACHE.avatar) {
      UNSTABLE_HANDLER_CACHE.avatar = (await import("./avatar.handler")).avatarHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.avatar) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.avatar({ ctx });
  }),

  deleteMe: authedProcedure.input(ZDeleteMeInputSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.deleteMe) {
      UNSTABLE_HANDLER_CACHE.deleteMe = (await import("./deleteMe.handler")).deleteMeHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.deleteMe) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.deleteMe({ ctx, input });
  }),

  deleteMeWithoutPassword: authedProcedure.mutation(async ({ ctx }) => {
    if (!UNSTABLE_HANDLER_CACHE.deleteMeWithoutPassword) {
      UNSTABLE_HANDLER_CACHE.deleteMeWithoutPassword = (
        await import("./deleteMeWithoutPassword.handler")
      ).deleteMeWithoutPasswordHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.deleteMeWithoutPassword) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.deleteMeWithoutPassword({ ctx });
  }),

  away: authedProcedure.input(ZAwayInputSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.away) {
      UNSTABLE_HANDLER_CACHE.away = (await import("./away.handler")).awayHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.away) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.away({ ctx, input });
  }),

  connectedCalendars: authedProcedure.input(ZConnectedCalendarsInputSchema).query(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.connectedCalendars) {
      UNSTABLE_HANDLER_CACHE.connectedCalendars = (
        await import("./connectedCalendars.handler")
      ).connectedCalendarsHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.connectedCalendars) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.connectedCalendars({ ctx, input });
  }),

  setDestinationCalendar: authedProcedure
    .input(ZSetDestinationCalendarInputSchema)
    .mutation(async ({ ctx, input }) => {
      if (!UNSTABLE_HANDLER_CACHE.setDestinationCalendar) {
        UNSTABLE_HANDLER_CACHE.setDestinationCalendar = (
          await import("./setDestinationCalendar.handler")
        ).setDestinationCalendarHandler;
      }

      // Unreachable code but required for type safety
      if (!UNSTABLE_HANDLER_CACHE.setDestinationCalendar) {
        throw new Error("Failed to load handler");
      }

      return UNSTABLE_HANDLER_CACHE.setDestinationCalendar({ ctx, input });
    }),

  integrations: authedProcedure.input(ZIntegrationsInputSchema).query(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.integrations) {
      UNSTABLE_HANDLER_CACHE.integrations = (await import("./integrations.handler")).integrationsHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.integrations) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.integrations({ ctx, input });
  }),

  appById: authedProcedure.input(ZAppByIdInputSchema).query(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.appById) {
      UNSTABLE_HANDLER_CACHE.appById = (await import("./appById.handler")).appByIdHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.appById) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.appById({ ctx, input });
  }),

  appCredentialsByType: authedProcedure
    .input(ZAppCredentialsByTypeInputSchema)
    .query(async ({ ctx, input }) => {
      if (!UNSTABLE_HANDLER_CACHE.appCredentialsByType) {
        UNSTABLE_HANDLER_CACHE.appCredentialsByType = (
          await import("./appCredentialsByType.handler")
        ).appCredentialsByTypeHandler;
      }

      // Unreachable code but required for type safety
      if (!UNSTABLE_HANDLER_CACHE.appCredentialsByType) {
        throw new Error("Failed to load handler");
      }

      return UNSTABLE_HANDLER_CACHE.appCredentialsByType({ ctx, input });
    }),

  stripeCustomer: authedProcedure.query(async ({ ctx }) => {
    if (!UNSTABLE_HANDLER_CACHE.stripeCustomer) {
      UNSTABLE_HANDLER_CACHE.stripeCustomer = (
        await import("./stripeCustomer.handler")
      ).stripeCustomerHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.stripeCustomer) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.stripeCustomer({ ctx });
  }),

  updateProfile: authedProcedure.input(ZUpdateProfileInputSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.updateProfile) {
      UNSTABLE_HANDLER_CACHE.updateProfile = (await import("./updateProfile.handler")).updateProfileHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.updateProfile) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.updateProfile({ ctx, input });
  }),

  addSocialLink: authedProcedure.input(ZSocialLinkInputSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.addSocialLink) {
      UNSTABLE_HANDLER_CACHE.addSocialLink = (await import("./socialLink.handler")).addSocialLinkHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.addSocialLink) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.addSocialLink({ ctx, input });
  }),

  removeSocialLink: authedProcedure.input(ZSocialLinkRemoveSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.removeSocialLink) {
      UNSTABLE_HANDLER_CACHE.removeSocialLink = (
        await import("./socialLink.handler")
      ).removeSocialLinkHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.removeSocialLink) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.removeSocialLink({ ctx, input });
  }),

  updateSocialLink: authedProcedure.input(ZSocialLinkUpdateSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.updateSocialLink) {
      UNSTABLE_HANDLER_CACHE.updateSocialLink = (
        await import("./socialLink.handler")
      ).updateSocialLinkHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.updateSocialLink) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.updateSocialLink({ ctx, input });
  }),

  addProject: authedProcedure.input(ZProjectAddSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.addProject) {
      UNSTABLE_HANDLER_CACHE.addProject = (await import("./project.handler")).addProjectHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.addProject) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.addProject({ ctx, input });
  }),

  updateProject: authedProcedure.input(ZProjectUpdateSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.updateProject) {
      UNSTABLE_HANDLER_CACHE.updateProject = (await import("./project.handler")).updateProjectHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.updateProject) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.updateProject({ input });
  }),

  removeProject: authedProcedure.input(ZProjectRemoveSchema).mutation(async ({ input }) => {
    if (!UNSTABLE_HANDLER_CACHE.removeProject) {
      UNSTABLE_HANDLER_CACHE.removeProject = (await import("./project.handler")).removeProjectHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.removeProject) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.removeProject({ input });
  }),

  addWorkExperience: authedProcedure.input(ZWorkExperienceAddSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.addWorkExperience) {
      UNSTABLE_HANDLER_CACHE.addWorkExperience = (
        await import("./workExperience.handler")
      ).addWorkExperienceHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.addWorkExperience) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.addWorkExperience({ ctx, input });
  }),

  updateWorkExperience: authedProcedure
    .input(ZWorkExperienceUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      if (!UNSTABLE_HANDLER_CACHE.updateWorkExperience) {
        UNSTABLE_HANDLER_CACHE.updateWorkExperience = (
          await import("./workExperience.handler")
        ).updateWorkExperienceHandler;
      }

      // Unreachable code but required for type safety
      if (!UNSTABLE_HANDLER_CACHE.updateWorkExperience) {
        throw new Error("Failed to load handler");
      }

      return UNSTABLE_HANDLER_CACHE.updateWorkExperience({ ctx, input });
    }),

  removeWorkExperience: authedProcedure
    .input(ZWorkExperienceDeleteSchema)
    .mutation(async ({ ctx, input }) => {
      if (!UNSTABLE_HANDLER_CACHE.removeWorkExperience) {
        UNSTABLE_HANDLER_CACHE.removeWorkExperience = (
          await import("./workExperience.handler")
        ).removeWorkExperienceHandler;
      }

      // Unreachable code but required for type safety
      if (!UNSTABLE_HANDLER_CACHE.removeWorkExperience) {
        throw new Error("Failed to load handler");
      }

      return UNSTABLE_HANDLER_CACHE.removeWorkExperience({ ctx, input });
    }),

  addCompany: authedProcedure.input(ZCompanyAddSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.addCompany) {
      UNSTABLE_HANDLER_CACHE.addCompany = (await import("./company.handler")).addCompanyHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.addCompany) {
      throw new Error("Failed to load handler");
    }

    const res = await UNSTABLE_HANDLER_CACHE.addCompany({ ctx, input });
    console.log("res", res);
    return res;
  }),

  addPublication: authedProcedure.input(ZPublicationAddSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.addPublication) {
      UNSTABLE_HANDLER_CACHE.addPublication = (await import("./publication.handler")).addPublicationHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.addPublication) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.addPublication({ ctx, input });
  }),

  updatePublication: authedProcedure.input(ZPublicationUpdateSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.updatePublication) {
      UNSTABLE_HANDLER_CACHE.updatePublication = (
        await import("./publication.handler")
      ).updatePublicationHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.updatePublication) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.updatePublication({ ctx, input });
  }),

  removePublication: authedProcedure.input(ZPublicationRemoveSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.removePublication) {
      UNSTABLE_HANDLER_CACHE.removePublication = (
        await import("./publication.handler")
      ).removePublicationHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.removePublication) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.removePublication({ ctx, input });
  }),

  addBook: authedProcedure.input(ZBookAddSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.addBook) {
      UNSTABLE_HANDLER_CACHE.addBook = (await import("./book.handler")).addBookHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.addBook) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.addBook({ ctx, input });
  }),

  updateBook: authedProcedure.input(ZBookUpdateSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.updateBook) {
      UNSTABLE_HANDLER_CACHE.updateBook = (await import("./book.handler")).updateBookHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.updateBook) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.updateBook({ input });
  }),

  removeBook: authedProcedure.input(ZBookRemoveSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.removeBook) {
      UNSTABLE_HANDLER_CACHE.removeBook = (await import("./book.handler")).removeBookHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.removeBook) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.removeBook({ ctx, input });
  }),

  addPodcast: authedProcedure.input(ZPodcastAddSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.addPodcast) {
      UNSTABLE_HANDLER_CACHE.addPodcast = (await import("./podcast.handler")).addPodcastHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.addPodcast) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.addPodcast({ ctx, input });
  }),

  updatePodcast: authedProcedure.input(ZPodcastUpdateSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.updatePodcast) {
      UNSTABLE_HANDLER_CACHE.updatePodcast = (await import("./podcast.handler")).updatePodcastHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.updatePodcast) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.updatePodcast({ ctx, input });
  }),

  addPodcastEp: authedProcedure.input(ZPodcastEpisodeAddSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.addPodcastEp) {
      UNSTABLE_HANDLER_CACHE.addPodcastEp = (
        await import("./podcastEpisode.handler")
      ).addPodcastEpisodeHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.addPodcastEp) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.addPodcastEp({ ctx, input });
  }),

  removePodcastEp: authedProcedure.input(ZPodcastDeleteSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.removePodcastEp) {
      UNSTABLE_HANDLER_CACHE.removePodcastEp = (
        await import("./podcastEpisode.handler")
      ).removePodcastEpisodeHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.removePodcastEp) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.removePodcastEp({ ctx, input });
  }),

  addVideo: authedProcedure.input(ZVideoAddSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.addVideo) {
      UNSTABLE_HANDLER_CACHE.addVideo = (await import("./video.handler")).addVideoHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.addVideo) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.addVideo({ ctx, input });
  }),

  updateVideo: authedProcedure.input(ZVideoUpdateSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.updateVideo) {
      UNSTABLE_HANDLER_CACHE.updateVideo = (await import("./video.handler")).updateVideoHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.updateVideo) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.updateVideo({ input });
  }),

  removeVideo: authedProcedure.input(ZVideoRemoveSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.removeVideo) {
      UNSTABLE_HANDLER_CACHE.removeVideo = (await import("./video.handler")).removeVideoHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.removeVideo) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.removeVideo({ ctx, input });
  }),

  addMediaAppearance: authedProcedure.input(ZMediaAppearanceAddSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.addMediaAppearance) {
      UNSTABLE_HANDLER_CACHE.addMediaAppearance = (
        await import("./mediaAppearance.handler")
      ).addMediaAppearanceHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.addMediaAppearance) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.addMediaAppearance({ ctx, input });
  }),

  updateMediaAppearance: authedProcedure
    .input(ZMediaAppearanceUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      if (!UNSTABLE_HANDLER_CACHE.updateMediaAppearance) {
        UNSTABLE_HANDLER_CACHE.updateMediaAppearance = (
          await import("./mediaAppearance.handler")
        ).updateMediaAppearanceHandler;
      }

      // Unreachable code but required for type safety
      if (!UNSTABLE_HANDLER_CACHE.updateMediaAppearance) {
        throw new Error("Failed to load handler");
      }

      return UNSTABLE_HANDLER_CACHE.updateMediaAppearance({ input });
    }),

  removeMediaAppearance: authedProcedure
    .input(ZMediaAppearanceRemoveSchema)
    .mutation(async ({ ctx, input }) => {
      if (!UNSTABLE_HANDLER_CACHE.removeMediaAppearance) {
        UNSTABLE_HANDLER_CACHE.removeMediaAppearance = (
          await import("./mediaAppearance.handler")
        ).removeMediaAppearanceHandler;
      }

      // Unreachable code but required for type safety
      if (!UNSTABLE_HANDLER_CACHE.removeMediaAppearance) {
        throw new Error("Failed to load handler");
      }

      return UNSTABLE_HANDLER_CACHE.removeMediaAppearance({ input });
    }),

  addFact: authedProcedure.input(ZFactAddSchema).mutation(async ({ input }) => {
    if (!UNSTABLE_HANDLER_CACHE.addFact) {
      UNSTABLE_HANDLER_CACHE.addFact = (await import("./fact.handler")).addFactHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.addFact) {
      throw new Error("Failed to load handler");
    }

    const res = await UNSTABLE_HANDLER_CACHE.addFact({ input });

    return res;
  }),

  updateFact: authedProcedure.input(ZFactUpdateSchema).mutation(async ({ input }) => {
    if (!UNSTABLE_HANDLER_CACHE.updateFact) {
      UNSTABLE_HANDLER_CACHE.updateFact = (await import("./fact.handler")).updateFactHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.updateFact) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.updateFact({ input });
  }),

  removeFact: authedProcedure.input(ZFactRemoveSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.removeFact) {
      UNSTABLE_HANDLER_CACHE.removeFact = (await import("./fact.handler")).removeFactHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.removeFact) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.removeFact({ ctx, input });
  }),

  eventTypeOrder: authedProcedure.input(ZEventTypeOrderInputSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.eventTypeOrder) {
      UNSTABLE_HANDLER_CACHE.eventTypeOrder = (
        await import("./eventTypeOrder.handler")
      ).eventTypeOrderHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.eventTypeOrder) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.eventTypeOrder({ ctx, input });
  }),

  routingFormOrder: authedProcedure.input(ZRoutingFormOrderInputSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.routingFormOrder) {
      UNSTABLE_HANDLER_CACHE.routingFormOrder = (
        await import("./routingFormOrder.handler")
      ).routingFormOrderHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.routingFormOrder) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.routingFormOrder({ ctx, input });
  }),

  workflowOrder: authedProcedure.input(ZWorkflowOrderInputSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.workflowOrder) {
      UNSTABLE_HANDLER_CACHE.workflowOrder = (await import("./workflowOrder.handler")).workflowOrderHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.workflowOrder) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.workflowOrder({ ctx, input });
  }),

  //Comment for PR: eventTypePosition is not used anywhere
  submitFeedback: authedProcedure.input(ZSubmitFeedbackInputSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.submitFeedback) {
      UNSTABLE_HANDLER_CACHE.submitFeedback = (
        await import("./submitFeedback.handler")
      ).submitFeedbackHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.submitFeedback) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.submitFeedback({ ctx, input });
  }),

  locationOptions: authedProcedure.input(ZLocationOptionsInputSchema).query(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.locationOptions) {
      UNSTABLE_HANDLER_CACHE.locationOptions = (
        await import("./locationOptions.handler")
      ).locationOptionsHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.locationOptions) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.locationOptions({ ctx, input });
  }),

  deleteCredential: authedProcedure.input(ZDeleteCredentialInputSchema).mutation(async ({ ctx, input }) => {
    if (!UNSTABLE_HANDLER_CACHE.deleteCredential) {
      UNSTABLE_HANDLER_CACHE.deleteCredential = (
        await import("./deleteCredential.handler")
      ).deleteCredentialHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.deleteCredential) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.deleteCredential({ ctx, input });
  }),

  bookingUnconfirmedCount: authedProcedure.query(async ({ ctx }) => {
    if (!UNSTABLE_HANDLER_CACHE.bookingUnconfirmedCount) {
      UNSTABLE_HANDLER_CACHE.bookingUnconfirmedCount = (
        await import("./bookingUnconfirmedCount.handler")
      ).bookingUnconfirmedCountHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.bookingUnconfirmedCount) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.bookingUnconfirmedCount({ ctx });
  }),

  getCalVideoRecordings: authedProcedure
    .input(ZGetCalVideoRecordingsInputSchema)
    .query(async ({ ctx, input }) => {
      if (!UNSTABLE_HANDLER_CACHE.getCalVideoRecordings) {
        UNSTABLE_HANDLER_CACHE.getCalVideoRecordings = (
          await import("./getCalVideoRecordings.handler")
        ).getCalVideoRecordingsHandler;
      }

      // Unreachable code but required for type safety
      if (!UNSTABLE_HANDLER_CACHE.getCalVideoRecordings) {
        throw new Error("Failed to load handler");
      }

      return UNSTABLE_HANDLER_CACHE.getCalVideoRecordings({ ctx, input });
    }),

  getDownloadLinkOfCalVideoRecordings: authedProcedure
    .input(ZGetDownloadLinkOfCalVideoRecordingsInputSchema)
    .query(async ({ ctx, input }) => {
      if (!UNSTABLE_HANDLER_CACHE.getDownloadLinkOfCalVideoRecordings) {
        UNSTABLE_HANDLER_CACHE.getDownloadLinkOfCalVideoRecordings = (
          await import("./getDownloadLinkOfCalVideoRecordings.handler")
        ).getDownloadLinkOfCalVideoRecordingsHandler;
      }

      // Unreachable code but required for type safety
      if (!UNSTABLE_HANDLER_CACHE.getDownloadLinkOfCalVideoRecordings) {
        throw new Error("Failed to load handler");
      }

      return UNSTABLE_HANDLER_CACHE.getDownloadLinkOfCalVideoRecordings({ ctx, input });
    }),

  getUsersDefaultConferencingApp: authedProcedure.query(async ({ ctx }) => {
    if (!UNSTABLE_HANDLER_CACHE.getUsersDefaultConferencingApp) {
      UNSTABLE_HANDLER_CACHE.getUsersDefaultConferencingApp = (
        await import("./getUsersDefaultConferencingApp.handler")
      ).getUsersDefaultConferencingAppHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.getUsersDefaultConferencingApp) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.getUsersDefaultConferencingApp({ ctx });
  }),

  updateUserDefaultConferencingApp: authedProcedure
    .input(ZUpdateUserDefaultConferencingAppInputSchema)
    .mutation(async ({ ctx, input }) => {
      if (!UNSTABLE_HANDLER_CACHE.updateUserDefaultConferencingApp) {
        UNSTABLE_HANDLER_CACHE.updateUserDefaultConferencingApp = (
          await import("./updateUserDefaultConferencingApp.handler")
        ).updateUserDefaultConferencingAppHandler;
      }

      // Unreachable code but required for type safety
      if (!UNSTABLE_HANDLER_CACHE.updateUserDefaultConferencingApp) {
        throw new Error("Failed to load handler");
      }

      return UNSTABLE_HANDLER_CACHE.updateUserDefaultConferencingApp({ ctx, input });
    }),
  shouldVerifyEmail: authedProcedure.query(async ({ ctx }) => {
    if (!UNSTABLE_HANDLER_CACHE.shouldVerifyEmail) {
      UNSTABLE_HANDLER_CACHE.shouldVerifyEmail = (
        await import("./shouldVerifyEmail.handler")
      ).shouldVerifyEmailHandler;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.shouldVerifyEmail) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.shouldVerifyEmail({ ctx });
  }),
  teamsAndUserProfilesQuery: authedProcedure.query(async ({ ctx }) => {
    if (!UNSTABLE_HANDLER_CACHE.teamsAndUserProfilesQuery) {
      UNSTABLE_HANDLER_CACHE.teamsAndUserProfilesQuery = (
        await import("./teamsAndUserProfilesQuery.handler")
      ).teamsAndUserProfilesQuery;
    }

    // Unreachable code but required for type safety
    if (!UNSTABLE_HANDLER_CACHE.teamsAndUserProfilesQuery) {
      throw new Error("Failed to load handler");
    }

    return UNSTABLE_HANDLER_CACHE.teamsAndUserProfilesQuery({ ctx });
  }),
});
