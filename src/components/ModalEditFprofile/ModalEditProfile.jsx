import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { api } from "../../api/apiServise";
import styles from "./ModalEditProfile.module.scss";

const schema = yup.object({
  username: yup.string(),
  email: yup.string().email("Невалидный email"),
  password: yup.string(),
  image: yup.string(),
});

export default function ModalEditProfile() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });
  const handleEditProfile = (e) => {
    let arr = [];
    Object.entries(e).map((item) => {
      if (item[1] !== "") {
        arr.push(item);
      }
    });
    const body = {
      user: Object.fromEntries(arr),
    };
    console.log(body);
    api
      .updateUser(body, JSON.parse(localStorage.getItem("token")).token)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.user));
        navigate("/");
      });
  };

  return (
    <div className={styles.wrapper}>
      <h4>Edit profile</h4>
      <form onSubmit={handleSubmit(handleEditProfile)}>
        <label>
          <span>Username</span>
          <input {...register("username")} type="text" placeholder="username" />
          <span className={styles.error}>{errors?.username?.message}</span>
        </label>
        <label>
          <span>Email address</span>
          <input type="text" {...register("email")} placeholder="email" />
          <span className={styles.error}>{errors?.email?.message}</span>
        </label>
        <label>
          <span>New password</span>
          <input
            type="text"
            {...register("password")}
            placeholder="new password"
          />
          <span className={styles.error}>{errors?.newPass?.message}</span>
        </label>
        <label>
          <span>Avatart image(url)</span>
          <input
            type="text"
            {...register("image")}
            placeholder="avatar image"
          />
          <span className={styles.error}>{errors?.avatar?.message}</span>
        </label>
        <button className={styles.submit} type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
