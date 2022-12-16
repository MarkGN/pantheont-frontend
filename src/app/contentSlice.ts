import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

enum ContentType {
  boon = "boon",
  item = "item",
  spell = "spell"
}

export const contentSlice = createSlice({
  name: 'content',
  // TODO I'm not entirely happy using arrays here.
  // I think it'd be better to use objects, where content.boon["aim"] <=> you have that boon.
  // However, this works, and I need a break from fiddling with TS's typing system.
  initialState: {
    content: {
      "boon" : ((Cookies.get("char-boon") || "" as string).split(",")),
      "item": ((Cookies.get("char-item") || "" as string).split(",")),
      "spell": ((Cookies.get("char-spell") || "" as string).split(",")),
    }
  },
  reducers: {
    addContent: (state, action) => {
      // state.content[action.payload.contentType as ContentType].add(action.payload.name);
      state.content[action.payload.contentType as ContentType].push(action.payload.name);
    },
    removeContent: (state, action) => {
      state.content[action.payload.contentType as ContentType] = state.content[action.payload.contentType as ContentType].filter((x : string) => x !== action.payload.name);
    },
  }
});


export const { addContent, removeContent } = contentSlice.actions

export default contentSlice.reducer