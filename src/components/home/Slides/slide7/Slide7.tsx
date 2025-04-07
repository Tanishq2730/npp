import { Tabs } from "@mantine/core";
import { useEffect, useState } from "react";
import { client } from "app/lib/sanity";


import ActiveArticle from "./newsArticles/activeArticle/ActiveArticle";
import NewsArticles from "./newsArticles/NewsArticles";
import styles from "./Slide7.module.scss";
import SocialPosts from "./socialPosts/SocialPosts";
import UpcomingEvents from "./upcomingEvents/UpcomingEvents";

interface Article {
  date: string;
  title: string;
  description: string;
  image: string;
}

const query = `
  *[_type == "pressRelease" && isHighlighted == true] | order(publishDate desc) {
    "date": publishDate,
    "title": title["en"],
    "description": summary["en"],
    "image": featuredImage.asset->url,
    "id": _id
  }
`;

const NewsComponent: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [nextArticle, setNextArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch articles from Sanity
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await client.fetch(query);
        if (data.length > 0) {
          setArticles(data);
          setActiveArticle(data[0]); // Set first article as default
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (article: Article) => {
    setNextArticle(article);
    setTransitioning(true);
  };

  const handleTransitionEnd = () => {
    if (transitioning) {
      setActiveArticle(nextArticle!);
      setNextArticle(null);
      setTransitioning(false);
    }
  };

  useEffect(() => {
    if (articles.length === 0) return;

    const interval = setInterval(() => {
      const currentIndex = articles.findIndex(
        (a) => a.title === activeArticle?.title
      );
      const nextIndex = (currentIndex + 1) % articles.length;
      handleArticleClick(articles[nextIndex]!);
    }, 2250);

    return () => clearInterval(interval);
  }, [activeArticle, articles]);

  if (loading) return <p>Loading articles...</p>;

  return (
    <>
      <div className={styles["slide7-desktop"]}>
        <div className={styles["news-component"]}>
          <div className={styles["socialMedia-events-container"]}>
            <SocialPosts />
            <UpcomingEvents />
          </div>
          <NewsArticles
            setActiveArticle={handleArticleClick}
            articles={articles}
            numOfSlides={3}
            pagination={false}
          />
        </div>
        {activeArticle && (
          <ActiveArticle
            article={activeArticle}
            nextArticle={nextArticle}
            transitioning={transitioning}
            onTransitionEnd={handleTransitionEnd}
          />
        )}
      </div>

      <Tabs defaultValue="news" className={styles["slide7-mobile"]}>
        <Tabs.List className={styles.header}>
          <Tabs.Tab value="news">News Articles</Tabs.Tab>
          <Tabs.Tab value="social">Social Streams</Tabs.Tab>
          <Tabs.Tab value="events">Upcoming Events</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="news">
          <NewsArticles
            setActiveArticle={handleArticleClick}
            articles={articles}
            numOfSlides={1}
            pagination
          />
        </Tabs.Panel>

        <Tabs.Panel
          value="social"
          className={styles["socialMedia-events-container"]}
        >
          <SocialPosts />
        </Tabs.Panel>

        <Tabs.Panel value="events">
          <UpcomingEvents />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default NewsComponent;
