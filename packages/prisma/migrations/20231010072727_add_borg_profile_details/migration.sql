-- CreateEnum
CREATE TYPE "SocialLinkType" AS ENUM ('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'github', 'medium', 'devto', 'stackexchange', 'quora', 'reddit', 'twitch', 'tiktok', 'telegram', 'discord', 'slack', 'whatsapp', 'mastodon', 'snapchat', 'pinterest', 'tumblr', 'vimeo', 'soundcloud', 'spotify', 'apple_music', 'bandcamp', 'behance', 'dribbble', 'fiverr', 'flickr', 'gumroad', 'hackernews', 'website', 'unsplash', 'angellist', 'producthunt', 'other');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "adviceOn" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "priceCurrency" TEXT DEFAULT 'usd',
ADD COLUMN     "pricePerHour" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" "SocialLinkType" NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fact" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Fact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "linkedInId" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDay" INTEGER,
    "startMonth" INTEGER,
    "startYear" INTEGER NOT NULL,
    "isCurrentRole" BOOLEAN NOT NULL DEFAULT false,
    "endDay" INTEGER,
    "endMonth" INTEGER,
    "endYear" INTEGER,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "companyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "converImage" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("isbn")
);

-- CreateTable
CREATE TABLE "Podcast" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "converImage" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PodcastEpisode" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "converImage" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "PodcastEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAppearence" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "podcastId" INTEGER,
    "podcastEpisodeId" INTEGER,
    "videoId" INTEGER,

    CONSTRAINT "MediaAppearence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToVideo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PublicationToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BookToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PodcastToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PodcastEpisodeToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MediaAppearenceToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "SocialLink_userId_idx" ON "SocialLink"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialLink_url_userId_key" ON "SocialLink"("url", "userId");

-- CreateIndex
CREATE INDEX "Fact_userId_idx" ON "Fact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Fact_title_userId_key" ON "Fact"("title", "userId");

-- CreateIndex
CREATE INDEX "Project_userId_idx" ON "Project"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_userId_key" ON "Project"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_linkedInId_key" ON "Company"("linkedInId");

-- CreateIndex
CREATE INDEX "WorkExperience_userId_idx" ON "WorkExperience"("userId");

-- CreateIndex
CREATE INDEX "WorkExperience_companyId_idx" ON "WorkExperience"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Publication_title_key" ON "Publication"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Publication_url_key" ON "Publication"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Podcast_title_key" ON "Podcast"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Podcast_url_key" ON "Podcast"("url");

-- CreateIndex
CREATE UNIQUE INDEX "PodcastEpisode_title_key" ON "PodcastEpisode"("title");

-- CreateIndex
CREATE UNIQUE INDEX "PodcastEpisode_url_key" ON "PodcastEpisode"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Video_url_key" ON "Video"("url");

-- CreateIndex
CREATE INDEX "MediaAppearence_podcastId_idx" ON "MediaAppearence"("podcastId");

-- CreateIndex
CREATE INDEX "MediaAppearence_videoId_idx" ON "MediaAppearence"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "MediaAppearence_url_key" ON "MediaAppearence"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToVideo_AB_unique" ON "_UserToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToVideo_B_index" ON "_UserToVideo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PublicationToUser_AB_unique" ON "_PublicationToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PublicationToUser_B_index" ON "_PublicationToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToUser_AB_unique" ON "_BookToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToUser_B_index" ON "_BookToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PodcastToUser_AB_unique" ON "_PodcastToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PodcastToUser_B_index" ON "_PodcastToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PodcastEpisodeToUser_AB_unique" ON "_PodcastEpisodeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PodcastEpisodeToUser_B_index" ON "_PodcastEpisodeToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MediaAppearenceToUser_AB_unique" ON "_MediaAppearenceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MediaAppearenceToUser_B_index" ON "_MediaAppearenceToUser"("B");

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fact" ADD CONSTRAINT "Fact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAppearence" ADD CONSTRAINT "MediaAppearence_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAppearence" ADD CONSTRAINT "MediaAppearence_podcastEpisodeId_fkey" FOREIGN KEY ("podcastEpisodeId") REFERENCES "PodcastEpisode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAppearence" ADD CONSTRAINT "MediaAppearence_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVideo" ADD CONSTRAINT "_UserToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVideo" ADD CONSTRAINT "_UserToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PublicationToUser" ADD CONSTRAINT "_PublicationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PublicationToUser" ADD CONSTRAINT "_PublicationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToUser" ADD CONSTRAINT "_BookToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("isbn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToUser" ADD CONSTRAINT "_BookToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PodcastToUser" ADD CONSTRAINT "_PodcastToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Podcast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PodcastToUser" ADD CONSTRAINT "_PodcastToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PodcastEpisodeToUser" ADD CONSTRAINT "_PodcastEpisodeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "PodcastEpisode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PodcastEpisodeToUser" ADD CONSTRAINT "_PodcastEpisodeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaAppearenceToUser" ADD CONSTRAINT "_MediaAppearenceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "MediaAppearence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaAppearenceToUser" ADD CONSTRAINT "_MediaAppearenceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
