import "swiper/css";
import "swiper/css/pagination"; // Import Swiper pagination styles

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useRef } from "react";
import type SwiperClass from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ArticleCard from "./articleCard/ArticleCard";
import styles from "./NewsArticles.module.scss";

interface Article {
  date: string;
  title: string;
  description: string;
  image: string;
}

interface NewsArticlesProps {
  setActiveArticle: (article: Article) => void;
  articles: Article[];
  numOfSlides: number;
  pagination: boolean;
}

interface ClickableSlideProps {
  article: Article;
  setActiveArticle: (article: Article) => void;
  index: number;
  swiper: SwiperClass | null;
  large: boolean;
}

const ClickableSlide = ({
  article,
  setActiveArticle,
  index,
  swiper,
  large,
}: ClickableSlideProps) => {
  const handleClick = () => {
    if (swiper) {
      swiper.slideToLoop(index);
      setActiveArticle(article);
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Slide to article ${article.title}`}
    >
      <ArticleCard
        article={article}
        setActiveArticle={setActiveArticle}
        large={large}
        showText={false}
      />
    </div>
  );
};

export default function NewsArticles({
  setActiveArticle,
  articles,
  numOfSlides,
  pagination,
}: NewsArticlesProps) {
  const swiperRef = useRef<SwiperClass | null>(null);

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
      const currentIndex = swiperRef.current.realIndex;
      setActiveArticle(articles[currentIndex]!);
    }
  };

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
      const currentIndex = swiperRef.current.realIndex;
      setActiveArticle(articles[currentIndex]!);
    }
  };

  return (
    <div className={styles["news-articles-container"]}>
      <h4>News Articles</h4>

      <Swiper
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        pagination={pagination ? { clickable: true } : false}
        slidesPerView={numOfSlides}
        loop
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {articles.map((article, index) => (
          <SwiperSlide key={article.title}>
            {({ isActive }) => (
              <ClickableSlide
                article={article}
                setActiveArticle={setActiveArticle}
                index={index}
                swiper={swiperRef.current}
                large={isActive}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.controls}>
        <div
          onClick={slidePrev}
          role="button"
          tabIndex={0}
          onKeyDown={slidePrev}
          aria-label="Previous slide"
        >
          <IconArrowLeft color="rgba(235, 238, 243, 1)" />
        </div>
        <div
          onClick={slideNext}
          role="button"
          tabIndex={0}
          onKeyDown={slideNext}
          aria-label="Next slide"
        >
          <IconArrowRight color="rgba(235, 238, 243, 1)" />
        </div>
      </div>
    </div>
  );
}