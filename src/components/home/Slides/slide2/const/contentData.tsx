import { useTranslations } from "next-intl";

export type YearType =
  | "default"
  | "2013"
  | "2014"
  | "2016"
  | "2018"
  | "2019"
  | "2023"
  | "2024";

export interface ContentText {
  title: string;
  subtitle: string;
  description: string;
}

export interface ContentData {
  backgroundImage: string;
  contentText: ContentText;
}

export const useContentData = (): Record<YearType, ContentData> => {
  const t = useTranslations("home.slide2");

  return {
    default: {
      backgroundImage: t("default.backgroundImage"),
      contentText: {
        title: t("default.contentText.title"),
        subtitle: t("default.contentText.subtitle"),
        description: t("default.contentText.description"),
      },
    },
    "2013": {
      backgroundImage: t("2013.backgroundImage"),
      contentText: {
        title: t("2013.contentText.title"),
        subtitle: t("2013.contentText.subtitle"),
        description: t("2013.contentText.description"),
      },
    },
    "2014": {
      backgroundImage: t("2014.backgroundImage"),
      contentText: {
        title: t("2014.contentText.title"),
        subtitle: t("2014.contentText.subtitle"),
        description: t("2014.contentText.description"),
      },
    },
    "2016": {
      backgroundImage: t("2016.backgroundImage"),
      contentText: {
        title: t("2016.contentText.title"),
        subtitle: t("2016.contentText.subtitle"),
        description: t("2016.contentText.description"),
      },
    },
    "2018": {
      backgroundImage: t("2018.backgroundImage"),
      contentText: {
        title: t("2018.contentText.title"),
        subtitle: t("2018.contentText.subtitle"),
        description: t("2018.contentText.description"),
      },
    },
    "2019": {
      backgroundImage: t("2019.backgroundImage"),
      contentText: {
        title: t("2019.contentText.title"),
        subtitle: t("2019.contentText.subtitle"),
        description: t("2019.contentText.description"),
      },
    },
    "2023": {
      backgroundImage: t("2023.backgroundImage"),
      contentText: {
        title: t("2023.contentText.title"),
        subtitle: t("2023.contentText.subtitle"),
        description: t("2023.contentText.description"),
      },
    },
    "2024": {
      backgroundImage: t("2024.backgroundImage"),
      contentText: {
        title: t("2024.contentText.title"),
        subtitle: t("2024.contentText.subtitle"),
        description: t("2024.contentText.description"),
      },
    },
  };
};
