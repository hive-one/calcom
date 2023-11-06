import { NextSeo } from "next-seo";
import Script from "next/script";

import PageWrapper from "@components/PageWrapper";
import Footer from "@components/shared/footer";
import Header from "@components/shared/header";

const CookiePolicy = () => (
  <div cla>
    <NextSeo title="Cookie Policy - Borg.id" />
    <Header />
    <div className="mx-auto w-full max-w-[800px] pt-48">
      <h1 className="text-center text-4xl font-bold">Cookie Policy</h1>
      <div>
        <Script
          id="cookie-policy"
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
          href="https://www.iubenda.com/privacy-policy/10493015/cookie-policy"
          class="iubenda-black no-brand iubenda-noiframe iubenda-embed iubenda-noiframe iub-body-embed"
          title="Cookie Policy">
          Cookie Policy
        </a>
      </div>
    </div>
    <Footer />
  </div>
);

CookiePolicy.PageWrapper = PageWrapper;

export default CookiePolicy;
