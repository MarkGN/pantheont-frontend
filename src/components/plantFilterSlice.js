import { createSlice } from '@reduxjs/toolkit'

export const tagFilterSlice = createSlice({
  name: 'tagFilter',
  initialState: {
    value: {"animate vine": 1, "aquatic": 1, "cornucopic": 1, "trap": 1, "sort": 2},
  },
  reducers: {
    setSortRadioIx: (state, action) => {
      state.value.sort = action.payload;
    },
    setTagRadioIx: (state, action) => {
      const [tag, val] = action.payload;
      state.value[tag] = val;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSortRadioIx, setTagRadioIx } = tagFilterSlice.actions

export default tagFilterSlice.reducer