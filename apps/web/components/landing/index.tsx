import { Button } from "@shadcdn/ui";
import { cx } from "class-variance-authority";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { HeadSeo } from "@calcom/ui";

import PageWrapper from "@components/PageWrapper";
import Footer from "@components/shared/footer";
import Header from "@components/shared/header";

// For some reason, tailwind JIT doesn't work with dynamic classes
// if they are generated in a function
const getUnderlineClasses = (width: number, offset: number) =>
  `relative z-10 after:absolute after:bottom-[${offset}px] after:left-0 after:z-[-1] after:block after:h-[${width}px] after:w-full after:bg-green-300 after:content-['']`;

interface ProfileSectionProps {
  imageUrl: string | StaticImageData;
  imageWidth: number;
  imageHeight: number;
  captionTitle?: string;
  captionDescription?: string;
  first?: boolean;
  last?: boolean;
}

const ProfileSection = ({
  imageUrl,
  imageWidth,
  imageHeight,
  captionTitle,
  captionDescription,
  first,
  last,
}: ProfileSectionProps) => {
  return (
    <div className="relative">
      <Image
        src={imageUrl}
        alt="Profile About"
        width={imageWidth}
        height={imageHeight}
        className={cx("", first && "rounded-t-xl", last && "rounded-b-xl")}
      />
      <div className="absolute top-4 flex w-max gap-4" style={{ left: `${imageWidth - 32}px` }}>
        <div className="mt-5 h-[1px] w-[120px] bg-gray-900" />
        <div className="max-w-64">
          <h3 className="text-landing-lg mb-1">{captionTitle}</h3>
          <p className="text-landing-sm">{captionDescription}</p>
        </div>
      </div>
    </div>
  );
};

interface FeatureSectionProps {
  children: string | JSX.Element | JSX.Element[];
  title: string;
  description: string;
}

const FeatureSection = ({ children, title, description }: FeatureSectionProps) => {
  return (
    <div className="flex w-full max-w-7xl flex-col items-center px-[5%] text-center">
      <hgroup className="mb-[72px] max-w-md">
        <h2 className="text-landing-3xl mb-2 font-extrabold leading-[52px]">{title}</h2>
        <p className="text-landing-lg leading-8">{description}</p>
      </hgroup>
      <div className="flex flex-col gap-12 md:flex-row">{children}</div>
    </div>
  );
};

interface FeatureProps {
  pictogramURL: string;
  title: string;
  description: string;
}

const Feature = ({ pictogramURL, title, description }: FeatureProps) => {
  return (
    <div className="flex max-w-sm flex-1 flex-col items-center text-center">
      <Image src={pictogramURL} width={128} height={128} className="mb-3" alt={title} />
      <h3 className="text-landing-lg mb-1 font-bold leading-7">{title}</h3>
      <p className="text-landing-base leading-7">{description}</p>
    </div>
  );
};

interface PriceItemProps {
  price: string;
  details: string;
  description: string;
  hilightPrice: boolean;
}

const PriceItem = ({ price, description, details, hilightPrice = false }: PriceItemProps) => {
  return (
    <div className="flex-1 border-l pl-4 text-left">
      <h3 className="text-landing-2xl mb-[18px] font-bold leading-8">
        {hilightPrice ? (
          <span className="relative z-10 after:absolute after:bottom-[5px] after:left-0 after:z-[-1] after:block after:h-[8px] after:w-full after:bg-green-300 after:content-['']">
            {price}
          </span>
        ) : (
          <>{price}</>
        )}
      </h3>
      <p className="text-landing-base leading-6">{description}</p>
      {details && <p className="text-landing-xs mt-1 leading-[18px]">{details}</p>}
    </div>
  );
};

