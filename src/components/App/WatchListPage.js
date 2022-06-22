import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Pagination from "../Common/Pagination";
import { removeList } from '../../redux/reducers/watchlistSlice'
import { setDataToken } from '../../webAPI'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const WatchListPageWrapper = styled(Wrapper)``
const WatchListWrapper = styled(Wrapper)``
const AssetWrapper = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  width: 40vw;
  margin-bottom: 10px;
  overflow: hidden;
  &:nth-child(2n) {
    margin-left: 10px;
  }
`
const AssetImage = styled.img`
  width: 100%;
  height: 
`
const AssetInfo = styled.div`
  display: flex;
`
const AssetName = styled.div``
const AssetNameTitle = styled.div``
const AssetNameContent = styled.div``
const AssetPrice = styled.div``
const AssetPriceTitle = styled.div``
const AssetPriceContent = styled.div``
const Button = styled.button`
  color: white;
  background: black;
  width: 100%;
  cursor: pointer;
`

function AssetBlock({value}) {
  const dispatch = useDispatch()
  const lists = useSelector(state => state.watchlist.lists)
  setDataToken(lists)

  return (
    <AssetWrapper>
      <AssetImage src={value.image_url}/>
      <AssetInfo>
        <AssetName>
          <AssetNameTitle>Name</AssetNameTitle>
          <AssetNameContent>{value.name}</AssetNameContent>
        </AssetName>
        <AssetPrice>
          <AssetPriceTitle>Price</AssetPriceTitle>
          <AssetPriceContent>{value.num_sales}</AssetPriceContent>
        </AssetPrice>
        {/* <div>{value.asset_contract.address}</div> */}
      </AssetInfo>
      <Button onClick={() => dispatch(removeList({
        new_list: lists.filter(list => list.id !== value.id), 
        id: value.id
      }))}>remove from watchlist</Button>
    </AssetWrapper>
  )
}

function WatchListPage() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const assetsPerPage = 4
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
      <div>Total watched values: ${totalPrice}(USD)</div>
      <div>Total watched assets sold price: $10000(USD)</div>
      <WatchListWrapper>
        {data.map(list => (
          <AssetBlock value={list} key={list.id} />
        )).slice((page -1) * assetsPerPage, page * assetsPerPage)}
      </WatchListWrapper>
      {<Pagination page={page} setPage={setPage} showPageNumber={showPageNumber} totalPages={totalPages} />}
    </WatchListPageWrapper>
  );
}

export default WatchListPage;