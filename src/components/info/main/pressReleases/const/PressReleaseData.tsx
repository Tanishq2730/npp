import { useTranslations } from "next-intl";

export interface PressRelease {
  heading: string;
  details: string;
  imgPath: string;
  articleLink: string;
}

export const usePressReleaseData = (): PressRelease[] => {
  const t = useTranslations(
    "infoPage.people.conradSangma.pressReleasesComponent",
  );

  return [
    {
      heading: t("card1.headline"),
      details: t("card1.details"),
      imgPath: "/static/images/info/pressReleases/pressRelease1.png",
      articleLink: "/",
    },
    {
      heading: t("card2.headline"),
      details: t("card2.details"),
      imgPath: "/static/images/info/pressReleases/pressRelease2.png",
      articleLink: "/",
    },
    {
      heading: t("card3.headline"),
      details: t("card3.details"),
      imgPath: "/static/images/info/pressReleases/pressRelease3.png",
      articleLink: "/",
    },
    {
      heading: t("card4.headline"),
      details: t("card4.details"),
      imgPath: "/static/images/info/pressReleases/pressRelease4.png",
      articleLink: "/",
    },
    {
      heading: t("card5.headline"),
      details: t("card5.details"),
      imgPath: "/static/images/info/pressReleases/pressRelease5.png",
      articleLink: "/",
    },
    {
      heading: t("card6.headline"),
      details: t("card6.details"),
      imgPath: "/static/images/info/pressReleases/pressRelease6.png",
      articleLink: "/",
    },
  ];
};
