import { useTranslations } from "next-intl";

export interface Card {
  name: string;
  post: string;
  imgPath: string;
}

export const useCardData = (): Card[] => {
  const t = useTranslations("leadership.cards");

  return [
    {
      name: t("card1.name"),
      post: t("card1.post"),
      imgPath: t("card1.imgPath"),
    },
    {
      name: t("card2.name"),
      post: t("card2.post"),
      imgPath: t("card2.imgPath"),
    },
    {
      name: t("card3.name"),
      post: t("card3.post"),
      imgPath: t("card3.imgPath"),
    },
    {
      name: t("card4.name"),
      post: t("card4.post"),
      imgPath: t("card4.imgPath"),
    },
    {
      name: t("card5.name"),
      post: t("card5.post"),
      imgPath: t("card5.imgPath"),
    },
    {
      name: t("card6.name"),
      post: t("card6.post"),
      imgPath: t("card6.imgPath"),
    },
  ];
};
