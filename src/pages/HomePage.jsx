import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import MainList from "../components/MainList/MainList";
import { Pagination } from "antd";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoWindow from "../components/InfoWindow/InfoWindow";
import { setCurrentPage, getArticles } from "../store/blogSlice";
import { api } from "../api/apiServise";

function HomePage(props) {
  const [infoWindow, setInfoWindow] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlePagination = (e) => {
    dispatch(setCurrentPage(e));
  };
  const refresh = () => {
    navigate("/");
  };
  useEffect(() => {
    api.getArticle((props.currentPage - 1) * 10).then((res) => {
      if (res.errors) {
        setInfoWindow(true);
        setError(res.errors.message);
      }
      dispatch(getArticles(res.articles));
    });
  }, [dispatch, props.currentPage]);

  return (
    <Layout>
      {infoWindow ? (
        <div>
          <InfoWindow text={error} />
          <button
            onClick={() => refresh()}
            style={{
              padding: "5px 20px",
              marginLeft: "50%",
              transform: "translateX(-50%)",
              cursor:'pointer',
              backgroundColor: 'blue',
              color: 'white',
              fontSize: '22px',
              fontWeight: 'bolder',
              borderRadius: '10px'
            }}
          >
            перезагрузить
          </button>
        </div>
      ) : (
        <div>
          <MainList />
          <Pagination
            current={props?.currentPage}
            onChange={handlePagination}
            total={props.totalPage * 10}
            showSizeChanger={false}
            style={{
              marginLeft: "50%",
              transform: "translateX(-25%)",
              marginTop: "30px",
              paddingBottom: "80px",
            }}
          />
        </div>
      )}
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.store?.currentPage,
    totalPage: state.store?.totalPage,
    articles: state.store?.articles,
  };
};

export default connect(mapStateToProps, null)(HomePage);
