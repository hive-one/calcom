import { NextSeo } from "next-seo";

import PageWrapper from "@components/PageWrapper";
import Footer from "@components/shared/footer";
import Header from "@components/shared/header";

const ZoomSupport = () => (
  <div className="min-h-screen bg-white px-4">
    <NextSeo title="Zoom Support - Borg.id" />
    <Header />
    <div className="mx-auto w-full max-w-[800px] pb-20 pt-48">
      <h1 className="mb-8 text-center text-4xl font-bold">Zoom Support</h1>

      <div>
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
      <br />
      <br />
      <h1 className="mb-8 mt-10 text-center text-4xl font-bold">
        Service Level Agreement (SLA) for Customers by Borg Collective GmbH
      </h1>
      <div>
        <br />
        <h2>1. Agreement Overview</h2>
        <br />
        <p>
          This Service-Level Agreement (this “Agreement” or this “Service-Level Agreement”), effective as of
          10 November 2023, (“Effective Date”) is made by and between Borg Collective GmbH, a company
          organized and existing in Berlin, Germany, (“Survice Provider”) and our customers (“Customer”).
        </p>
        <br />

        <h2>2. Goals & Objectives</h2>
        <br />
        <p>
          The goal of this Agreement is to obtain mutual agreement between the Service Provider(s) and
          Customer(s). The objectives of this Agreement are to:
        </p>
        <br />
        <ul className="list-disc pl-4">
          <li>Provide a thorough understanding of service ownership and the roles and responsibilities. </li>
          <li>
            This Agreement represents a concise description of the services provided by the Service Provider.{" "}
          </li>
          <li>Match perceptions of expected service provision with actual service support & delivery.</li>
        </ul>
        <br />
        <h2>3. Service Agreement</h2>
        <br />
        <p>
          The following are the responsibility of the Service Provider in the ongoing support of this
          Agreement.{" "}
        </p>
        <br />
        <h3>a. Service Scope</h3>
        <br />
        <p>The following Services are covered by this Agreement; </p>
        <br />
        <p>1. First response support for the Borg.id app in the zoom marketplace</p>
        <br />
        <h3>b. Service Provider Requirements</h3>
        <br />
        <p>Service Provider responsibilities and/or requirements in support of this Agreement include: </p>
        <br />
        <p>• Adhering to appropriate response times associated with service-related incidents.</p>
        <p>• Advance notification to the Customer for all maintenance.</p>
        <br />
        <h3>c. Service Assumptions</h3>
        <br />
        <p>Assumptions related to in-scope services and/or components include:</p>
        <br />
        <p>• Changes to services will be communicated and documented to all stakeholders.</p>
        <br />
        <h3>4. Service Management</h3>
        <br />
        <p>
          For maintaining adequate customer-support levels, this Agreement lists the available scope of
          services provided by the Service Provider. This lists details regarding availability, monitoring,
          and other relevant factors.
        </p>
        <br />
        <p>a. Service Availability</p>
        <br />
        <p>Coverage parameters specific to the service(s) covered in this Agreement are as follows:</p>
        <br />
        <p>• Email support: Monitored 9 am to 5 pm (CET) Monday – Friday</p>
        <br />
        <p>
          ◦ Emails received outside of office hours will be collected, however, no action can be guaranteed
          until the next working day.
        </p>
        <br />
        <p>b. Service Requests</p>
        <br />
        <p>
          In support of services outlined in this Agreement, the Service Provider will respond to
          service-related incidents and/or requests submitted by the Customer within the following time
          frames:{" "}
        </p>
        <br />
        <p>• 24 hours (during business hours).</p>
        <br />
        <p>
          Remote assistance will be provided in-line with the above timescales dependent on the priority of
          the support request.
        </p>
      </div>
    </div>
    <Footer />
  </div>
);

ZoomSupport.PageWrapper = PageWrapper;

export default ZoomSupport;
