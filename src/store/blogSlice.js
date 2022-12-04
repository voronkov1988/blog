import { createSlice } from "@reduxjs/toolkit";

export const blogReducer = createSlice({
  name: "blog",
  initialState: {
    articles: [],
    loading: true,
    currentPage: 1,
    totalPage: 0,
    token: "",
  },
  reducers: {
    getArticles: (state, action) => {
      state.articles = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setToken: (state, action) => {
      console.log(action.payload);
      state.token = action.payload;
    },
  },
});

export const {
  getArticles,
  setLoading,
  setCurrentPage,
  setTotalPage,
  setToken,
} = blogReducer.actions;

export default blogReducer.reducer;
