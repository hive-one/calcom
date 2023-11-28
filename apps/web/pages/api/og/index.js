import { ImageResponse } from "@vercel/og";

// import { getProfile } from "lib/firebase";

export const config = {
  runtime: "edge",
};

const BORG_ID_SVG = (
  <svg
    width="140"
    height="47.86"
    viewBox="0 0 59 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    // style={{ width: "100%", }}
  >
    <g clip-path="url(#clip0_826_17144)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14 4H16V7.99999H22V16L16 16H14V4ZM16 14H20V9.99998H16V14ZM50 16L49.9999 18L50 20H48H44V18H48V16H42V7.99999H49.9999L50 16ZM34 7.99999H36H40V9.99999H36V16H34V7.99999ZM32 7.99999H24V16H32V7.99999ZM29.9999 9.99998H25.9999V14H29.9999V9.99998ZM48 9.99998H44V14H48V9.99998ZM6 6H4V8H6V6ZM9.99999 6H7.99999V8H9.99999V6ZM0 6H2V8H0V6ZM9.99999 9.99999H7.99999V12H9.99999V9.99999ZM7.99999 14H9.99999V16H7.99999V14ZM6 9.99999H4V12H6V9.99999ZM4 14H6V16H4V14ZM2 9.99999H0V12H2V9.99999ZM0 14H2V16H0V14Z"
        fill="black"
      />
      <path
        d="M52.324 1.59C52.002 1.59 51.883 1.436 51.883 1.233V1.121C51.883 0.918004 52.002 0.764004 52.324 0.764004C52.646 0.764004 52.765 0.918004 52.765 1.121V1.233C52.765 1.436 52.646 1.59 52.324 1.59ZM50.742 6V5.524H52.044V2.864H50.742V2.388H52.604V5.524H53.822V6H50.742ZM57.1722 6V5.412H57.1442C56.9132 5.853 56.5352 6.084 56.0312 6.084C55.1492 6.084 54.6172 5.377 54.6172 4.194C54.6172 3.011 55.1492 2.304 56.0312 2.304C56.5352 2.304 56.9132 2.535 57.1442 2.976H57.1722V0.820004H57.7322V6H57.1722ZM56.2482 5.587C56.7452 5.587 57.1722 5.328 57.1722 4.845V3.543C57.1722 3.06 56.7452 2.801 56.2482 2.801C55.5972 2.801 55.2192 3.235 55.2192 3.886V4.502C55.2192 5.153 55.5972 5.587 56.2482 5.587Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_826_17144">
        <rect width="58.5" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const regularFont = fetch(new URL("/public/fonts/Inter-Regular.ttf", import.meta.url)).then((res) =>
  res.arrayBuffer()
);

const boldFont = fetch(new URL("/public/fonts/Inter-Bold.ttf", import.meta.url)).then((res) =>
  res.arrayBuffer()
);

export default async function handler(request) {
  const [regularFontData, boldFontData] = await Promise.all([regularFont, boldFont]);

  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const photo = searchParams.get("p");
    const name = searchParams.get("n");
    const talks = searchParams.get("t");
    const role = searchParams.get("r");
    const company = searchParams.get("c");
    const advice_on = talks.split(",");
    console.log({ username, photo, name, advice_on, role, company });

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "#6EE7B7",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}>
          <div
            style={{
              display: "flex",
              borderRadius: "20px",
              background: "#fff",
              width: "100%",
              height: "100%",
            }}>
            <div
              style={{
                width: "33.3333%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                borderRight: "2px dashed #D1D5DB",
                padding: "40px 28px",
              }}>
              <div
                style={{
                  display: "flex",
                  width: "170px",
                  height: "170px",
                  marginBottom: "24px",
                  background: "#111",
                  color: "#fff",
                  borderRadius: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <img
                  src={`/${username}/avatar.png`}
                  style={{ borderRadius: "100%" }}
                  width="170"
                  height="170"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  color: "#111827",
                  textAlign: "center",
                  fontSize: "38px",
                  fontWeight: "bold",
                  lineHeight: "48px",
                }}>
                {name}
              </div>
              <div
                style={{
                  display: "flex",
                  color: "#111827",
                  textAlign: "center",
                  fontSize: "26px",
                  lineHeight: "32px",
                  fontWeight: "400",
                  marginTop: "14px",
                }}>
                {role}
              </div>
              <div
                style={{
                  display: "flex",
                  color: "#6B7280",
                  textAlign: "center",
                  fontSize: "26px",
                  fontWeight: "400",
                  marginTop: "6px",
                  lineHeight: "32px",
                }}>
                {company}
              </div>
            </div>

            <div
              style={{
                width: "66.6666%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                padding: "48px 52px",
              }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    textTransform: "uppercase",
                    fontSize: "38px",
                    fontWeight: "bold",
                    letterSpacing: "0.12em",
                    lineHeight: "48px",
                  }}>
                  Book a call
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "34px",
                    lineHeight: "44px",
                    marginTop: "4px",
                  }}>
                  to talk about:
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginTop: "24px",
                    height: "280px",
                    overflow: "hidden",
                  }}>
                  {advice_on?.slice(0, 6)?.map((item) => (
                    <div
                      style={{
                        display: "flex",
                        fontSize: "30px",
                        lineHeight: "36px",
                        border: "2px solid #E5E7EB",
                        padding: "10px 16px",
                        borderRadius: "20px",
                        textAlign: "left",
                        flexShrink: "0",
                        whiteSpace: "nowrap",
                      }}
                      key={item}>
                      {item?.slice(0, 35)}
                      {item?.length > 35 ? "..." : ""}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}>
                <div
                  style={{
                    alignSelf: "flex-end",
                    width: "140px",
                    display: "flex",
                    right: "-14px",
                    bottom: "-8px",
                  }}>
                  {BORG_ID_SVG}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: regularFontData,
            weight: 400,
          },
          {
            name: "Inter",
            data: boldFontData,
            weight: 700,
          },
        ],
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
