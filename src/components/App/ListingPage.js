import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { getAssets } from '../../webAPI'
import Pagination from "../Common/Pagination";
import Asset from "../Common/Asset";

const Loading = styled.div`
  margin-top: 200px;
  align-items: center;
  font-size: 26px;
  font-weight: 800;
`
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
`
const ListingPageWrapper = styled(Wrapper)`
  flex-direction: column;
  align-items: center;
`
const AssetsWrapper = styled(Wrapper)`
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

function ListingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const assetsPerPage = window.innerWidth < 768 ? 4 : 8
  const showPageNumber = 5

  useEffect(() => {
    setIsLoading(true)
    getAssets((page - 1)*assetsPerPage, assetsPerPage).then(response => {
      setData(response.assets)
      setIsLoading(false)
    })
  },[page, assetsPerPage])

  return (
    <ListingPageWrapper>
      {isLoading && <Loading>Loading...</Loading>}
      {!isLoading &&
      <>
        <Title>NFTs</Title>
        <AssetsWrapper>
          {data && data.map(asset => (
            <Asset value={asset} key={asset.id} type={'listing'} />
          ))}
          <AssetBlank/>
          <AssetBlank/>
          <AssetBlank/>
        </AssetsWrapper>
        <Pagination page={page} setPage={setPage} showPageNumber={showPageNumber}/>
      </>
      }
    </ListingPageWrapper>
  );
}

export default ListingPage;