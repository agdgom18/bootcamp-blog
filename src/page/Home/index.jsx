import Card from '../../components/Card';
import React, { useEffect } from 'react';
import Filters from '../../components/filters';
import bannerPhoto from '../../img/Blog-1024x355 1.png';
import styles from './home.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, filterData } from '../../store/dataSlice';
import Cookies from 'js-cookie';
import { TailSpin } from 'react-loader-spinner';

const Home = () => {
  const { loading, filterBlogArr, filterArr } = useSelector((state) => state.dataSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  useEffect(() => {
    Cookies.set('filters', JSON.stringify(filterArr));
  }, [filterBlogArr]);

  const filterby = (label) => {
    dispatch(filterData(label));
  };
  if (loading) {
    return (
      <TailSpin
        visible={true}
        height="160"
        width="160"
        color="#5D37F3"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass="main-loading-spinner"
      />
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.banner}>
        <h2>ბლოგი</h2>
        <img src={bannerPhoto} alt="banner" />
      </section>
      <Filters filterby={filterby} filterArr={filterArr} />

      <div className={styles.cardList}>
        {filterBlogArr &&
          filterBlogArr.map(({ id, title, description, image, author, publish_date, categories }) => {
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
