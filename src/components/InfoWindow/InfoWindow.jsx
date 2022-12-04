import React from "react";
import styles from "./InfoWindow.module.scss";

export default function WindowUnfo({ text }) {
  return (
    <div className={styles.wrapper}>
      <p>{text}</p>
    </div>
  );
}
