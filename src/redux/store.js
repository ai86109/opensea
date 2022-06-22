import { configureStore } from '@reduxjs/toolkit'
import watchlistReducer from './reducers/watchlistSlice'

export default configureStore({
  reducer: {
    watchlist: watchlistReducer,
  },
})