import React from 'react';
import img from '../../img/card-image.jpg';
import { Link } from 'react-router-dom';
import styles from './blog.module.scss';
import slideControl from '../../img/back-arrow.svg';
import Card from '../../components/Card';
import { useParams } from 'react-router-dom';
const Blog = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className={styles.blog}>
      <Link to={'/'}>
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 9C2.55228 9 3 8.55228 3 8C3 7.44772 2.55228 7 2 7L2 9ZM1.19289 7.29289C0.802369 7.68342 0.802369 8.31658 1.19289 8.70711L7.55685 15.0711C7.94738 15.4616 8.58054 15.4616 8.97107 15.0711C9.36159 14.6805 9.36159 14.0474 8.97107 13.6569L3.31421 8L8.97107 2.34315C9.36159 1.95262 9.36159 1.31946 8.97107 0.928932C8.58054 0.538407 7.94738 0.538407 7.55685 0.928932L1.19289 7.29289ZM2 7L1.9 7L1.9 9L2 9L2 7Z"
            fill="#1A1A1F"
          />
        </svg>
      </Link>
      <div className={styles.cardBlog}>
        <img className={styles.img} src={img} alt="photo" />
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
        <p className={styles.description}>
          6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური სიზუსტისთვის, ეს პროცესი ორჯერ გაიმეორეს და ორივეჯერ იმ ყველს მიენიჭა
          უპირატესობა, რომელსაც ჰიპ-ჰოპს ასმენინებდნენ. „მუსიკალური ენერგია პირდაპირ ყველის შუაგულში რეზონირებდა“, — აღნიშნა ბერნის ხელოვნების
          უნივერსიტეტის წარმომადგენელმა, მაიკლ ჰერენბერგმა. რა თქმა უნდა, ეს ერთი კვლევა საკმარისი არ არის საბოლოო დასკვნების გამოსატანად. სანაცვლოდ,
          მეცნიერებს სურთ, უშუალოდ ჰიპ-ჰოპის ჟანრის სხვადასხვა მუსიკა მოასმენინონ რამდენიმე ყველს და უკვე ისინი შეაჯიბრონ ერთმანეთს. აქვე საგულისხმოა,
          რომ როგორც ბერნის მეცნიერები განმარტავენ, ექსპერიმენტს საფუძვლად არა ყველის გაუმჯობესებული წარმოება, არამედ კულტურული საკითხები დაედო. მათი
          თქმით, ადამიანებს უყვართ ყველი და მუსიკა, ამიტომაც საინტერესოა ამ ორის კავშირის დანახვა.
          <br />
          <br />6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური სიზუსტისთვის, ეს პროცესი ორჯერ გაიმეორეს და ორივეჯერ იმ ყველს მიენიჭა
          უპირატესობა, რომელსაც ჰიპ-ჰოპს ასმენინებდნენ. „მუსიკალური ენერგია პირდაპირ ყველის შუაგულში რეზონირებდა“, — აღნიშნა ბერნის ხელოვნების
          უნივერსიტეტის წარმომადგენელმა, მაიკლ ჰერენბერგმა. რა თქმა უნდა, ეს ერთი კვლევა საკმარისი არ არის საბოლოო დასკვნების გამოსატანად. სანაცვლოდ,
          მეცნიერებს სურთ, უშუალოდ ჰიპ-ჰოპის ჟანრის სხვადასხვა მუსიკა მოასმენინონ რამდენიმე ყველს და უკვე ისინი შეაჯიბრონ ერთმანეთს.
        </p>
      </div>

      <div className={styles.similiar}>
        <div className={styles.nav}>
          <h2 className={styles.secondTitle}>მსგავსი სტატიები</h2>
          <div className={styles.controls}>
            <button className={styles.previous}>
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 9C2.55228 9 3 8.55228 3 8C3 7.44772 2.55228 7 2 7L2 9ZM1.19289 7.29289C0.802369 7.68342 0.802369 8.31658 1.19289 8.70711L7.55685 15.0711C7.94738 15.4616 8.58054 15.4616 8.97107 15.0711C9.36159 14.6805 9.36159 14.0474 8.97107 13.6569L3.31421 8L8.97107 2.34315C9.36159 1.95262 9.36159 1.31946 8.97107 0.928932C8.58054 0.538407 7.94738 0.538407 7.55685 0.928932L1.19289 7.29289ZM2 7L1.9 7L1.9 9L2 9L2 7Z"
                  fill="#1A1A1F"
                />
              </svg>
            </button>
            <button className={styles.next}>
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 9C2.55228 9 3 8.55228 3 8C3 7.44772 2.55228 7 2 7L2 9ZM1.19289 7.29289C0.802369 7.68342 0.802369 8.31658 1.19289 8.70711L7.55685 15.0711C7.94738 15.4616 8.58054 15.4616 8.97107 15.0711C9.36159 14.6805 9.36159 14.0474 8.97107 13.6569L3.31421 8L8.97107 2.34315C9.36159 1.95262 9.36159 1.31946 8.97107 0.928932C8.58054 0.538407 7.94738 0.538407 7.55685 0.928932L1.19289 7.29289ZM2 7L1.9 7L1.9 9L2 9L2 7Z"
                  fill="#1A1A1F"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.slides}></div>
      </div>
    </div>
  );
};

export default Blog;
