import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Swipeable from 'react-swipeable'

import './Drawer.css'

const Drawer = ({ children, showToggleButton, opened, setOpened }) => (
  <Swipeable className={cx('Drawer__container', {
    'opened': opened,
    'full-height': showToggleButton,
  })} onSwipedRight={() => setOpened(true)} onSwipedLeft={() => setOpened(false)}>
    {children}
    {showToggleButton && (
      <button className="Drawer__button" onClick={() => setOpened(!opened)}>
        Toggle the drawer
      </button>
    )}
    <div className="Drawer__anchor"></div>
  </Swipeable>
)

Drawer.propTypes = {
  children: PropTypes.node,
  opened: PropTypes.bool,
  showToggleButton: PropTypes.bool,
  setOpened: PropTypes.func,
}

export default Drawer