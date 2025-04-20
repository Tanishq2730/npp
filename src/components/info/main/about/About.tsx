import { useTranslations } from "next-intl";

import AboutPart from "@/components/shared/aboutPart/AboutPart";

export default function About() {
  const t = useTranslations("infoPage.people.conradSangma.aboutComponent");

  return (
    <AboutPart
      imgSrc="/static/images/info/about.png"
      imgAlt={t("imgAlt")}
      title={t("title")}
      description={t("description")}
      buttonText={t("join")}
      showReadMore
    />
  );
}
