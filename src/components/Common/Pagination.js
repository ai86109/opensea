import styled from 'styled-components'
import PropTypes from 'prop-types';

const PaginationWrapper = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;
  height: 30px;
`
const PageButton = styled.div`
  cursor: pointer;
  margin: 0 5px;
  &:before {
    content: "${props => props.type === 'left' ? "<" : ">" }";
  }
`
const PageNumberWrapper = styled.div`
  display: flex;
`
const PageNumber = styled.div`
  font-weight: ${props => props.center ? 800 : 400};
  margin: 0 10px;
  cursor: pointer;
`

function changePage(type, page, setPage, totalPages) {
  if(type === "pageup" && page > 1) setPage(page - 1)
  else if(type === "pagedown" && page < totalPages) setPage(page + 1)
}

function calcPageNumber(page, showPageNumber, totalPages) {
  if(totalPages >= showPageNumber) {
    const center = 3
    if(page <= center) return Array.from(Array(showPageNumber).keys(), ele => ele + 1)
    else if(page + 2 >= totalPages ) return Array.from(Array(showPageNumber).keys(), ele => totalPages - 4 + ele)
    return Array.from(Array(showPageNumber).keys(), ele => page - 2 + ele)
  } else if(totalPages > 0) return Array.from(Array(totalPages).keys(), ele => ele + 1)
}

function Pagination({page, setPage, showPageNumber, totalPages = 999}) {
  const pageNumber = calcPageNumber(page, showPageNumber, totalPages)

  return (
    <>
    {pageNumber &&
      <PaginationWrapper>
        <PageButton type="left" onClick={() => changePage("pageup", page, setPage, totalPages)} />
        <PageNumberWrapper>
          {pageNumber.map(page_num => (
            <PageNumber center={page_num === page} key={page_num} onClick={() => setPage(page_num)}>{page_num}</PageNumber>
          ))}
        </PageNumberWrapper>
        <PageButton type="right" onClick={() => changePage("pagedown", page, setPage, totalPages)} />
      </PaginationWrapper>
    }
    </>
  )
}

export default Pagination

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  showPageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number
}