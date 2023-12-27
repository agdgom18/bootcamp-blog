import React from 'react';
import styles from './filters.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/categoriesSlice';
const Filters = () => {
  const { loading, data } = useSelector((state) => state.categoriesSlice);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section className={styles.filters}>
      <div className={styles.filetersContainer}>
        <ul className={styles.filterList}>
          {data.map((el) => {
            return (
              <li key={el.value} className={styles.filterListItem}>
                <button className={styles.button} style={{ backgroundColor: el.color, color: '#fff' }}>
                  {el.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Filters;
