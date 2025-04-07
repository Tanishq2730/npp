import { useTranslations } from "next-intl";

import GenericCardSlider from "@/components/shared/genericCardSlider/GenericCardSlider";

interface CardData {
  title: string;
  backgroundImgPath: string;
  route: string;
  subtitle?: string;
}

export default function Slide4() {
  const t = useTranslations("home");

  const cardProps: CardData[] = t.raw("slide4") as CardData[];

  return <GenericCardSlider cards={cardProps} />;
}
