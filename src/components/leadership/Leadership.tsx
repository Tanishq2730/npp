import { useMediaQuery } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";

import GenericCardSlider from "../shared/genericCardSlider/GenericCardSlider";
import SmoothScrollContainer from "../shared/smoothScrollContainer/SmoothScrollContainer";
import Founder from "./founder/Founder";
import styles from "./Leadership.module.scss";

interface LeadershipCard {
  name: string;
  post: string;
  imgPath: string;
  route: string;
}

const Leadership: React.FC = () => {
  const t = useTranslations("leadership");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const params = useParams();

  const locale = params.locale as string;
  const cardsData: LeadershipCard[] = t.raw("cards") as LeadershipCard[];
  // Extract the dynamic year parameter

  const adjustedCardsData = cardsData.map((card) => ({
    title: card.name,
    backgroundImgPath: card.imgPath,
    subtitle: card.post,
    route: `/${locale}${card.route}`, // Append the locale to the route
    onClick: () => {
      router.push(`/${locale}${card.route}`);
    },
  }));

  const firstRowCards = adjustedCardsData.slice(0, 3);
  const secondRowCards = adjustedCardsData.slice(3, 6);

  return (
    <div className={`md:container md:mx-auto ${styles.leadership}`}>
      <SmoothScrollContainer showPagination={!isMobile}>
        <Founder />
        <GenericCardSlider cards={firstRowCards} />
        <GenericCardSlider cards={secondRowCards} />
      </SmoothScrollContainer>
    </div>
  );
};

export default Leadership;
