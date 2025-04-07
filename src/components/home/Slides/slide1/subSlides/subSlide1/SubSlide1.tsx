import Image from "next/image";
import { useTranslations } from "next-intl";

import styles from "./SubSlide1.module.scss";

const SubSlide1 = () => {
  const t = useTranslations();

  return (
    <div className={styles.subslide1}>
      <div className={styles.text}>
        <div className="name">
  
          <span style={{ color: "rgba(255, 182, 60, 1)" }}>
            {t("home.slide1.subSlide1.title").split("  ")[0]?.split(" ")[0]}{" "}
          </span>
          <span>
            {t("home.slide1.subSlide1.title").split("  ")[0]?.split(" ")[1]}
          </span>
          <br />
          <span style={{ color: "rgba(79, 180, 63, 1)" }}>
            {t("home.slide1.subSlide1.title").split("  ")[1]?.split(" ")[0]}{" "}
          </span>
          <span>
            {t("home.slide1.subSlide1.title").split("  ")[1]?.split(" ")[1]}
          </span>
        </div>
        <div className={styles.subtitle}>
          <p />
          <p className={`subheading-2 ${styles.subtitleText}`}>
            {t("home.slide1.subSlide1.subtitle")}
          </p>
          <p />
        </div>
        <hr />
      </div>
      <div className={styles.map}>
        <div className={styles.leader}>
          <Image
            src="/static/images/home/home1/leader1.png"
            alt="Our Leader"
            width={645}
            height={775}
          />
        </div>
      </div>
    </div>
  );
};

export default SubSlide1;
