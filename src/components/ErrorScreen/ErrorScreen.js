import React from 'react'
import PropTypes from 'prop-types'

import './ErrorScreen.css'

const ErrorScreen = ({ children, title }) => (
  <div className="ErrorScreen__container">
    <h1>{title || 'Sorry, something went terribly wrong'}</h1>
    {children}
  </div>
)

ErrorScreen.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}

export default ErrorScreen