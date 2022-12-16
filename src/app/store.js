import { configureStore } from '@reduxjs/toolkit'
// import tagFilterReducer from '../components/filterSlice'
import contentReducer from "./contentSlice"
import searchReducer from "./searchSlice"
// import groupReducer from "../components/groupSlice"

export default configureStore({
  reducer: {
    content: contentReducer,
    search: searchReducer,
    // group: groupReducer,
    // tagFilter: tagFilterReducer
  },
})