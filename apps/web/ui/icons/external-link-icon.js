import { cx } from "class-variance-authority";

const ExternalLinkIcon = ({ weight = "normal", size = 8, className }) => {
  const lightIcon = (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clipRule="evenodd"
        d="M5.875 1.25C5.875 1.04289 6.04289 0.875 6.25 0.875H8.75C8.95711 0.875 9.125 1.04289 9.125 1.25V3.75C9.125 3.95711 8.95711 4.125 8.75 4.125C8.54289 4.125 8.375 3.95711 8.375 3.75V2.15533L4.51517 6.01516C4.36872 6.16161 4.13128 6.16161 3.98483 6.01516C3.83839 5.86872 3.83839 5.63128 3.98483 5.48484L7.84467 1.625H6.25C6.04289 1.625 5.875 1.45711 5.875 1.25ZM2.25 3.125C1.90482 3.125 1.625 3.40482 1.625 3.75V7.75C1.625 8.09518 1.90482 8.375 2.25 8.375H6.25C6.59518 8.375 6.875 8.09518 6.875 7.75V4.93182C6.875 4.72471 7.04289 4.55682 7.25 4.55682C7.45711 4.55682 7.625 4.72471 7.625 4.93182V7.75C7.625 8.50939 7.00939 9.125 6.25 9.125H2.25C1.49061 9.125 0.875 8.50939 0.875 7.75V3.75C0.875 2.99061 1.49061 2.375 2.25 2.375H5.06818C5.27529 2.375 5.44318 2.54289 5.44318 2.75C5.44318 2.95711 5.27529 3.125 5.06818 3.125H2.25Z"
        fill="currentColor"
      />
    </svg>
  );

  const normalIcon = (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.25 1.75C5.97386 1.75 5.75 1.52614 5.75 1.25C5.75 0.973858 5.97386 0.75 6.25 0.75H8.75C9.02614 0.75 9.25 0.973858 9.25 1.25V3.75C9.25 4.02614 9.02614 4.25 8.75 4.25C8.47386 4.25 8.25 4.02614 8.25 3.75V2.45711L4.60355 6.10355C4.40829 6.29882 4.09171 6.29882 3.89645 6.10355C3.70118 5.90829 3.70118 5.59171 3.89645 5.39645L7.54289 1.75H6.25ZM2.25 3.25C1.97386 3.25 1.75 3.47386 1.75 3.75V7.75C1.75 8.02614 1.97386 8.25 2.25 8.25H6.25C6.52614 8.25 6.75 8.02614 6.75 7.75V4.93182C6.75 4.65568 6.97386 4.43182 7.25 4.43182C7.52614 4.43182 7.75 4.65568 7.75 4.93182V7.75C7.75 8.57843 7.07843 9.25 6.25 9.25H2.25C1.42157 9.25 0.75 8.57843 0.75 7.75V3.75C0.75 2.92157 1.42157 2.25 2.25 2.25H5.06818C5.34432 2.25 5.56818 2.47386 5.56818 2.75C5.56818 3.02614 5.34432 3.25 5.06818 3.25H2.25Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className={cx(className)}>
      <div>{weight === "light" ? lightIcon : normalIcon}</div>
    </div>
  );
};

export default ExternalLinkIcon;
