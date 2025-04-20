import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./CoreIssues.module.scss";
import Details from "./details/Details";
import Main from "./main/Main";

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

export default function CoreIssues() {
  const [activeTab, setActiveTab] = useState<Tab>("agriculture");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Tab;
      if (hash && tabList.includes(hash)) {
        setActiveTab(hash);
      }
    };

    // Handle the initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Clean up the event listener
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // This effect runs when the pathname or searchParams change
  useEffect(() => {
    const hash = window.location.hash.slice(1) as Tab;
    if (hash && tabList.includes(hash)) {
      setActiveTab(hash);
    }
  }, [pathname, searchParams]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    // Update the URL without triggering a navigation
    window.history.pushState(null, "", `${pathname}#${tab}`);
  };

  return (
    <div className={` ${styles["core-issues"]}`}>
      <Main activeTab={activeTab} onTabChange={handleTabChange} />
      <Details activeTab={activeTab} />
    </div>
  );
}
