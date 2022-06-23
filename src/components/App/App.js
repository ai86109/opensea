import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from '../Layout';
import ListingPage from './ListingPage'
import WatchListPage from './WatchListPage'
import { getCache } from '../../webAPI'
import { setList } from '../../redux/reducers/watchlistSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setList(getCache()))
  })

  return (
    <BrowserRouter basename="/opensea">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ListingPage />} />
          <Route path="/watchlist" element={<WatchListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
