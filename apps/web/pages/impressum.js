import { NextSeo } from "next-seo";

import PageWrapper from "@components/PageWrapper";
import Footer from "@components/shared/footer";
import Header from "@components/shared/header";

const Impressum = () => (
  <div className="min-h-screen bg-white">
    <NextSeo title="Impressum - Borg.id" />
    <Header />
    <div className="mx-auto w-full max-w-[800px] pt-48">
      <div>
        <h1 className="mb-8 text-center text-4xl font-bold">Impressum</h1>
        <div>
          <ol className="mt-2">
            <li>
              <p>
                <strong>Legal Notice.</strong>
              </p>
              <p>
                This Internet offer is produced and operated by Borg Collective GmbH. With responsibility as
                editor under the conditions of the Press Act and §§ 5 and 6 of the Telemedia Act (TMG) Borg
                Collective GmbH represented by its responsible Managing Director (Geschäftsführer) Maciej
                Laskus.
              </p>
              <br />
              <p>Contact details:</p>
              <span>Borg Collective GmbH</span>
              <br />
              <span>Scharnhorststraße 24</span>
              <br />
              <span>10115 Berlin</span>
              <br />
              <span>Germany</span>
              <br />
              <span>Tel.: +49 30 81455098</span>
              <br />
              <span>(please write us an email to contact us)</span>
              <br />
              <br />
              <span>E-mail: contact@borg.id</span>
              <br />
              <span>Website: borg.id</span>
              <br />
              <br />
              <span>Legal representatives of the company</span>
              <br />
              <span>Managing Directors: Maciej Laskus</span>
              <br />
              <span>Register of Companies</span>
              <br />
              <span>
                The company is a entrepreneurial company with limited liability (GmbH) with its registered
                office in Berlin (Register of Companies of the District Court of Berlin Charlottenburg,
                Registration Number: HRB 197356 B).
              </span>
              <br />
              <span>Tax ID (USt.-ID) (§ 27a Sales Tax Act): DE319811966</span>
              <br />
              <br />
            </li>
            <br />
            <li>
              <p>
                <strong>Online Dispute Resolution.</strong>
              </p>
              <p>
                The European Commission is providing a platform for out-of-court online dispute resolution
                (ODR platform), which is available at www.ec.europa.eu/consumers/odr. Our e-mail address can
                be found above. We are neither obliged nor willing to participate in the dispute settlement
                process.
              </p>
            </li>
            <br />
            <li>
              <p>
                <strong>Liability For Contents.</strong>
              </p>
              <p>
                Borg Collective GmbH provides the information for this Internet offer with the greatest of
                care and makes every effort to ensure it is up to date, correct and complete. All contents are
                intended for general information and do not represent any commercial, legal or other
                consultancy service. Borg Collective GmbH provides no guarantee and accepts no liability for
                any damages of any material or notional nature caused by making use of the service, unless
                this can be shown to have been caused by deliberate intent or gross negligence.
              </p>
              <br />
              <p>
                The laws, regulations and directives which might in certain cases be published in this
                Internet offer have been compiled with care, however no claim is made to their being fully up
                to date or complete. The current wording is legally binding as it appears in the relevant
                publication organs (in particular the Bulletin of the Federal State of North Rhine-Westphalia,
                Official Gazette).
              </p>
              <br />
              <p>
                This Internet offer makes reference to numerous offers on the Internet. The contents of the
                linked pages are created by, among other bodies, companies and institutions over which Borg
                Collective GmbH has no influence. Borg Collective GmbH does not claim the contents contained
                in these as its own. Absolutely no liability is accepted for third-party offers.
              </p>
              <br />
              <p>
                If in respect of the pages of this Internet offer or pages to which reference is made, you
                should identify dubious or illegal content, Borg Collective GmbH would be grateful if you
                would bring this to our attention.We also point out that sections of the site or the entire
                offer representing this Internet offer are liable to alteration, addition or deletion without
                any specific notice. The temporary suspension or definitive termination of publication is also
                possible without notice.
              </p>
              <br />
              <p>
                In accordance with § 7 Para. 1 of the Telemedia Act, Borg Collective GmbH is responsible for
                its own content in this site under the general legal regulations. Under the terms of §§ 8 to
                10 of the Telemedia Act, as a service provider the company is, however, not obliged to monitor
                any third-party information passed or held on the site, or, depending on the circumstances, to
                research this where it indicates some illegal activity. This has no effect on any obligations
                to remove or block the use of information in accordance with the general legal regulations.
                However, any liability on Borg Collective GmbH may only be considered from that point in time
                when it gained knowledge of a concrete breach of the law. On gaining knowledge of the
                corresponding breaches of the law, Borg Collective GmbH will remove these contents
                immediately.
              </p>
            </li>
            <br />
            <li>
              <p>
                <strong>Copyright And Rights Of Use.</strong>
              </p>
              <p>
                Copyright and rights of use for texts, graphics, images, design and source code are held by
                Borg Collective GmbH. Where the contents of this Internet site have not been produced by Borg
                Collective GmbH, third-party copyrights will be observed. In particular, third-party contents
                will be identified as such. Borg Collective GmbH would be obliged to receive the corresponding
                information if breaches of copyright are occasioned by its Internet presence. On becoming
                aware of any breaches of copyright, Borg Collective GmbH will remove such content immediately
                and eliminate the breach of law.
              </p>
            </li>
            <br />
            <li>
              <p>
                <strong>Data Protection Conditions.</strong>
              </p>
              <p>
                As a public body, Borg Collective GmbH is subject to the conditions of the North
                Rhine-Westphalia Data Protection Act. Steps are taken to ensure that the regulations on data
                protection are also observed by any external service providers whose services may be called on
                by Borg Collective GmbH.
              </p>
            </li>
            <br />
            <li>
              <p>
                <strong>Data Storage.</strong>
              </p>
              <p>
                Data are saved and processed, on a temporary basis, in connection with your accessing of this
                Internet offer. This could possibly identify you (e.g. IP address, date, time and Internet
                pages viewed). Your details will be stored in the long term exclusively in anonymized form and
                used for statistical purposes only.In addition, personal data (e.g. your name, e-mail address,
                etc.) are only passed on when you provide them for us expressly, consciously and for specific
                purposes. These data will be processed, saved and passed on only to the extent necessary for
                the specified purpose, or with your consent. As a basic principle, no use is made of active
                elements on HTML pages (JavaScript, ActiveX, etc.).
              </p>
            </li>
            <br />
            <li>
              <p>
                <strong>Data Transmission.</strong>
              </p>
              <p>
                As a basic principle, telecommunications secrecy provides protection for the contents of your
                e-mails and details in your forms in respect of unauthorized viewing and processing. We can
                ensure that this requirement is observed, in respect of the operation of Borg Collective GmbH.
                We would point out to you that, generally speaking, it is possible for data carried over the
                Internet to be recorded by other Internet operators and users. Accordingly, personal data
                should where possible only be transferred in encrypted form. Excepted from this requirement
                are all user comments on the individual pages of the borg.id site, which in each case are
                cleared for publication after having been checked by Borg Collective GmbH (therefore becoming
                viewable by other Internet users).
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

Impressum.PageWrapper = PageWrapper;

export default Impressum;
