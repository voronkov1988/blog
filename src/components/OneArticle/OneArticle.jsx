import React, { useEffect, useState } from "react";
import styles from "./OneArticle.module.scss";
import like from "../../assets/img/heart 1.svg";
import { api } from "../../api/apiServise";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/blogSlice";
import UpdateArticleBlock from "../UpdateArticleBlock/UpdateArticleBlock";

export default function OneArticle() {
  const [updateLike, setUpdateLike] = useState();
  const [visibleUpdateArticle, setVisibleUpdateArticle] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  let loading = useSelector((state) => state.store.loading);
  const [article, setArticle] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    api.getOneArticle(id).then((res) => setArticle(res.article));
    dispatch(setLoading(false));
  }, [dispatch, id, loading, updateLike]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setUpdateLike(article.favoritesCount);
    if (JSON.parse(localStorage.getItem("token"))) {
      if (
        article?.author?.username ===
        JSON.parse(localStorage.getItem("token")).username
      ) {
        setVisibleUpdateArticle(true);
      } else {
        setVisibleUpdateArticle(false);
      }
    }
  });

  const getLike = () => {
    if (JSON.parse(localStorage.getItem("token"))) {
      if (updateLike === 1) {
        api
          .unlike(article.slug, JSON.parse(localStorage.getItem("token")).token)
          .then((res) => {
            setUpdateLike(res.article.favoritesCount);
          });
      } else {
        api
          .getLike(
            article.slug,
            JSON.parse(localStorage.getItem("token")).token
          )
          .then((res) => {
            setUpdateLike(res.article.favoritesCount);
          });
      }
    }
  };

  return !loading ? (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.top}>
            <h2>{article?.title}</h2>
            <div onClick={getLike} className={styles.likes}>
              <img src={like} alt="" />
              <span>{article?.favoritesCount}</span>
            </div>
          </div>
          <div className={styles.tags}>
            {article?.tagList?.map((item, i) => {
              return <span key={i}>{item}</span>;
            })}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.user}>
            <span>{article.author?.username}</span>
            <span>March 5, 2020</span>
          </div>

          <img
            className={styles.image}
            src={article.author?.image}
            alt="user"
          />
        </div>
        {visibleUpdateArticle ? (
          <UpdateArticleBlock article={article} slug={article.slug} />
        ) : null}
      </div>
      <div className={styles.description}>{article.description}</div>
      <div className={styles.content}>{article.body}</div>
    </div>
  ) : (
    <p>loading....</p>
  );
}
