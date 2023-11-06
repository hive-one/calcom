import { NextSeo } from "next-seo";
import Script from "next/script";

import PageWrapper from "@components/PageWrapper";
import Footer from "@components/shared/footer";
import Header from "@components/shared/header";

const TermsConditions = () => (
  <div className="">
    <NextSeo title="Terms & Conditions - Borg.id" />
    <Header />
    <div className="mx-auto w-full max-w-[800px] pt-48">
      <h1 className="text-center text-4xl font-bold">Terms & Conditions</h1>
      <div>
        <Script
          id="terms-conditions"
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
          href="https://www.iubenda.com/terms-and-conditions/10493015"
          class="iubenda-black iubenda-noiframe iubenda-embed iubenda-noiframe iub-body-embed"
          title="Terms and Conditions">
          Terms and Conditions
        </a>
      </div>
    </div>
    <Footer />
  </div>
);

TermsConditions.PageWrapper = PageWrapper;

export default TermsConditions;
