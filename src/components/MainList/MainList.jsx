import React from "react";
import Article from "../MainArticle/MainArticle";
import { connect } from "react-redux";
import { v4 } from "uuid";

function MainList(props) {
  return props.loading ? (
    <p>loading......</p>
  ) : (
    props?.articles?.map((item) => {
      return <Article key={v4()} article={item} />;
    })
  );
}

const mapStateToProps = (state) => ({
  articles: state.store.articles,
  loading: state.store.loading,
});

// export default MainList

export default connect(mapStateToProps, null)(MainList);
