import React, { useState } from "react";
import styles from "./ModalLogin.module.scss";
import { api } from "../../api/apiServise";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InfoWindow from "../InfoWindow/InfoWindow";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .required("Обязательно к заполнению")
    .email("Невалидный email"),
  password: yup
    .string()
    .required("Обязательно к заполнению")
    .min(8, "Минимум 8 символов"),
});

export default function ModalLogin() {
  const [onWindow, setOnWindow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const handleLogin = async (e) => {
    setLoading(true);
    const body = {
      user: {
        email: e.email,
        password: e.password,
      },
    };

    try {
      await api.login(JSON.stringify(body)).then((res) => {
        localStorage.setItem("token", JSON.stringify(res.user));
        setLoading(false);
        navigate("/");
        throw new Error("не найдено");
      });
    } catch (err) {
      setLoading(false);
      setOnWindow(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h4>Sign In</h4>
      {onWindow ? (
        <div>
          <InfoWindow text="не найден пользователь" />
          <button className={styles.btn} onClick={() => setOnWindow(false)}>
            попробовать еще раз
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleLogin)}>
          <label>
            <span>Email address</span>
            <input
              {...register("email")}
              type="text"
              // value='abarmot@abarmot.abarmot'
              placeholder="email"
            />
            <span className={styles.error}>{errors?.email?.message}</span>
          </label>

          <label>
            <span>password</span>
            <input
              // value='11111111'
              {...register("password")}
              type="text"
              placeholder="password"
            />
            <div className={styles.error}>{errors?.password?.message}</div>
          </label>
          <input
            disabled={!loading ? false : true}
            className={styles.submit}
            type="submit"
            value={loading ? "идет отправка...." : "отправить"}
          />
          <p className={styles.already}>
            Already have an account? <a href="#">Sign Up</a>{" "}
          </p>
        </form>
      )}
    </div>
  );
}
