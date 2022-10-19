import { configureStore } from '@reduxjs/toolkit'
import tagFilterReducer from '../components/tagFilterSlice'

export default configureStore({
  reducer: {
    tagFilter: tagFilterReducer
  },
})