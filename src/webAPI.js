const BASE_URL = 'https://testnets-api.opensea.io/api/v1'
const TOKEN_NAME = 'token'

export const getAssets = (offset = 0, limit = 4) => {
  return fetch(`${BASE_URL}/assets?order_by=sale_count&order_direction=desc&offset=${offset}&limit=${limit}&include_orders=false`, {method: 'GET'})
    .then(res => res.json())
}

export const getEvent = (address) => {
  return fetch(`${BASE_URL}/events?asset_contract_address=${address}&only_opensea=false&limit=100`, {method: 'GET', headers: {Accept: 'application/json'}})
    .then(res => res.json())
}

export const setDataToken = (token) => {
  localStorage.setItem(TOKEN_NAME, JSON.stringify(token))
}

export const getDataToken = () => {
  return localStorage.getItem(TOKEN_NAME)
}

export const getCache = () => {
  const cacheLists = JSON.parse(getDataToken())
  let cacheListId = {}
  if(cacheLists) {
    for(let list of cacheLists) {
      cacheListId[list.id] = true
    }
    return {cacheLists, cacheListId}
  }
  return {cacheLists: [], cacheListId}
}