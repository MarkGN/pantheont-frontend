import { createSlice } from '@reduxjs/toolkit'

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    value: ""
  },
  reducers: {
    setGroup: (state, action) => {
      state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setGroup } = groupSlice.actions;

export default groupSlice.reducer;