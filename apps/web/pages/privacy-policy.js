import { NextSeo } from "next-seo";
import Script from "next/script";

import PageWrapper from "@components/PageWrapper";
import Footer from "@components/shared/footer";
import Header from "@components/shared/header";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-white">
    <NextSeo title="Privacy Policy - Borg.id" />
    <Header />
    <div className="mx-auto w-full max-w-[800px] pt-48">
      <h1 className="text-center text-4xl font-bold">Privacy Policy</h1>
      <div>
        <Script
          id="privacy-policy"
          strategy="afterInteractive"
          src="https://cdn.iubenda.com/iubenda.js"
          dangerouslySetInnerHTML={{
            html: `(function (w, d) {
              var loader = function () {
                var s = d.createElement("script"),
                  tag = d.getElementsByTagName("script")[0];
                s.src = "https://cdn.iubenda.com/iubenda.js";
                tag.parentNode.insertBefore(s, tag);
              };
              if (w.addEventListener) {
                w.addEventListener("load", loader, false);
              } else if (w.attachEvent) {
                w.attachEvent("onload", loader);
              } else {
                w.onload = loader;
              }
            })(window, document);`,
          }}
        />
        <a
          href="https://www.iubenda.com/privacy-policy/10493015"
          class="iubenda-black no-brand iubenda-noiframe iubenda-embed iubenda-noiframe iub-body-embed"
          title="Privacy Policy">
          Privacy Policy
        </a>
      </div>
    </div>
    <Footer />
  </div>
);

PrivacyPolicy.PageWrapper = PageWrapper;

export default PrivacyPolicy;
