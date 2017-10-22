import React from 'react'

import ErrorScreen from './ErrorScreen'

describe('ErrorScreen component', () => {
  let component

  beforeEach(() => {
    component = shallow(<ErrorScreen />)
  })

  it('Should match snapshot', () => {
    const props = { children: 'Inner content', title: 'Custom title' }
    expect(renderer.create(<ErrorScreen {...props} />).toJSON()).toMatchSnapshot()
  })

  it('Should render title', () => {
    component.setProps({ title: 'Custom title' })
    expect(component.find('h1').text()).toEqual('Custom title')
  })

  it('Should render children', () => {
    component.setProps({ children: 'Inner content' })
    expect(component.contains('Inner content')).toBe(true)
  })
})