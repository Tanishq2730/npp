import Intro from "@/components/candidateInfo/Intro/intro";

import styles from "./CandidateInfo.module.scss";
import TabsComponent from "./tabs/Tabs";

const CandidateInfo: React.FC = () => {
  return (
    <div className={`md:container md:mx-auto ${styles.candidateInfo}`}>
      <Intro />
      <TabsComponent />
    </div>
  );
};

export default CandidateInfo;
