import React from 'react';
import photo from '../../img/card-image.jpg';
import { Link } from 'react-router-dom';
import styles from './card.module.scss';
import axios from 'axios';

// async function getBlogs() {
//   const res = await axios.get('https://api.blog.redberryinternship.ge/api/blogs', {
//     headers: {
//       Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
//     },
//   });
//   console.log(res);
//   return res;
// }

const Card = () => {
  // getBlogs();
  return (
    <div className={styles.card}>
      <img className={styles.img} src={photo} alt="card-photo" />
      <div className={styles.author}>
        <h4>ნია გოგსაძე</h4>
        <p>02.11.2023</p>
      </div>
      <h3 className={styles.title}>EOMM-ის მრჩეველთა საბჭოს ნინო ეგაძე შეუერთდა</h3>
      <ul className={styles.filters}>
        <li>მარკეტი</li>
        <li>აპლიკაცია</li>
        <li>ხელოვნური ინტელექტი</li>
      </ul>
      <p className={styles.description}>6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური სიზუსტისთვის, ეს პროცესი...</p>
      <div className={styles.link}>
        <span>სრულად ნახვა</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.93415 13.0052C5.64125 13.2981 5.64125 13.773 5.93415 14.0659C6.22704 14.3587 6.70191 14.3587 6.99481 14.0659L5.93415 13.0052ZM14.2855 6.46446C14.2855 6.05024 13.9498 5.71445 13.5355 5.71446L6.78555 5.71445C6.37133 5.71445 6.03555 6.05024 6.03555 6.46445C6.03555 6.87867 6.37133 7.21445 6.78555 7.21445H12.7855V13.2145C12.7855 13.6287 13.1213 13.9645 13.5355 13.9645C13.9498 13.9645 14.2855 13.6287 14.2855 13.2145L14.2855 6.46446ZM6.99481 14.0659L14.0659 6.99478L13.0052 5.93412L5.93415 13.0052L6.99481 14.0659Z"
            fill="#5D37F3"
          />
        </svg>
      </div>
    </div>
  );
};

export default Card;
