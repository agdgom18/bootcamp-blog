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

const Blog = () => {
  const { id } = useParams();
  const { blog } = useSelector((state) => state.currentBlogSlice);
  const { data, loading } = useSelector((state) => state.dataSlice);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchBlog(id));
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className={styles.blog}>
      <Link className={styles.backLink} to={'/'}>
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 9C2.55228 9 3 8.55228 3 8C3 7.44772 2.55228 7 2 7L2 9ZM1.19289 7.29289C0.802369 7.68342 0.802369 8.31658 1.19289 8.70711L7.55685 15.0711C7.94738 15.4616 8.58054 15.4616 8.97107 15.0711C9.36159 14.6805 9.36159 14.0474 8.97107 13.6569L3.31421 8L8.97107 2.34315C9.36159 1.95262 9.36159 1.31946 8.97107 0.928932C8.58054 0.538407 7.94738 0.538407 7.55685 0.928932L1.19289 7.29289ZM2 7L1.9 7L1.9 9L2 9L2 7Z"
            fill="#1A1A1F"
          />
        </svg>
      </Link>
      <div className={styles.cardBlog}>
        <img className={styles.img} src={blog.image} alt="photo" />
        <div className={styles.author}>
          <h4>{blog.author}</h4>
          <p>{blog.publish_date}</p>
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
      <SliderComponent data={data} blogId={blog.id} blogCategories={blog.categories} />
    </div>
  );
};

export default Blog;
