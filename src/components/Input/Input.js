import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './Input.css' 

const Input = ({ displayWrapper, setRef, onClear }) => (
  <div className={cx("Input__container", {
    colored: displayWrapper
  })}>
    <input 
      type="text" 
      className="Input__text" 
      placeholder="Search places"
      aria-label="Search places"
      ref={setRef} 
    />
    <button className="Input__clear-button" onClick={onClear}>Clear Input</button>
  </div>
)

Input.propTypes = {
  displayWrapper: PropTypes.bool,
  onClear: PropTypes.func,
  setRef: PropTypes.func,
}

export default Input