import Card from '../../components/Card';
import React from 'react';
import Filters from '../../components/filters';
import bannerPhoto from '../../img/Blog-1024x355 1.png';
import styles from './home.module.scss';
import axios from 'axios';
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
  React.useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.banner}>
        <h2>ბლოგი</h2>
        <img src={bannerPhoto} alt="banner" />
      </section>
      <Filters />
      <Card />
    </main>
  );
};

export default Home;
