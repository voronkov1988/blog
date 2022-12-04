import React, { useEffect, useState } from "react";
import styles from "./UpdateArticleBlock.module.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/apiServise";

export default function UpdateArticleBlock({ slug, article }) {
  const [del, setDel] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const navigate = useNavigate();
  const deleteArticle = () => {
    setConfirmDel(true);
  };
  useEffect(() => {
    if (del) {
      const token = JSON.parse(localStorage.getItem("token")).token;
      api.deleteArticle(slug, token).then((res) => {
        if (res.ok) navigate("/");
        else throw new Error("такой статьи не существует");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [del]);

  const ConfirmAction = () => {
    const yes = () => {
      setDel(true);
      setConfirmDel(false);
    };

    const no = () => {
      setConfirmDel(false);
    };

    return (
      <div className={styles.modal}>
        <p>Вы точно хотите удалить эту статью?</p>
        <div className={styles.buttons}>
          <button className={styles.yes} onClick={yes}>
            ДА
          </button>
          <button onClick={no} className={styles.no}>
            Нет
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={deleteArticle} className={styles.delete}>
        delete
      </button>

      <Link
        to={`/createArticle/?title=${article.title.trim()}
                                 &description=${article.description.trim()}
                                 &body=${article.body.trim()}
                                 &slug=${article.slug}
                                 &tags=${article.tagList}
                                 `}
      >
        <button className={styles.edit}>edit</button>
      </Link>
      {confirmDel ? (
        <ConfirmAction setConfirmDel={setConfirmDel} setDel={setDel} />
      ) : null}
    </div>
  );
}
