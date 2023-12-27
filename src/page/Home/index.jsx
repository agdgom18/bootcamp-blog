import Card from '../../components/Card';
import React, { useState, useEffect } from 'react';
import Filters from '../../components/filters';
import bannerPhoto from '../../img/Blog-1024x355 1.png';
import styles from './home.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, filterData } from '../../store/dataSlice';
import Cookies from 'js-cookie';

const Home = () => {
  const { loading, filterBlogArr, filterArr } = useSelector((state) => state.dataSlice);
  const [localBlogs, setLocalBlogs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  useEffect(() => {
    setLocalBlogs([...filterBlogArr]);
    Cookies.set('filters', JSON.stringify(filterArr));
  }, [filterBlogArr]);

  const filterby = (label) => {
    dispatch(filterData(label));
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.banner}>
        <h2>ბლოგი</h2>
        <img src={bannerPhoto} alt="banner" />
      </section>
      <Filters filterby={filterby} filterArr={filterArr} />

      <div className={styles.cardList}>
        {localBlogs &&
          localBlogs.map(({ id, title, description, image, author, publish_date, categories }) => {
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
