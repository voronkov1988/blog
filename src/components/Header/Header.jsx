import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.scss";
import AuthorizedUserHeader from "../AuthorizedUser/AuthorizedUserHeader";

export default function Header() {
  const [hasToken, setHasToken] = useState(null);
  useEffect(() => {
    setHasToken(localStorage.getItem("token"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("token")]);

  return (
    <div className={styles.wrapper}>
      <Link to="/">
        <div className={styles.logo}>Realworld Blog</div>
      </Link>
      <div className={styles.buttons}>
        {hasToken !== null ? (
          <AuthorizedUserHeader />
        ) : (
          <React.Fragment>
            <NavLink className={styles.signIn} to="/login">
              <span>Sign In</span>
            </NavLink>
            <NavLink to="/registration">
              <span>Sign Up</span>
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
