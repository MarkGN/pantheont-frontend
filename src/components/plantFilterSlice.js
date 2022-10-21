import { createSlice } from '@reduxjs/toolkit'

export const tagFilterSlice = createSlice({
  name: 'tagFilter',
  initialState: {
    value: {"animate vine": 1, "aquatic": 1, "cornucopic": 1, "trap": 1, "sort": 2},
    colors: {"red":1,"orange":1,"yellow":1,"green":1,"blue":1,"purple":1}
  },
  reducers: {
    toggleColorCheckIx: (state, action) => {
      const color = action.payload;
      state.colors[color] = !state.colors[color];
    },
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
export const { toggleColorCheckIx, setSortRadioIx, setTagRadioIx } = tagFilterSlice.actions

export default tagFilterSlice.reducer