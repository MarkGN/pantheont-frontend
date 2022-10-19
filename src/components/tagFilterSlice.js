import { createSlice } from '@reduxjs/toolkit'

export const tagFilterSlice = createSlice({
  name: 'tagFilter',
  initialState: {
    value: {"animate vine": 1, "aquatic": 1, "cornucopic": 1, "trap": 1},
  },
  reducers: {
    setRadioIx: (state, action) => {
      const [tag, val] = action.payload;
      state.value[tag] = val;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRadioIx } = tagFilterSlice.actions

export default tagFilterSlice.reducer