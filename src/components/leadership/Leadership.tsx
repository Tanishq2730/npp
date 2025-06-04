import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "../shared/genericCardSlider/card/Card";
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
  const router = useRouter();
  const params = useParams();

  const locale = params.locale as string;
  const cardsData: LeadershipCard[] = t.raw("cards") as LeadershipCard[];

  const adjustedCardsData = cardsData.map((card) => ({
    title: card.name,
    backgroundImgPath: card.imgPath,
    subtitle: card.post,
    route: `/${locale}${card.route}`,
  }));

  const firstRowCards = adjustedCardsData.slice(0, 3);
  const secondRowCards = adjustedCardsData.slice(3, 6);

  return (
    <div className={`md:container md:mx-auto ${styles.leadership}`}>
      <div>
        <Founder />
        <div className="mt-8">
          <div className="row">
            {firstRowCards.map((card, index) => (
              <div key={`first-${index}`} className="col-md-4">
                <div className="leadership-card">
                <Card {...card} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <div className="row">
            {secondRowCards.map((card, index) => (
              <div key={`second-${index}`} className="col-md-4">
                <div className="leadership-card">
                <Card {...card} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership;