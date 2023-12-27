import React from 'react';
import Card from '../Card';
import styles from './sliderComponent.module.scss';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

function SliderComponent({ data, blogId, blogCategories }) {
  const filteredData = data?.filter((el) => {
    if (el.id === blogId) {
      return false;
    }
    const categories = blogCategories;
    return el.categories?.some((category) => categories?.some((selectedCategory) => selectedCategory.title === category.title));
  });
  const gotoBlog = (target, id) => {
    if (target.classList.contains('link-text')) {
      window.location.reload();
      return;
    }
  };
  return (
    <CarouselProvider visibleSlides={3} totalSlides={filteredData?.length} step={1} naturalSlideWidth={400} naturalSlideHeight={600}>
      <div className={styles.similiar}>
        <div className={styles.nav}>
          <h2 className={styles.secondTitle}>მსგავსი სტატიები</h2>
          <div className={styles.controls}>
            <ButtonBack className={styles.previous}>
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 9C2.55228 9 3 8.55228 3 8C3 7.44772 2.55228 7 2 7L2 9ZM1.19289 7.29289C0.802369 7.68342 0.802369 8.31658 1.19289 8.70711L7.55685 15.0711C7.94738 15.4616 8.58054 15.4616 8.97107 15.0711C9.36159 14.6805 9.36159 14.0474 8.97107 13.6569L3.31421 8L8.97107 2.34315C9.36159 1.95262 9.36159 1.31946 8.97107 0.928932C8.58054 0.538407 7.94738 0.538407 7.55685 0.928932L1.19289 7.29289ZM2 7L1.9 7L1.9 9L2 9L2 7Z"
                  fill="#1A1A1F"
                />
              </svg>
            </ButtonBack>

            <ButtonNext className={styles.next}>
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 9C2.55228 9 3 8.55228 3 8C3 7.44772 2.55228 7 2 7L2 9ZM1.19289 7.29289C0.802369 7.68342 0.802369 8.31658 1.19289 8.70711L7.55685 15.0711C7.94738 15.4616 8.58054 15.4616 8.97107 15.0711C9.36159 14.6805 9.36159 14.0474 8.97107 13.6569L3.31421 8L8.97107 2.34315C9.36159 1.95262 9.36159 1.31946 8.97107 0.928932C8.58054 0.538407 7.94738 0.538407 7.55685 0.928932L1.19289 7.29289ZM2 7L1.9 7L1.9 9L2 9L2 7Z"
                  fill="#1A1A1F"
                />
              </svg>
            </ButtonNext>
          </div>
        </div>

        <Slider className={styles.slides}>
          {filteredData &&
            filteredData.map(({ title, description, image, author, publish_date, categories, id }, idx) => (
              <Slide onClick={({ target }) => gotoBlog(target, id)} key={id} index={idx}>
                <Card
                  key={id}
                  title={title}
                  description={description}
                  image={image}
                  author={author}
                  publish_date={publish_date}
                  categories={categories}
                  id={id}
                />
              </Slide>
            ))}
        </Slider>
      </div>
    </CarouselProvider>
  );
}

export default SliderComponent;
