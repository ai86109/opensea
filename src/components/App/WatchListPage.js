import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Pagination from "../Common/Pagination";
import Asset from "../Common/Asset";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
`
const WatchListPageWrapper = styled(Wrapper)`
  flex-direction: column;
  align-items: center;
`
const WatchListWrapper = styled(Wrapper)`
  justify-content: space-around;
  @media screen and (min-width: 768px) {
    justify-content: center;
  }
  @media screen and (min-width: 1280px) {
    width: 1280px;
  }
`
const AssetBlank = styled.div`
  width: 45vw;
  margin-left: 10px;
  @media screen and (min-width: 768px) {
    width: 166px;
  }
  @media screen and (min-width: 1280px) {
    width: 300px;
  }
`
const Bold_Text = styled.p`
  font-weight: 800;
`
const Title = styled(Bold_Text)`
  width: 100%;
  text-align: center;
`
const ValueWrapper = styled.div`
  margin: 10px;
`
const Value = styled.div`
  font-size: 12px;
  font-weight: 500;
  & + & {
    margin-top: 10px;
  }
  &:after {
    content: "(USD)"
  }
`

function WatchListPage() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const assetsPerPage = window.innerWidth < 768 ? 4 : 8
  const showPageNumber = 5
  let totalPages = Math.ceil(data.length / assetsPerPage )
  let lists= useSelector(state => state.watchlist.lists)

  useEffect(() => {
    let sum = 0
    setData(lists)
    for(let list of lists) {
      sum = Number(list.total_price) + sum
    }
    setTotalPrice(sum)
  },[lists])

  return (
    <WatchListPageWrapper>
      <Title>Watchlist</Title>
      <ValueWrapper>
        <Value>Total watched values: ${totalPrice}</Value>
        <Value>Total watched assets sold price: $10000</Value>
      </ValueWrapper>
      <WatchListWrapper>
        {data.map(list => (
          <Asset value={list} key={list.id} type={'watchlist'} />
        )).slice((page -1) * assetsPerPage, page * assetsPerPage)}
        <AssetBlank/>
        <AssetBlank/>
        <AssetBlank/>
      </WatchListWrapper>
      {<Pagination page={page} setPage={setPage} showPageNumber={showPageNumber} totalPages={totalPages} />}
    </WatchListPageWrapper>
  );
}

export default WatchListPage;