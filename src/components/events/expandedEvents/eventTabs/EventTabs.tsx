import { Tabs } from "@mantine/core";
import React from "react";

import styles from "./EventTabs.module.scss";

interface EventTabsProps {
  setActiveTab: (tab: string) => void;
}

const EventTabs: React.FC<EventTabsProps> = ({ setActiveTab }) => {
  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);
    }
  };

  return (
    <div className={styles.tabsContainer}>
      <Tabs
        defaultValue="images"
        classNames={{
          root: styles.tabsRoot,
          tab: styles.tab,
          list: styles.tabsList,
        }}
        onChange={handleTabChange}
      >
        <Tabs.List>
          <Tabs.Tab value="images">IMAGES</Tabs.Tab>
          <Tabs.Tab value="video">VIDEO</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </div>
  );
};

export default EventTabs;
