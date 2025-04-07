import { useTranslations } from "next-intl";
import { useState } from "react";

import Card from "./card/Card";
import styles from "./SocialPosts.module.scss";

const SocialPosts: React.FC = () => {
  const t = useTranslations("home.slide7");
  const [activeTab, setActiveTab] = useState<string>("tweets");

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList}>
        <button
          type="button"
          className={`body-1 ${styles.tab} ${activeTab === "tweets" ? styles.active : ""}`}
          onClick={() => setActiveTab("tweets")}
        >
          {t("socialPosts.tweets.heading")}
        </button>
        {/* <button
          type="button"
          className={`body-1 ${styles.tab} ${activeTab === 'streams' ? styles.active : ''}`}
          onClick={() => setActiveTab('streams')}
        >
          {t('socialPosts.streams.heading')}
        </button> */}
      </div>

      <div className={styles["tweets-component"]}>
        {activeTab === "tweets" && (
          <>
            <Card />
            <Card />
            <Card />
            <Card />
          </>
        )}
        {/* {activeTab === 'streams' && (
          <div>
            
          </div>
        )} */}
      </div>
    </div>
  );
};

export default SocialPosts;
