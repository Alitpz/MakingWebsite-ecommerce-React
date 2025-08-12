import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../redux/slices/productSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
})

