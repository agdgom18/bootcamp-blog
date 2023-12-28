import React from 'react';
import img from '../../img/card-image.jpg';
import { Link } from 'react-router-dom';
import styles from './blog.module.scss';
import slideControl from '../../img/back-arrow.svg';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlog } from '../../store/currentBlogSlice';
import { fetchData } from '../../store/dataSlice';
import 'pure-react-carousel/dist/react-carousel.es.css';
import SliderComponent from '../../components/SliderComponent';
import { TailSpin } from 'react-loader-spinner';

const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useSelector((state) => state.currentBlogSlice);
  const { data } = useSelector((state) => state.dataSlice);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchBlog(id));
    dispatch(fetchData());
  }, [dispatch]);

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
    <div className={styles.blog}>
      <Link to={'/'} className="back-nav-button"></Link>
      <div className={styles.cardBlog}>
        <img className={styles.img} src={blog.image} alt="photo" />
        <div className={styles.author}>
          <h4>{blog.author}</h4>

          <div className="dflex align-center gap-1">
            <p>{blog.publish_date}</p>
            <p>•</p>
            <p>{blog.email}</p>
          </div>
        </div>
        <h3 className={styles.title}>EOMM-ის მრჩეველთა საბჭოს ნინო ეგაძე შეუერთდა</h3>
        <ul className={styles.filters}>
          {blog?.categories?.map(({ id, title, text_color, background_color }) => {
            return (
              <li style={{ color: text_color, backgroundColor: background_color }} key={id}>
                {title}
              </li>
            );
          })}
        </ul>
        <p className={styles.description}>{blog.description}</p>
      </div>
      {data && <SliderComponent data={data} blogId={blog.id} blogCategories={blog.categories} />}
    </div>
  );
};

export default Blog;
