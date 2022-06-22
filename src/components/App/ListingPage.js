import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getAssets, setDataToken } from '../../webAPI'
import Pagination from "../Common/Pagination";
import { addList } from '../../redux/reducers/watchlistSlice'

const Loading = styled.div``
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const ListingPageWrapper = styled(Wrapper)``
const AssetsWrapper = styled(Wrapper)``
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

function handleClick(value, dispatch) {
  dispatch(addList({
    id: value.id,
    image_url: value.image_url,
    name: value.name,
    num_sales: value.num_sales,
    address: value.asset_contract.address,
    total_price: value.last_sale.total_price
  }))
}

function AssetBlock({value}) {
  const dispatch = useDispatch()
  const listId = useSelector(state => state.watchlist.listId)
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
        {<div>{value.asset_contract.address}</div>}
        {/* <div>{value.asset_contract.address}</div> */}
      </AssetInfo>
      <Button onClick={() => handleClick(value, dispatch)}>{ listId.hasOwnProperty(value.id) ? "Already Added" : "Add to Watchlist"}</Button>
    </AssetWrapper>
  )
}

function ListingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const assetsPerPage = 4
  const showPageNumber = 5

  useEffect(() => {
    setIsLoading(true)
    getAssets((page - 1)*assetsPerPage, assetsPerPage).then(response => {
      setData(response.assets)
      setIsLoading(false)
    })
    // getEvent('0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656').then(response => console.log(response))
  },[page, assetsPerPage])

  return (
    <ListingPageWrapper>
      {isLoading && <Loading>Loading...</Loading>}
      <AssetsWrapper>
        {!isLoading && data && data.map(asset => (
          <AssetBlock value={asset} key={asset.id} />
        ))}
      </AssetsWrapper>
      {!isLoading && <Pagination page={page} setPage={setPage} showPageNumber={showPageNumber} />}
    </ListingPageWrapper>
  );
}

export default ListingPage;