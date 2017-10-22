import React from 'react'
import PropTypes from 'prop-types'

import './PlacesList.css'

export const PlacesListItem = (props) => {
  const { name, preview, isOpen, address, onClick } = props
  return (
    <li>
      <button className="PlacesList__item" onClick={() => onClick(props)}>
        <div className="PlacesList__item-info">
          <div className="PlacesList__item-name">{name}</div>
          <div className="PlacesList__item-address">{address}</div>
          {isOpen && <div className="PlacesList__item-open">Open now</div>}
        </div>
        <div 
          className="PlacesList__item-preview" 
          style={{ backgroundImage: preview ? `url(${preview})` : 'none' }}
        >
          {preview == null && 'No Preview'}
        </div>
      </button>
    </li>
  )
}

PlacesListItem.propTypes = {
  address: PropTypes.string,
  isOpen: PropTypes.bool,
  name: PropTypes.string,
  preview: PropTypes.string,
  onClick: PropTypes.func,
}

const PlacesList = ({ items, onPlaceClick }) => items.length > 0 ? (
  <ul className="PlacesList__list">
    {items.map(item => <PlacesListItem onClick={onPlaceClick} key={item.id} {...item} />)}
  </ul>
) : (
  <div className="PlacesList__no-results">No results found</div>
)

PlacesList.propTypes = {
  items: PropTypes.array,
  onPlaceClick: PropTypes.func,
}

PlacesList.defaultProps = {
  items: [],
}

export default PlacesList