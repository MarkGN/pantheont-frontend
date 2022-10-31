import { configureStore } from '@reduxjs/toolkit'
import tagFilterReducer from '../components/filterSlice'

export default configureStore({
  reducer: {
    tagFilter: tagFilterReducer
  },
})