const LandingPage = ({ session }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // If the user scrolls, we set the isScrolled state to true
  // It is used to change the background of the header.
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolled && window.scrollY > 0) {
        setIsScrolled(true);
      } else if (isScrolled && window.scrollY === 0) {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  return (
    <>
      <HeadSeo
        title="Borg.id"
        description="A Better Professional Profile Platform. AI-powered profile that earns you money."
      />
      <div className="flex w-full flex-col items-center bg-white font-sans">
        {/* Header */}
        <Header session={session} isScrolled={isScrolled} />
        <main className="flex w-full flex-col items-center">
          {/* Hero */}
          <div
            className="flex w-full flex-col items-center bg-[url(/borg/images/landing/cellular-automata-bg.png)] bg-left-top px-[5%] pb-[172px] pt-[164px]"
            style={{ imageRendering: "pixelated" }}>
            <hgroup className="max-w-xl text-center">
              <h1 className="text-landing-3xl md:text-landing-4xl mb-2 font-extrabold leading-[60px]">
                A{" "}
                <span className="relative z-10 after:absolute after:bottom-[10px] after:left-0 after:z-[-1] after:block after:h-[12px] after:w-full after:bg-green-300 after:content-['']">
                  Better
                </span>{" "}
                Professional Profile Platform
              </h1>
              <p className="text-landing-lg mb-14 leading-8">AI-powered profile that earns you money</p>
            </hgroup>
            <div className="flex w-min flex-col items-center">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Button variant="primary" size="landing" className="mb-3 shrink-0 whitespace-nowrap" asChild>
                <Link href="/signup">Join Now</Link>
              </Button>
              <div className="text-landing-sm w-full text-center">
                Create a profile and get paid for your time
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="-mt-24 mb-[216px] flex max-w-7xl flex-col items-center gap-[200px] md:gap-[248px]">
            {/* Profile */}
            <div className="flex w-full flex-col items-center">
              <div
                className="rounded-xl"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(0, 0, 0, 0.05), 0px 4.15088px 3.32071px 0px rgba(0, 0, 0, 0.01), 0px 9.97515px 7.98012px 0px rgba(0, 0, 0, 0.02), 0px 18.78233px 15.02586px 0px rgba(0, 0, 0, 0.03), 0px 33.50446px 26.80357px 0px rgba(0, 0, 0, 0.03), 0px 62.66642px 50.13313px 0px rgba(0, 0, 0, 0.04), 0px 150px 120px 0px rgba(0, 0, 0, 0.05)",
                }}>
                <ProfileSection
                  imageUrl="/borg/images/landing/profile/01-profile-about.png"
                  imageWidth={408}
                  imageHeight={181}
                  captionTitle="Built-in paid call scheduling"
                  captionDescription="You can let visitors book time with you. We'll handle payments & invoicing for you."
                  first={true}
                />
                <div>
                  <Image
                    src="/borg/images/landing/profile/02-profile-facts.png"
                    alt="Profile About"
                    width="408"
                    height="312"
                  />
                </div>
                <div>
                  <Image
                    src="/borg/images/landing/profile/03-profile-experience.png"
                    alt="Profile About"
                    width="408"
                    height="258"
                  />
                </div>
                <div>
                  <Image
                    src="/borg/images/landing/profile/04-profile-books.png"
                    alt="Profile About"
                    width="408"
                    height="335"
                  />
                </div>
                <div>
                  <Image
                    src="/borg/images/landing/profile/05-profile-projects.png"
                    alt="Profile About"
                    width="408"
                    height="222"
                  />
                </div>
                <div>
                  <Image
                    src="/borg/images/landing/profile/06-profile-podcasts.png"
                    alt="Profile About"
                    width="408"
                    height="337"
                  />
                </div>
                <div>
                  <Image
                    src="/borg/images/landing/profile/07-profile-videos.png"
                    alt="Profile About"
                    width="408"
                    height="232"
                  />
                </div>
                <ProfileSection
                  imageUrl="/borg/images/landing/profile/08-profile-publications.png"
                  imageWidth={408}
                  imageHeight={291}
                  captionTitle="Showcase your publications"
                  captionDescription="You can link your papers, articles or blog posts that you are proud of."
                  last={true}
                />
              </div>
            </div>

            {/* Why Borg */}
            <FeatureSection
              title="Why Borg.id?"
              description="Craft a profile, let the world see your skills.">
              <Feature
                pictogramURL="/borg/images/landing/pictograms/simple-elegant-profiles.svg"
                title="Simple & Elegant Profiles"
                description="Borg.id offers clutter-free, accessible profiles without captchas or requiring sign-up to view."
              />
              <Feature
                pictogramURL="/borg/images/landing/pictograms/showcase-your-work.svg"
                title="Showcase Your Work"
                description="Highlight more than just experience and education; display podcasts, books, research, and other projects that define your career."
              />
              <Feature
                pictogramURL="/borg/images/landing/pictograms/earn-from-your-profile.svg"
                title="Earn From Your Profile"
                description="Monetize your presence effortlessly with built-in paid call bookings. Set your rates and availability, and start earning immediately."
              />
            </FeatureSection>

            {/* Why paid calls */}
            <FeatureSection
              title="Why Paid Calls?"
              description="Paid calls help you sort through people who want to talk to you. Set a price and only hear from folks who value your time and come prepared. This way, your calls are worth it!">
              <Feature
                pictogramURL="/borg/images/landing/pictograms/monetize-audience.svg"
                title="Monetize your audience"
                description="Have a following? Give your audience – whether from social media, podcasts, or newsletter – an opportunity to speak to you."
              />
              <Feature
                pictogramURL="/borg/images/landing/pictograms/get-discovered-by-new-people.svg"
                title="Get discovered by new people"
                description="We’ll boost your profile’s presence through search engines and social media with our marketing efforts, helping you get discovered by new people."
              />
              <Feature
                pictogramURL="/borg/images/landing/pictograms/share-experience-with-companies.svg"
                title="Share your expertise with companies"
                description="We work with companies around the world seeking to consult with experts like you."
              />
            </FeatureSection>
          </div>

          {/* Pricing */}
          <div className="flex w-full flex-col items-center gap-[72px] bg-gray-100 px-[5%] pb-[122px] pt-[88px] text-center">
            <div className="flex max-w-7xl flex-col items-center gap-10">
              <h2 className="text-landing-2xl font-extrabold leading-[52px]">Pricing</h2>
              <div className="max-w-80 flex flex-col gap-8 md:max-w-screen-md md:flex-row">
                <PriceItem
                  price="Free"
                  description="To create profile"
                  details="(by application)"
                  hilightPrice
                />
                <PriceItem price="10%" description="on direct bookings" details="" hilightPrice={false} />
                <PriceItem
                  hilightPrice={false}
                  details=""
                  price="30%"
                  description="on bookings generated through our sales & marketing channels"
                />
              </div>
              {/* <div className="flex gap-12">
                <div className="text-left">
                  <h3 className="text-landing-2xl mb-1 font-bold leading-7">
                    <span className="relative z-10 after:absolute after:bottom-[5px] after:left-0 after:z-[-1] after:block after:h-[8px] after:w-full after:bg-green-300 after:content-['']">
                      Free
                    </span>
                  </h3>
                  <p className="text-landing-base leading-7">To create profile</p>
                  <p>(by application)</p>
                </div>
              </div> */}
            </div>
            <div className="flex w-min flex-col items-center">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Button variant="primary" size="landing" className="mb-3 shrink-0 whitespace-nowrap" asChild>
                <Link href="/signup">Join Now</Link>
              </Button>
              <div className="text-landing-sm w-full text-center">
                Create a profile and get paid for your time
              </div>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </>
  );
};

LandingPage.PageWrapper = PageWrapper;

export default LandingPage;
