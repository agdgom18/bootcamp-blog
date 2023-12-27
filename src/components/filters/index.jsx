import React from 'react';
import styles from './filters.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/categoriesSlice';

const Filters = ({ filterby, filterArr }) => {
  const { loading, categories } = useSelector((state) => state.categoriesSlice);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section className={styles.filters}>
      <div className={styles.filetersContainer}>
        <ul className={styles.filterList}>
          {categories.map(({ value, color, label }) => {
            return (
              <li key={value} className={styles.filterListItem}>
                <button
                  onClick={() => filterby(label)}
                  className={styles.button}
                  style={{
                    backgroundColor: color,
                    color: '#fff',
                    border: `2px solid ${filterArr.includes(label) ? '#000' : 'transparent'}`,
                  }}>
                  {label}
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
