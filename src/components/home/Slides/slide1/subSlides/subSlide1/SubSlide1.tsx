import { useTranslations } from "next-intl";

import styles from "./SubSlide1.module.scss";

const SubSlide1 = () => {
  const t = useTranslations();

  return (
    <div className={`${styles.subslide1}`}>
      <div className={`${styles.text} bannerslide1`}>
        
        <hr />
      </div>
      <div className={styles.map}>
        <div className={styles.leader}>
        </div>
      </div>
    </div>
  );
};

export default SubSlide1;
