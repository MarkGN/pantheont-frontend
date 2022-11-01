import { configureStore } from '@reduxjs/toolkit'
import tagFilterReducer from '../components/filterSlice'
import groupReducer from "../components/groupSlice";

export default configureStore({
  reducer: {
    group: groupReducer,
    tagFilter: tagFilterReducer
  },
})