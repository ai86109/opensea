import { createSlice } from '@reduxjs/toolkit'

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    lists: [],
    listId: {}
  },
  reducers: {
    addList: (state, action) => {
      if(!state.listId.hasOwnProperty(action.payload.id)) {
        state.listId[action.payload.id] = true
        state.lists.push(action.payload)
      }
    },
    removeList: (state, action) => {
      state.lists = action.payload.new_list
      delete state.listId[action.payload.id]
    },
    setList: (state, action) => {
      state.lists = action.payload.cacheLists
      state.listId = action.payload.cacheListId
    }
  }
})

export const { addList, removeList, setList } = watchlistSlice.actions

export default watchlistSlice.reducer