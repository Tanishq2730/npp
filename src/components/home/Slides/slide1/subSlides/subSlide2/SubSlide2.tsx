

import { useTranslations } from "next-intl";
import styles from "./SubSlide2.module.scss";

export default function SubSlide2() {
const t = useTranslations();

  return (
    <div className={styles.subSlide2}>
      <div className={styles.content}>
        <div className={styles.image} />
        <div className={styles.text}>
          <h1 className="name">
            <span>{t("home.slide1.subSlide2.title").split("  ")[0]} </span>
            <br />
            <span>{t("home.slide1.subSlide2.title").split("  ")[1]} </span>
            <span>{t("home.slide1.subSlide2.title").split("  ")[2]}</span>
          </h1>
        </div>
        
      </div>
    </div>
  );
}
