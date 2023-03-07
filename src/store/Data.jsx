import { configureStore, createSlice } from "@reduxjs/toolkit";

let data = createSlice({
  name: "data",
  initialState: [
    {
      id: 1,
      color: "#F6E1C3",
      like: false,
    },
    {
      id: 2,
      color: "#E9A178",
      like: false,
    },
    {
      id: 3,
      color: "#A84448",
      like: false,
    },
    {
      id: 4,
      color: "#7A3E65",
      like: false,
    },
    {
      id: 5,
      color: "#B3E5BE",
      like: false,
    },
    {
      id: 6,
      color: "#E7B10A",
      like: false,
    },
  ],
  reducers: {
    changeLike(state, action) {
      let 번호 = state.findIndex((item) => item.id === action.payload);
      console.log(state[번호 + 1].like);
      // state[번호 + 1].like = false;
      state[번호 + 1].like = !state[번호 + 1].like;
      // state[번호 + 1].like ? false : true;
    },
  },
});

export default configureStore({
  reducer: {
    data: data.reducer,
  },
});

export const { changeLike } = data.actions;
