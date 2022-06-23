import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addList, removeList } from '../../redux/reducers/watchlistSlice'
import { setDataToken } from '../../webAPI'
import PropTypes from 'prop-types';

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
const AssetTitle = styled(Bold_Text)``
const AssetNameContent = styled(Ellipsis)``
const AssetPrice = styled.div``
const AssetPriceContent = styled.div``
const AssetAddress = styled.div`
  margin-top: 5px;
`
const AssetAddressContent = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const AssetLastSoldPrice = styled(AssetAddress)``
const AssetLastSoldPriceContent = styled(AssetAddressContent)``
const Button = styled.button`
  color: white;
  background: black;
  width: 100%;
  cursor: pointer;
  padding: 7px 0;
`

function handleClick({id, image_url, name, num_sales, asset_contract:{address}, last_sale:{payment_token:{usd_price:last_sold_price}, total_price}}, dispatch) {
  dispatch(addList({
    id,
    image_url,
    name,
    num_sales,
    address,
    last_sold_price,
    total_price
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
            <AssetTitle>Name</AssetTitle>
            <AssetNameContent>{value.name}</AssetNameContent>
          </AssetName>
          <AssetPrice>
            <AssetTitle>Price</AssetTitle>
            <AssetPriceContent>{value.num_sales}</AssetPriceContent>
          </AssetPrice>
        </AssetInfoUpper>
        <AssetAddress>
          <AssetTitle>Address</AssetTitle>
          <AssetAddressContent>{value.asset_contract?.address ?? value.address}</AssetAddressContent>
        </AssetAddress>
        {type === 'watchlist' ?
          <AssetLastSoldPrice>
            <AssetTitle>Last Sold Price(USD)</AssetTitle>
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

Asset.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.number,
    image_url: PropTypes.string,
    name: PropTypes.string,
    num_sales: PropTypes.number,
    asset_contract: PropTypes.shape({
      address: PropTypes.string
    }),
    address: PropTypes.string,
    last_sold_price: PropTypes.string
  }),
  type: PropTypes.string.isRequired
}