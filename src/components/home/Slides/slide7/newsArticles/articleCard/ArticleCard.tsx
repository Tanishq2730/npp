import { Card } from "@mantine/core";
import Image from "next/image";

import styles from "./ArticleCard.module.scss";

interface Article {
  date: string;
  title: string;
  description: string;
  image: string;
}

interface ArticleCardProps {
  article: Article;
  setActiveArticle: (article: Article) => void;
  large: boolean;
  showText: boolean;
}

export default function ArticleCard({
  article,
  setActiveArticle,
  large,
  showText,
}: ArticleCardProps) {
  const handleClick = () => {
    setActiveArticle(article);
  };

  return (
    <Card
      className={`${styles.article} ${large ? styles.active : ""} ${showText ? styles["large-card"] : styles["small-card"]}`}
      onClick={handleClick}
    >
      <Image
        src={article.image}
        alt={article.title}
        width={large ? 530 : 265}
        height={large ? 356 : 178}
      />
      <div className={styles.text}>
        <p className={`body-4 ${styles.date}`}>{article.date}</p>
        <p className={`subheading-6 ${styles.title}`}>{article.title}</p>
        <p className={`body-4 ${styles.description}`}>{article.description}</p>
      </div>
    </Card>
  );
}