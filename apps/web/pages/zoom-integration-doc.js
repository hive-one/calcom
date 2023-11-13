import { NextSeo } from "next-seo";

import PageWrapper from "@components/PageWrapper";
import Footer from "@components/shared/footer";
import Header from "@components/shared/header";

const ZoomIntegrationDoc = () => (
  <div className="min-h-screen bg-white px-4 pb-20">
    <NextSeo title="Zoom Integration Guide - Borg.id" />
    <Header />
    <div className="mx-auto w-full max-w-[800px] pb-32 pt-48">
      <h1 className="text-center text-4xl font-bold">Zoom Integration Guide</h1>
      <br />
      <div>
        <p>
          Easily connect your Zoom account to Borg to generate a Zoom link for each call booking that you
          schedule
        </p>
      </div>

      <br />
      <h2 className="text-xl font-bold">Connecting Zoom to Borg</h2>

      <br />
      <p>
        You can add Zoom as a conferencing app to your account by going to{" "}
        <strong>Apps {">"} App Store</strong>
      </p>
      <p>
        There you&apos;ll see Zoom Video, once you click on that you&apos;ll see an option to Install the app
      </p>
      <br />
      <p>
        Alternatively, you can use{" "}
        <a href="/apps/zoom" className="underline">
          Zoom integration page
        </a>{" "}
        to install the app
      </p>
      <br />
      <h2 className="text-xl font-bold">Removing Zoom app</h2>

      <br />
      <p>
        You can remove Zoom app from your account by going to{" "}
        <strong>
          Apps {">"} Installed Apps {">"} Conferencing
        </strong>
      </p>
      <p>
        There you&apos;ll see Zoom Video. You can click on three-dots button in the right next to Zoom Video,
        in the dropdown there you&apos;ll have an option to Remove the app from your account
      </p>
      <br />
      <h2 className="text-xl font-bold">Using Zoom app</h2>
      <br />
      <p>
        To use Zoom as your default conferencing app, you can go to{" "}
        <strong>
          Apps {">"} Installed Apps {">"} Conferencing
        </strong>
      </p>
      <p>
        There you&apos;ll see Zoom Video. You can click on three-dots button in the right next to Zoom Video,
        in the dropdown there you&apos;ll have an option to set the app as default. Once you set the app as
        default, all your calls will be scheduled with Zoom
      </p>
    </div>
    <Footer />
  </div>
);

ZoomIntegrationDoc.PageWrapper = PageWrapper;

export default ZoomIntegrationDoc;
