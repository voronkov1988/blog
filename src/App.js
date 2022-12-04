import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OneArticle from "./pages/OneArticle";
import EditProfile from "./pages/EditProfile";
import CreateNewArticle from "./pages/CreateNewCrticle";
import { api } from "./api/apiServise";
import { useDispatch, connect } from "react-redux";
import { getArticles, setLoading, setTotalPage } from "./store/blogSlice";

import "antd/dist/antd.css";

function App(props) {
  const dispatch = useDispatch();
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    api.getArticle((props.currentPage - 1) * 10).then((item) => {
      setArticles(item.articles);
      dispatch(setTotalPage(Math.ceil(item.articlesCount / 10)));
    });
    dispatch(setLoading(false));
  }, [dispatch, props.currentPage]);

  useEffect(() => {
    dispatch(getArticles(articles));
  }, [articles, dispatch]);

  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route exact path="/createArticle" element={<CreateNewArticle />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/article/:id" element={<OneArticle />} />
          <Route exact path="/editProfile" element={<EditProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.store.currentPage,
    totalPage: state.store.totalPage,
    articles: state.store.articles,
  };
};

export default connect(mapStateToProps)(App);
