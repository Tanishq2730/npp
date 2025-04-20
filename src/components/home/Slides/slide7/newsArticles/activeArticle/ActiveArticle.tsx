import { useEffect, useRef, useState } from "react";

import styles from "./ActiveArticle.module.scss";

interface ActiveArticleProps {
  article: {
    date: string;
    title: string;
    description: string;
    image: string;
  };
  nextArticle: {
    date: string;
    title: string;
    description: string;
    image: string;
  } | null;
  transitioning: boolean;
  onTransitionEnd: () => void;
}

const ActiveArticle: React.FC<ActiveArticleProps> = ({
  article,
  nextArticle,
  transitioning,
  onTransitionEnd,
}) => {
  const [currentArticle, setCurrentArticle] = useState(article);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transitioning && nextArticle) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentArticle(nextArticle);
        setIsTransitioning(false);
        onTransitionEnd();
      }, 500);
    }
  }, [nextArticle, transitioning, onTransitionEnd]);

  return (
    <div className={styles["active-article-wrapper"]}>
      <div
        className={`${styles["active-article"]} ${isTransitioning ? styles["slide-out"] : ""}`}
        style={{ backgroundImage: `url(${currentArticle.image})` }}
        ref={articleRef}
      >
        <p className="body-2">{currentArticle.date}</p>
        <h3>{currentArticle.title}</h3>
        <p className="body-2">{currentArticle.description}</p>
      </div>
    </div>
  );
};

export default ActiveArticle;