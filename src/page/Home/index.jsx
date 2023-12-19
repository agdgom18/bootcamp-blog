import Filters from '../../components/filters';
import bannerPhoto from '../../img/Blog-1024x355 1.png';
import styles from './home.module.scss';
const Home = () => {
  return (
    <main className={styles.main}>
      <section className={styles.banner}>
        <h2>ბლოგი</h2>
        <img src={bannerPhoto} alt="banner" />
      </section>
      <Filters />
    </main>
  );
};

export default Home;
