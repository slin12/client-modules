import React from 'react';

import ContentContainer from '../ContentContainer';

import { footerData } from './FooterData';
import FooterLinks from './FooterLinks';
import Legal from './Legal';
import s from './styles/index.scss';

export type SiteFooterProps = {
  onClickCatalogLink: (payload: any) => void;
};

export const SiteFooter: React.FC<SiteFooterProps> = ({
  onClickCatalogLink,
}) => {
  const {
    urls: { legal, nav },
    filters,
  } = footerData;

  return (
    <div className={s.footerContainer} role="contentinfo">
      <ContentContainer>
        <FooterLinks
          urls={nav}
          filters={filters}
          onClickCatalogLink={onClickCatalogLink}
        />
      </ContentContainer>
      <div className={s.legalLocalDivider} />
      <ContentContainer>
        <div className={s.legalLocalContainer}>
          <Legal urls={legal} />
          <div className={s.madeIn}>
            Made with
            <span aria-label="love" className={s.helloFellowKids} role="img">
              ️❤️
            </span>
            in NYC ©{` ${new Date().getFullYear()} `}
            Codecademy
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};
