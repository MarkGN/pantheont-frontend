import { configureStore } from '@reduxjs/toolkit'
import tagFilterReducer from '../components/plants/plantFilterSlice'

export default configureStore({
  reducer: {
    tagFilter: tagFilterReducer
  },
})