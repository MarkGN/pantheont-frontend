import { createSlice } from '@reduxjs/toolkit';

export const tagFilterSlice = createSlice({
  name: 'tagFilter',
  initialState: {
    value: {"move": 1, "modifier": 1, "sort": 1},
    skills: {"ath":1,"fight":1,"know":1,"magic":1,"stealth":1,"vig":1}
  },
  reducers: {
    toggleSkillCheckIx: (state, action) => {
      const skill = action.payload;
      state.skills[skill] = !state.skills[skill];
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

// TODO this is mostly CPed from plantFilterSlice.js, making me think maybe they should be factored out
export const { toggleSkillCheckIx, setSortRadioIx, setTagRadioIx } = tagFilterSlice.actions

export default tagFilterSlice.reducer