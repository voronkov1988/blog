import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./authorizedUserHeader.module.scss";

export default function AuthorizedUserHeader() {
  const navigate = useNavigate();
  const img = !JSON.parse(localStorage.getItem("token")).image
    ? "https://static.productionready.io/images/smiley-cyrus.jpg"
    : JSON.parse(localStorage.getItem("token")).image;
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <Link to="/createArticle">
        <button className={styles.create}>Create article</button>
      </Link>
      <Link to="/editProfile">
        <div className={styles.userInfo}>
          <span>{JSON.parse(localStorage.getItem("token")).username}</span>
          <img src={img} alt="" />
        </div>
      </Link>
      <button className={styles.out} onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
}
