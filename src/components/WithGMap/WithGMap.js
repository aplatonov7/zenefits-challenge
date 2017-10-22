import React, { Component } from 'react'

import LoadingScreen from '../LoadingScreen'
import ErrorScreen from '../ErrorScreen'

import loadGoogleMaps from './utils/loadGoogleMaps'

const WithGMap = (bootstrapURLKeys) => (BaseComponent) => {
  class Container extends Component {
    state = {
      loading: true,
      map: null,
      error: false,
    }

    componentWillMount() {
      this.setState({ loading: true })
      loadGoogleMaps(bootstrapURLKeys)
        .then(map => {
          this.setState({ loading: false, map })
        })
        .catch(() => {
          this.setState({ loading: false, error: true })
        })
    }

    render() {
      if (this.state.loading) 
        return <LoadingScreen />

      if (this.state.error) 
        return <ErrorScreen>Failed to load google maps</ErrorScreen>
      
      return <BaseComponent {...this.props} maps={this.state.map} />
    }
  }

  return Container
} 

export default WithGMap