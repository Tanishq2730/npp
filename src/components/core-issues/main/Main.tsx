import { useTranslations } from "next-intl";
import { useEffect } from "react";

import styles from "./Main.module.scss";

interface MainProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

type Tab =
  | "agriculture"
  | "energy"
  | "education"
  | "environment"
  | "healthcare"
  | "promoting_northeast"
  | "women"
  | "youth";

const tabList: Tab[] = [
  "agriculture",
  "energy",
  "education",
  "environment",
  "healthcare",
  "promoting_northeast",
  "women",
  "youth",
];

const Main: React.FC<MainProps> = ({ activeTab, onTabChange }) => {
  const t = useTranslations("core_issues");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Tab;
      if (hash && tabList.includes(hash)) {
        onTabChange(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Check hash on initial load

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [onTabChange]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--main-background-image",
      `url(${t(`${activeTab}.images.main`)})`,
    );
  }, [activeTab, t]);

  const handleTabClick = (tab: Tab) => {
    onTabChange(tab);
    window.location.hash = tab;
  };

  return (
    <div className={styles.main}>
      <div className={styles["issues-tab"]}>
        <div className={styles["issues-list"]}>
          <h2>{t("title")}</h2>
          {tabList.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabClick(tab)}
              className={`body-2 ${activeTab === tab ? styles.active : ""}`}
            >
              {t(`tabs.${tab}`)}
            </button>
          ))}
        </div>

        <div className={styles["active-issue"]}>
          <h2>{t(`tabs.${activeTab}`)}</h2>
          <p className="subheading-2">{t(`${activeTab}.description`)}</p>
        </div>
      </div>
      <div className={styles.overview}>
        <div className={styles["overview-content"]}>
          <h2>{t("overview")}</h2>
          <p className="body-3">{t(`${activeTab}.overviewText`)}</p>
        </div>
      </div>
      <div className={styles.scroll}>
        <div>
          <i className="tabler-icon tabler-icon-chevron-down" />
          <p className="subheaing-2">{t("scroll")}</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
