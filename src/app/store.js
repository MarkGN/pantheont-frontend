import { configureStore } from '@reduxjs/toolkit'
import tagFilterReducer from '../components/plantFilterSlice'

export default configureStore({
  reducer: {
    tagFilter: tagFilterReducer
  },
})