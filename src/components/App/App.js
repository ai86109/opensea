import Layout from '../Layout';
import ListingPage from './ListingPage'
import WatchListPage from './WatchListPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCache } from '../../webAPI'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setList } from '../../redux/reducers/watchlistSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setList(getCache()))
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/opensea" element={<Layout />}>
          <Route path="listing" element={<ListingPage />} />
          <Route path="watchlist" element={<WatchListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
