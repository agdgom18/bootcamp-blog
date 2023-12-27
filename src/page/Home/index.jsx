import Card from '../../components/Card';
import React from 'react';
import Filters from '../../components/filters';
import bannerPhoto from '../../img/Blog-1024x355 1.png';
import styles from './home.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../../store/dataSlice';

const Home = () => {
  const { loading, data } = useSelector((state) => state.dataSlice);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.banner}>
        <h2>ბლოგი</h2>
        <img src={bannerPhoto} alt="banner" />
      </section>
      <Filters />

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
