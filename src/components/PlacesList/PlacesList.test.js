import React from 'react'

import PlacesList, { PlacesListItem } from './PlacesList'

describe('PlacesList component', () => {
  let component

  beforeEach(() => {
    component = shallow(<PlacesList />)
  })
  
  it('Should match snapshot', () => {
    const props = {
      items: [{ id: '1' }, { id: '2' }, { id: '3' }],
      onPlaceCLick: () => {},
    }
    expect(renderer.create(<PlacesList {...props} />).toJSON()).toMatchSnapshot()
  })

  it('Should render PlacesListItem component for every element of items prop', () => {
    component.setProps({ items: [{ id: '1' }, { id: '2' }, { id: '3' }] })
    expect(component.find(PlacesListItem)).toHaveLength(3)
  })

  it('Should display "no result" response when items prop is empty', () => {
    component.setProps({ items: [] })
    expect(component.find('.PlacesList__no-results')).toHaveLength(1)
  })
})

describe('PlacesListItem', () => {
  let component

  beforeEach(() => {
    component = shallow(<PlacesListItem />)
  })

  it('Should match snapshot', () => {
    const props = {
      address: 'Testing address',
      isOpen: true,
      name: 'Some name',
      preview: 'some_url',
      onClick: () => {},
    }
    expect(renderer.create(<PlacesListItem {...props} />).toJSON()).toMatchSnapshot()
  })

  it('Should render address', () => {
    component.setProps({ address: 'Testing address' })
    expect(component.find('.PlacesList__item-address').text()).toBe('Testing address')
  })

  it('Should render name', () => {
    component.setProps({ name: 'Testing name' })
    expect(component.find('.PlacesList__item-name').text()).toBe('Testing name')
  })

  it('Should render preview image based on provided preview prop', () => {
    expect(component.find('.PlacesList__item-preview').text()).toBe('No Preview')
    component.setProps({ preview: 'some_url' })
    expect(component.find('.PlacesList__item-preview').text()).toBe('')
    expect(component.find('.PlacesList__item-preview').html().match(/style="([^"]*)"/i)[1])
      .toBe('background-image:url(some_url)')
  })

  it('Should render "Open now" label based on the isOpen prop', () => {
    component.setProps({ isOpen: false })
    expect(component.find('.PlacesList__item-open')).toHaveLength(0)
    component.setProps({ isOpen: true })
    expect(component.find('.PlacesList__item-open')).toHaveLength(1)
  })

  it('Should fire onClick prop on button click', () => {
    const mockFn = jest.fn()
    component.setProps({ onClick: mockFn })
    component.find('button').simulate('click')
    expect(mockFn).toBeCalled()
  })
})