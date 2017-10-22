import React, { Component } from 'react'

import { API_KEY, SEARCH_RADIUS, DEFAULT_ZOOM, DEFAULT_CENTER } from '../../config'

import Drawer from '../Drawer'
import Input from '../Input'
import PlacesList from '../PlacesList'
import WithGMap from '../WithGMap'

import './App.css'

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      markers: [], 
      places: null,
      opened: true,
    }
  }

  componentDidMount() {
    const maps = this.props.maps

    if (maps === undefined)
      return

    // Creating Google Map instance and attaching it to our map container
    this.map = new maps.Map(this.mapRef, {
      center: DEFAULT_CENTER,
      disableDefaultUI: true,
      gestureHandling: 'greedy',
      zoom: DEFAULT_ZOOM,
      zoomControl: true,
    })

    // Trying to center our map to user location 
    if (window.navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const center = new maps.LatLng(
          position.coords.latitude, 
          position.coords.longitude
        )
        this.map.setCenter(center)
      })
    }      

    // Initializing Google SearchBox on our input
    this.searchBox = new maps.places.SearchBox(this.searchBoxRef)
    
    this.map.addListener('bounds_changed', this.onBoundChanged)
    this.searchBox.addListener('places_changed', this.onPlacesChanged)
  }

  onBoundChanged = () => {
    this.searchBox.setBounds(this.map.getBounds())
  }

  onPlacesChanged = () => {
    const maps = this.props.maps

    this.searchBoxRef.blur()

    // Grabbing list of places from our SearchBox 
    const places = this.searchBox.getPlaces()
    
    if (places.length === 0) {
      this.setState({ places: [] })
      return
    }
    
    this.clearMarkers()
    
    const relevantPlaces = [], center = this.map.getCenter()
    const bounds = new maps.LatLngBounds()
    const markers = []

    places.forEach(place => {
      // If place does not have coordinates, just ignore it
      if (!place.geometry || !place.geometry.location)
        return

      const distance = maps.geometry.spherical.computeDistanceBetween(
        center, 
        place.geometry.location
      )

      // If place if not withing the SEARCH_RADIUS from the center - ignore it aswell 
      if (distance > SEARCH_RADIUS)
        return

      // Create a marker for this place
      const marker = new maps.Marker({
        map: this.map,
        title: place.name,
        position: place.geometry.location,
      })

      markers.push(marker)

      // Extract relevant information from the place object, and store it
      const transformPlace = (place) => {
        const { name, formatted_address, photos, opening_hours, id } = place
        let preview = null, isOpen = false
        if (photos && photos[0] && photos[0].getUrl)
          preview = photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 })
        if (opening_hours && opening_hours.open_now)
          isOpen = true
        return { address: formatted_address, id, name, preview, isOpen, marker }
      }

      relevantPlaces.push(transformPlace(place))

      // Update our new map bounds 
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    })
    
    // Fit our map to the new bounds (skip this step if we did not update bounds even once)
    if (relevantPlaces.length > 0)
      this.map.fitBounds(bounds)

    this.setState({ markers, places: relevantPlaces })
  }

  onPlaceClick = (place) => {
    const currentWidth = this.containerRef.clientWidth
    // Close Drawer on small resolution screens
    if (currentWidth < 600)
      this.setOpened(false)
    // Pan to selected place's marker and animate it 
    this.map.panTo(place.marker.position)
    this.state.markers.forEach(marker => marker.setAnimation(null))
    place.marker.setAnimation(this.props.maps.Animation.BOUNCE)
  }

  clearMarkers = () => {
    this.state.markers.forEach(marker => marker.setMap(null))
  }

  setOpened = (opened) => {
    this.setState({ opened })
  }

  clearPlaces = () => {
    this.setState({ places: null })
    this.clearMarkers()
    this.searchBoxRef.value = ''
  }

  setSearchBoxRef = ref => {
    this.searchBoxRef = ref
  }

  onClick = e => {
    // Force-clearing focus on our SearchBox, otherwise focus will not be cleared on tap on mobile 
    if (e.target !== this.searchBoxRef)
      this.searchBoxRef.blur()
  }

  render() {
    const haveResults = this.state.places !== null

    return (
      <main 
        className='App__container' 
        onClick={this.onClick} 
        ref={r => (this.containerRef = r)}
      >
        <Drawer 
          opened={this.state.opened || !haveResults} 
          setOpened={this.setOpened} 
          showToggleButton={haveResults}
        >
          <Input 
            displayWrapper={haveResults} 
            onClear={this.clearPlaces} 
            setRef={this.setSearchBoxRef} 
          />
          {haveResults && <PlacesList items={this.state.places} onPlaceClick={this.onPlaceClick} />}     
        </Drawer>  
        <div ref={(r) => (this.mapRef = r)} className='App__map' />
      </main>
    )
  }
}

export default WithGMap({ key: API_KEY, libraries: 'places,geometry' })(App)