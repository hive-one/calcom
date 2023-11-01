import type { NextPageContext } from "next";
import type { DocumentContext, DocumentProps } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { z } from "zod";

import { IS_PRODUCTION } from "@calcom/lib/constants";

import { csp } from "@lib/csp";

type Props = Record<string, unknown> & DocumentProps;
function setHeader(ctx: NextPageContext, name: string, value: string) {
  try {
    ctx.res?.setHeader(name, value);
  } catch (e) {
    // Getting "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client" when revalidate calendar chache
    console.log(`Error setting header ${name}=${value} for ${ctx.asPath || "unknown asPath"}`, e);
  }
}
class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const { nonce } = csp(ctx.req || null, ctx.res || null);
    if (!process.env.CSP_POLICY) {
      setHeader(ctx, "x-csp", "not-opted-in");
    } else if (!ctx.res?.getHeader("x-csp")) {
      // If x-csp not set by gSSP, then it's initialPropsOnly
      setHeader(ctx, "x-csp", "initialPropsOnly");
    }

    const asPath = ctx.asPath || "";
    // Use a dummy URL as default so that URL parsing works for relative URLs as well. We care about searchParams and pathname only
    const parsedUrl = new URL(asPath, "https://dummyurl");
    const isEmbed = parsedUrl.pathname.endsWith("/embed") || parsedUrl.searchParams.get("embedType") !== null;
    const embedColorScheme = parsedUrl.searchParams.get("ui.color-scheme");
    const initialProps = await Document.getInitialProps(ctx);
    return { isEmbed, embedColorScheme, nonce, ...initialProps };
  }

  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const { isEmbed, embedColorScheme } = this.props;
    const nonceParsed = z.string().safeParse(this.props.nonce);
    const nonce = nonceParsed.success ? nonceParsed.data : "";
    return (
      <Html lang={locale} style={embedColorScheme ? { colorScheme: embedColorScheme as string } : undefined}>
        <Head nonce={nonce}>
          <link rel="apple-touch-icon" sizes="180x180" href="/api/logo?type=apple-touch-icon" />
          <link rel="icon" type="image/png" sizes="32x32" href="/api/logo?type=favicon-32" />
          <link rel="icon" type="image/png" sizes="16x16" href="/api/logo?type=favicon-16" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
          <meta name="msapplication-TileColor" content="#ff0000" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f9fafb" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1C1C1C" />
          {!IS_PRODUCTION && process.env.VERCEL_ENV === "preview" && (
            // eslint-disable-next-line @next/next/no-sync-scripts
            <script
              data-project-id="KjpMrKTnXquJVKfeqmjdTffVPf1a6Unw2LZ58iE4"
              src="https://snippet.meticulous.ai/v1/stagingMeticulousSnippet.js"
            />
          )}
        </Head>

        <body
          className="dark:bg-darkgray-50 desktop-transparent bg-white antialiased"
          style={
            isEmbed
              ? {
                  background: "transparent",
                  // Keep the embed hidden till parent initializes and
                  // - gives it the appropriate styles if UI instruction is there.
                  // - gives iframe the appropriate height(equal to document height) which can only be known after loading the page once in browser.
                  // - Tells iframe which mode it should be in (dark/light) - if there is a a UI instruction for that
                  visibility: "hidden",
                }
              : {}
          }>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
