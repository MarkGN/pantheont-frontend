import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

export const contentSlice = createSlice({
  name: 'content',
  initialState: {
    boons: (Cookies.get("char-boon") || "").split(","),
    value: ""
  },
  reducers: {
    setExcludeFilter: (state, action) => {
      // state.exclude = action.payload;
    },
    setTagFilter: (state, action) => {
      state.value = action.payload;
    }
  }
});


export const { setExcludeFilter, setTagFilter } = contentSlice.actions

export default contentSlice.reducer