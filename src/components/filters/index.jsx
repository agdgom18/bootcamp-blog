import React from 'react';
import styles from './filters.module.scss';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

async function fetchFilters() {
  const res = await axios.get('https://api.blog.redberryinternship.ge/api/categories');

  return res.data.data.slice(0, 6);
}
const Filters = () => {
  const { data, isLoading } = useQuery({ queryKey: ['filters'], queryFn: fetchFilters });
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <section className="filters">
      <ul>
        {data.map((el) => {
          return (
            <li key={el.id}>
              <button className={styles.button} style={{ backgroundColor: el.background_color + '14', color: el.text_color }}>
                {el.title}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Filters;
