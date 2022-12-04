import React from "react";
import styles from "./MainArticle.module.scss";
import hearth from "../../assets/img/heart 1.svg";
import { Link } from "react-router-dom";

export default function MainArticle({ article }) {
  return (
    <div>
      <Link to={`/article/${article.slug}`}>
        <div className={styles.wrapper}>
          <div className={styles.profile}>
            <div className={styles.profileInfo}>
              <span>{article.author.username}</span>
              <span>March 5, 2020</span>
            </div>
            <img className={styles.image} src={article.author.image} alt="" />
          </div>
          <div className={styles.header}>
            <div className={styles.articleTitle}>
              <h2>{article.title}</h2>
              <div className={styles.likes}>
                <img src={hearth} alt="" />
                <span>{article.favoritesCount}</span>
              </div>
            </div>
            <div className={styles.tags}>
              {article.tagList.length > 0 ? (
                article.tagList.map((item, i) => {
                  return <span key={i}>{item}</span>;
                })
              ) : (
                <p>нету тегов</p>
              )}
            </div>
            <p>{article.body}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
