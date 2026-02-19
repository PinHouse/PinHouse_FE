import { SVGProps } from "react";

interface ResultBannerImgProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

const ResultBannerImg = ({ width = 96, height = 96, ...props }: ResultBannerImgProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M48.8273 75.8059L52.6109 62.0161H42.4414L46.2251 75.8059C46.5892 77.1313 48.4622 77.1313 48.8264 75.8059H48.8273Z"
        fill="url(#paint0_linear_10635_91474)"
      />
      <path
        d="M69.4191 5.23633H25.6389C22.4955 5.23633 20.2189 8.24518 21.0646 11.2835L29.2749 40.7903C29.7748 42.5861 29.7628 44.4868 29.2418 46.277L25.4169 59.4003C24.9289 61.0746 26.2158 62.7396 27.9971 62.7396H67.0609C68.8422 62.7396 70.1291 61.0746 69.6411 59.4003L65.8162 46.277C65.2943 44.4868 65.2832 42.5861 65.7831 40.7903L73.9934 11.2835C74.8391 8.24518 72.5625 5.23633 69.4191 5.23633Z"
        fill="url(#paint1_linear_10635_91474)"
      />
      <path
        d="M47.5646 24.4364C48.7696 24.4364 49.7464 23.4596 49.7464 22.2546C49.7464 21.0496 48.7696 20.0728 47.5646 20.0728C46.3596 20.0728 45.3828 21.0496 45.3828 22.2546C45.3828 23.4596 46.3596 24.4364 47.5646 24.4364Z"
        fill="url(#paint2_linear_10635_91474)"
      />
      <path
        d="M54.5451 20.9457C55.7501 20.9457 56.7269 19.9688 56.7269 18.7638C56.7269 17.5589 55.7501 16.582 54.5451 16.582C53.3401 16.582 52.3633 17.5589 52.3633 18.7638C52.3633 19.9688 53.3401 20.9457 54.5451 20.9457Z"
        fill="#2E293D"
      />
      <path
        d="M40.1467 20.9457C41.3516 20.9457 42.3285 19.9688 42.3285 18.7638C42.3285 17.5589 41.3516 16.582 40.1467 16.582C38.9417 16.582 37.9648 17.5589 37.9648 18.7638C37.9648 19.9688 38.9417 20.9457 40.1467 20.9457Z"
        fill="#2E293D"
      />
      <path
        d="M51.8127 25.9338C52.2958 25.2425 53.2478 25.0736 53.9391 25.5566C54.6306 26.0398 54.7994 26.9921 54.3163 27.6835C52.8276 29.8138 50.3102 31.1974 47.4776 31.1974C44.6454 31.1974 42.1275 29.815 40.6386 27.6831C40.1556 26.9915 40.3246 26.0396 41.0161 25.5566C41.7076 25.0737 42.6596 25.2427 43.1425 25.9342C44.0641 27.2538 45.6503 28.1429 47.4776 28.1429C49.3045 28.1428 50.8909 27.253 51.8127 25.9338Z"
        fill="#2E293D"
      />
      <path
        d="M73.1524 30.2818C74.0142 27.1466 77.4584 25.4757 80.5577 26.4665C83.657 27.4574 85.3667 30.7708 84.3751 33.8676C83.3835 36.9644 80.0673 38.6728 76.968 37.682C73.8687 36.6911 72.1727 33.8484 73.1524 30.2818Z"
        fill="url(#paint3_linear_10635_91474)"
      />
      <path
        d="M25.586 43.3726C26.4477 40.2374 29.8919 38.5665 32.9913 39.5573C36.0906 40.5482 37.8003 43.8616 36.8087 46.9584C35.8171 50.0553 32.5009 51.7636 29.4016 50.7728C26.3023 49.782 24.6063 46.9392 25.586 43.3726Z"
        fill="url(#paint4_linear_10635_91474)"
      />
      <ellipse cx="48.0018" cy="88.1454" rx="21.8182" ry="4.36364" fill="#EFEFF3" />
      <defs>
        <linearGradient
          id="paint0_linear_10635_91474"
          x1="47.5262"
          y1="62.0161"
          x2="47.5262"
          y2="76.7999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBA18" />
          <stop offset="1" stopColor="#FFE17F" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_10635_91474"
          x1="47.529"
          y1="5.23633"
          x2="47.529"
          y2="62.7396"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#618EFF" />
          <stop offset="0.0569536" stopColor="#306FFF" />
          <stop offset="0.629808" stopColor="#6E97FF" />
          <stop offset="1" stopColor="#ACC0FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_10635_91474"
          x1="47.5646"
          y1="20.0728"
          x2="47.5646"
          y2="24.4364"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDA6B" />
          <stop offset="1" stopColor="#FFF4D7" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_10635_91474"
          x1="78.7659"
          y1="26.1816"
          x2="78.7659"
          y2="37.9635"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBA18" />
          <stop offset="1" stopColor="#FFE17F" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_10635_91474"
          x1="31.1995"
          y1="39.2725"
          x2="31.1995"
          y2="51.0543"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBA18" />
          <stop offset="1" stopColor="#FFE17F" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ResultBannerImg;
