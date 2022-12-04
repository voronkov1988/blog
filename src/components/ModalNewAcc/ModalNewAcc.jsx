import React, { useState } from "react";
import styles from "./ModalNewAcc.module.scss";
import { api } from "../../api/apiServise";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import WindowInfo from "../InfoWindow/InfoWindow";
import * as yup from "yup";

const schema = yup.object({
  username: yup
    .string()
    .required("обязательное поле")
    .max(10, "максимум 10 символов")
    .min(4, "минимум 4 символа"),
  email: yup
    .string()
    .required("Обязательно к заполнению")
    .email("Невалидный email"),
  password: yup
    .string()
    .required("Обязательно к заполнению")
    .min(8, "Минимум 8 символов"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "пароли не совпадают")
    .required("Обязательно к заполнению")
    .min(8, "Минимум 8 символов"),
  checkbox: yup.boolean().isTrue("Должны дать согласие"),
});

export default function ModalNewAcc() {
  const [onInfo, setOnInfo] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  function registerHandler(e) {
    const body = {
      user: {
        username: e.username,
        email: e.email,
        password: e.password,
      },
    };
    api.register(JSON.stringify(body)).then((res) => {
      console.log(res);
      if (!res.user) {
        setOnInfo(true);
        setError(res.errors.username);
      }
    });
  }

  return (
    <div className={styles.wrapper}>
      <h4>Create new account</h4>
      {onInfo ? (
        <div>
          <WindowInfo text={error} />
          <button onClick={() => setOnInfo(false)} className={styles.btn}>
            Попробовать снова
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(registerHandler)}>
          <label>
            <span>Username</span>
            <input
              {...register("username")}
              type="text"
              placeholder="username"
            />
            <div className={styles.error}>{errors?.username?.message}</div>
          </label>

          <label>
            <span>Email address</span>
            <input {...register("email")} type="text" placeholder="email" />
            <div className={styles.error}>{errors?.email?.message}</div>
          </label>

          <label>
            <span>password</span>
            <input
              value="11111111"
              {...register("password")}
              type="password"
              placeholder="password"
            />
            <div className={styles.error}>{errors?.password?.message}</div>
          </label>

          <label>
            <span>repeat password</span>
            <input
              value="11111111"
              {...register("repeatPassword")}
              type="password"
              placeholder="repeat password"
            />
            <span className={styles.error}>
              {errors?.repeatPassword?.message}
            </span>
          </label>

          <label className={styles.checkLabel}>
            <input {...register("checkbox")} type="checkbox" />
            <span>I agree to the proccessing of my personal information</span>
          </label>
          <div style={{ marginLeft: "50px" }} className={styles.error}>
            {errors?.checkbox?.message}
          </div>
          <input
            disabled={Object.keys(errors).length === 0 ? false : true}
            className={styles.submit}
            type="submit"
            value="Create"
          />

          <p className={styles.already}>
            Already have an account? <a href="#">Sign In</a>{" "}
          </p>
        </form>
      )}
    </div>
  );
}
