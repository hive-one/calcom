import { NextSeo } from "next-seo";

import PageWrapper from "@components/PageWrapper";
import Footer from "@components/shared/footer";
import Header from "@components/shared/header";

const ZoomSupport = () => (
  <div className="">
    <NextSeo title="Impressum - Borg.id" />
    <Header />
    <div className="mx-auto w-full max-w-[800px] pt-48">
      <div>
        <h1 className="mb-8 text-center text-4xl font-bold">Zoom Support</h1>
        <div>
          <p>
            Welcome to our Borg.id Zoom-App Support Center. Your experience and satisfaction with our platform
            are paramount to us. We are here to provide you with the assistance and information you need to
            make the most of our service.
          </p>
          <br />
          <p>
            <strong>Hours of Operation:</strong>
          </p>
          <p>Our Customer Support Team is available to assist you during the following hours:</p>
          <p>Monday to Friday: 9:00 AM - 5:00 PM (CET)</p>
          <p>Saturdays, Sundays & Public Holidays: Closed</p>

          <br />
          <p>
            <strong>First Response SLA:</strong>
          </p>
          <p>
            We are committed to responding to all inquiries within 24 hours during business days. Our goal is
            to provide a first response quickly to acknowledge receipt of your request and offer an estimated
            time for resolution.
          </p>

          <br />
          <p>
            <strong>Support Options:</strong>
          </p>
          <br />
          <p>
            <strong>Email Support:</strong>
          </p>
          <p>
            Please contact us at contact@borg.id. We aim to provide a prompt response to guide you through
            your queries or issues.
          </p>
          <br />

          <p>
            Thank you for choosing Borg.id. We are dedicated to ensuring your continued success and
            satisfaction with our platform.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

ZoomSupport.PageWrapper = PageWrapper;

export default ZoomSupport;
