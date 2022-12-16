import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    exclude: "civilian",
    group: "",
    include: ""
  },
  reducers: {
    setExcludeFilter: (state, action) => {
      state.exclude = action.payload;
    },
    setGroup: (state, action) => {
      state.group = action.payload;
    },
    setTagFilter: (state, action) => {
      state.include = action.payload;
    }
  }
});


// Action creators are generated for each case reducer function
export const { setExcludeFilter, setGroup, setTagFilter } = searchSlice.actions

export default searchSlice.reducer;