// GalleryTabs.tsx
import { ScrollArea, Tabs } from "@mantine/core";
import React from "react";

import styles from "./GalleryTabs.module.scss";

interface GalleryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (value: string | null) => void;
}

const GalleryTabs: React.FC<GalleryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <ScrollArea className={styles.scrollArea} scrollbarSize={6}>
     
      <Tabs
        value={activeCategory}
        onChange={onCategoryChange}
        classNames={{
          root: styles.tabsRoot,
          list: styles.tabsList,
          tab: styles.tab,
        }}
      >
        <Tabs.List>
          {categories.map((category) => (
            <Tabs.Tab key={category} value={category}>
              {category}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </ScrollArea>
  );
};

export default GalleryTabs;
