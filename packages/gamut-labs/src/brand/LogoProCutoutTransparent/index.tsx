import React from 'react';
import { colors } from '@codecademy/gamut-styles';

export type LogoProCutoutTransparent = {
  backgroundColor?: string;
  width?: number;
};

export const LogoProCutoutTransparent: React.FC<LogoProCutoutTransparent> = ({
  backgroundColor = colors.navy,
  width = 30,
}) => (
  <svg
    width={width}
    height={(8 / 15) * width}
    viewBox="0 0 30 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.698 7.16199C6.474 7.37665 6.15666 7.48401 5.746 7.48401H3.94V4.88H5.746C6.15666 4.88 6.474 4.9873 6.698 5.20203C6.922 5.41669 7.034 5.74335 7.034 6.18201C7.034 6.62067 6.922 6.94733 6.698 7.16199Z"
      fill={backgroundColor}
    />
    <path
      d="M14.8975 6.82599C14.6922 7.00336 14.4122 7.09198 14.0575 7.09198H12.2935V4.88H14.0575C14.4122 4.88 14.6922 4.96869 14.8975 5.146C15.1028 5.3233 15.2055 5.60333 15.2055 5.98602C15.2055 6.36865 15.1028 6.64868 14.8975 6.82599Z"
      fill={backgroundColor}
    />
    <path
      d="M24.1246 11.082C23.7139 11.3153 23.2519 11.432 22.7386 11.432C22.2253 11.432 21.7586 11.3153 21.3386 11.082C20.9279 10.8394 20.5966 10.4706 20.3446 9.97601C20.0926 9.47198 19.9666 8.84668 19.9666 8.09998C19.9666 7.35333 20.0926 6.73267 20.3446 6.23798C20.5966 5.73401 20.9279 5.36536 21.3386 5.13202C21.7586 4.88934 22.2253 4.76801 22.7386 4.76801C23.2519 4.76801 23.7139 4.88934 24.1246 5.13202C24.5446 5.36536 24.8806 5.73401 25.1326 6.23798C25.3846 6.73267 25.5106 7.35333 25.5106 8.09998C25.5106 8.84668 25.3846 9.47198 25.1326 9.97601C24.8806 10.4706 24.5446 10.8394 24.1246 11.082Z"
      fill={backgroundColor}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30 0H0V16H30V0ZM8.09801 4.026C7.57533 3.47534 6.81467 3.20001 5.81599 3.20001H2.12V13H3.94V9.164H5.81599C6.81467 9.164 7.57533 8.89331 8.09801 8.35199C8.62067 7.80133 8.882 7.078 8.882 6.18201C8.882 5.28601 8.62067 4.56732 8.09801 4.026ZM16.2415 3.96997C15.7282 3.45667 14.9955 3.20001 14.0435 3.20001H10.4735V13H12.2935V8.77197H13.2455L15.8775 13H17.9075L15.1915 8.61798C15.7795 8.44067 16.2322 8.12335 16.5495 7.66602C16.8669 7.19934 17.0255 6.63934 17.0255 5.98602C17.0255 5.146 16.7642 4.474 16.2415 3.96997ZM20.4146 12.552C21.1146 12.9254 21.8893 13.112 22.7386 13.112C23.5879 13.112 24.3626 12.9254 25.0626 12.552C25.7626 12.1786 26.3179 11.6187 26.7286 10.872C27.1486 10.116 27.3586 9.19202 27.3586 8.09998C27.3586 7.008 27.1486 6.08868 26.7286 5.34198C26.3179 4.586 25.7626 4.02136 25.0626 3.64801C24.3626 3.27466 23.5879 3.08801 22.7386 3.08801C21.8893 3.08801 21.1146 3.27466 20.4146 3.64801C19.7146 4.02136 19.1546 4.586 18.7346 5.34198C18.3239 6.08868 18.1186 7.008 18.1186 8.09998C18.1186 9.19202 18.3239 10.116 18.7346 10.872C19.1546 11.6187 19.7146 12.1786 20.4146 12.552Z"
      fill={backgroundColor}
    />
  </svg>
);
