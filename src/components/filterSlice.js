import { createSlice } from '@reduxjs/toolkit'

export const tagFilterSlice = createSlice({
  name: 'tagFilter',
  initialState: {
    exclude: "civilian",
    value: ""
  },
  reducers: {
    setExcludeFilter: (state, action) => {
      state.exclude = action.payload;
    },
    setTagFilter: (state, action) => {
      state.value = action.payload;
    }
  }
});


// Action creators are generated for each case reducer function
export const { setExcludeFilter, setTagFilter } = tagFilterSlice.actions

export default tagFilterSlice.reducer