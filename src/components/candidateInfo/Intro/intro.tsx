import React from "react";
import styles from "./intro.module.scss";

// Define the interface for props
interface IntroProps {
  title: string;
  subtitle: string;
  description: string;
}

// Define the JSON data with proper type annotation
const infoData: IntroProps = {
  title: "C7 Form LS, MP Candidates",
  subtitle:
    "Meet the National People’s Party (NPP) leaders contesting for Lok Sabha and Member of Parliament positions. All the candidates are not only different in their qualities, experience, and commitment to transforming society to build a better future for our nation.",
  description: `Our candidates are responsible for being voted into power to champion your voice, defending rights, or interests in areas you consider important in your constituency. Instead of thinking locally, they are thinking about the solutions they are providing to make the country and people of this country progress. These people have a rich and diverse experience, as members of our board of directors, and they all have successful careers behind them; these individuals are honest, creative and truly passionate about the communities we work with.`,
};

// Functional component for Intro
const Intro: React.FC<IntroProps> = ({ title, subtitle, description }) => {
  return (
    <div className={styles.intro}>
      <div className={styles["intro-content"]}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

// Main CandidateInfo component
const CandidateInfo: React.FC = () => {
  return <Intro {...infoData} />;
};

export default CandidateInfo;
