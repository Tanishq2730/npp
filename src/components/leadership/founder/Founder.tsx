import Image from "next/image";
import { useTranslations } from "next-intl";

import styles from "./Founder.module.scss";
import { useSearchParams } from "next/navigation";
import { getDataByYear } from "./YearData";

const Founder = () => {
  const t = useTranslations();
  
 const searchParams = useSearchParams();
  const year = searchParams.get("year")??"default";
  console.log(year)
  const result = getDataByYear(year);
  console.log(result)
  return (
    <div className={styles.founder}>
    
      <div className={styles["page-title"]}>
        <div className={styles["page-title-line-container1"]}>
          {/* <Image
            src="/static/images/leadership/founder/flagLarge.png"
            alt="Indian Flag"
            width={141}
            height={51}
          /> */}
          <h1>{t("leadership.founder.pageTitle.keyPeople")}</h1>
        </div>
        <div className={styles["page-title-line-container2"]}>
          <h1>{t("leadership.founder.pageTitle.leaders")}</h1>
          {/* <Image
            src="/static/images/leadership/founder/flagSmall.png"
            alt="Indian Flag"
            width={64}
            height={51}
          /> */}
        </div>
      </div>
      <div className={styles["page-content"]}>
        <Image
          src="/static/images/leadership/founder/founder.png"
          alt={t("leadership.founder.imgAlt")}
          width={661.53}
          height={601.99}
        />
        <div className={styles["text-content"]}>
          
          <h1>{t("leadership.founder.founderName")}</h1>
          <h5 className="subheading-1">
            {t("leadership.founder.founderPost")}
          </h5>
          {/* <p>{t("leadership.founder.founderDescription")}</p> */}
          <p>{getDataByYear(year)}</p>
        </div>
      </div>
    </div>
  );
};

export default Founder;
