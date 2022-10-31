import { createSlice } from '@reduxjs/toolkit'

export const tagFilterSlice = createSlice({
  name: 'tagFilter',
  initialState: {
    value: ""
  },
  reducers: {
    setTagFilter: (state, action) => {
      state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTagFilter } = tagFilterSlice.actions

export default tagFilterSlice.reducer