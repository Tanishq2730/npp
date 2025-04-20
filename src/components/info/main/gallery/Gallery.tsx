import Image from "next/image";
import { useTranslations } from "next-intl";

import ImageSlider from "@/components/shared/imageSlider/ImageSlider";

import styles from "./Gallery.module.scss";

export default function Gallery() {
  const t = useTranslations("infoPage.people.conradSangma.galleryComponent");

  return (
    <div className={styles.gallery}>
      <div className={styles.heading}>
        <Image
          src="/static/images/home/home6/logo.png"
          alt="NPP Logo"
          width={48}
          height={70}
        />
        <h2>{t("title")}</h2>
      </div>
      <ImageSlider
        currentSlideWidth={620}
        currentSlideHeight={350}
        containerHeight={380}
        images={[]}
      />
    </div>
  );
}
