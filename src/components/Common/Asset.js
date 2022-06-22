import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addList, removeList } from '../../redux/reducers/watchlistSlice'
import { setDataToken } from '../../webAPI'

const Bold_Text = styled.p`
  font-weight: 800;
`
const Ellipsis = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const AssetWrapper = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  width: 45vw;
  margin-bottom: 10px;
  overflow: hidden;
  height: fit-content;
  &:nth-child(2n) {
    margin-left: 10px;
  }
  @media screen and (min-width: 768px) {
    width: 166px;
    &:not(:nth-child(4n+1)) {
      margin-left: 10px;
    }
  }
  @media screen and (min-width: 1280px) {
    width: 300px;
  }
`
const AssetImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  @media screen and (min-width: 1280px) {
    height: 300px;
  }
`
const AssetInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding: 7px 5px;
`
const AssetInfoUpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const AssetName = styled.div`
  width: 60%;
`
const AssetNameTitle = styled(Bold_Text)``
const AssetNameContent = styled(Ellipsis)``
const AssetPrice = styled.div``
const AssetPriceTitle = styled(Bold_Text)``
const AssetPriceContent = styled.div``
const AssetAddress = styled.div`
  margin-top: 5px;
`
const AssetAddressTitle = styled(Bold_Text)``
const AssetAddressContent = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const AssetLastSoldPrice = styled(AssetAddress)``
const AssetLastSoldPriceTitle = styled(AssetAddressTitle)``
const AssetLastSoldPriceContent = styled(AssetAddressContent)``
const Button = styled.button`
  color: white;
  background: black;
  width: 100%;
  cursor: pointer;
  padding: 7px 0;
`

function handleClick(value, dispatch) {
  dispatch(addList({
    id: value.id,
    image_url: value.image_url,
    name: value.name,
    num_sales: value.num_sales,
    address: value.asset_contract.address,
    last_sold_price: value.last_sale.payment_token.usd_price,
    total_price: value.last_sale.total_price
  }))
}

function Asset({value, type}) {
  const dispatch = useDispatch()
  const listId = useSelector(state => state.watchlist.listId)
  const lists = useSelector(state => state.watchlist.lists)

  useEffect(() => {
    if(type === 'watchlist') setDataToken(lists)
  },[lists, type])

  return (
    <AssetWrapper>
      <AssetImage src={value.image_url}/>
      <AssetInfo>
        <AssetInfoUpper>
          <AssetName>
            <AssetNameTitle>Name</AssetNameTitle>
            <AssetNameContent>{value.name}</AssetNameContent>
          </AssetName>
          <AssetPrice>
            <AssetPriceTitle>Price</AssetPriceTitle>
            <AssetPriceContent>{value.num_sales}</AssetPriceContent>
          </AssetPrice>
        </AssetInfoUpper>
        <AssetAddress>
          <AssetAddressTitle>Address</AssetAddressTitle>
          <AssetAddressContent>{value.asset_contract?.address ?? value.address}</AssetAddressContent>
        </AssetAddress>
        {type === 'watchlist' ?
          <AssetLastSoldPrice>
            <AssetLastSoldPriceTitle>Last Sold Price(USD)</AssetLastSoldPriceTitle>
            <AssetLastSoldPriceContent>{value.last_sold_price}</AssetLastSoldPriceContent>
          </AssetLastSoldPrice> : ""
        }
      </AssetInfo>
      {type === 'listing' ?
        <Button onClick={() => handleClick(value, dispatch)}>{ listId.hasOwnProperty(value.id) ? "Already Added" : "Add to Watchlist"}</Button>
        : <Button onClick={() => dispatch(removeList({
          new_list: lists.filter(list => list.id !== value.id), 
          id: value.id
        }))}>remove from watchlist</Button>
      }
    </AssetWrapper>
  );
}

export default Asset;