import Card from '../../components/Card';
import React from 'react';
import Filters from '../../components/filters';
import bannerPhoto from '../../img/Blog-1024x355 1.png';
import styles from './home.module.scss';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
const fetchBlogs = async () => {
  const res = await axios.get('https://api.blog.redberryinternship.ge/api/blogs', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
  });
  const result = res.data.data;
  console.log(result);
  return result;
};

const Home = () => {
  const { data, isLoading } = useQuery({ queryKey: ['blogs'], queryFn: fetchBlogs });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.banner}>
        <h2>ბლოგი</h2>
        <img src={bannerPhoto} alt="banner" />
      </section>
      {/* <Filters /> */}

      <div className={styles.cardList}>
        {data.map(({ id, title, description, image, author, publish_date, categories }) => {
          return (
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
          );
        })}
      </div>
    </main>
  );
};

export default Home;
