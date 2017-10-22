import React from 'react'

import Drawer from './Drawer'

describe('Drawer component', () => {
  let component

  beforeEach(() => {
    component = shallow(<Drawer />)
  })

  it('Should match snapshot', () => {
    const props = {
      opened: true,
      showToggleButton: true,
      children: 'Inner content',
      setOpened: jest.fn(), 
    }
    expect(renderer.create(<Drawer {...props} />).toJSON()).toMatchSnapshot()
  })

  it('Should show and hide button based on showToggleButton prop', () => {
    component.setProps({ showToggleButton: true })
    expect(component.find('button.Drawer__button')).toHaveLength(1)
    component.setProps({ showToggleButton: false })
    expect(component.find('button.Drawer__button')).toHaveLength(0)
  })

  it('Should add .opened class to the container based on opened prop', () => {
    component.setProps({ opened: false })
    expect(component.hasClass('opened')).toBe(false)
    component.setProps({ opened: true })
    expect(component.hasClass('opened')).toBe(true)
  })

  it('Should fire setOpened prop on toggle button click', () => {
    const mockFn = jest.fn()
    component.setProps({ showToggleButton: true, setOpened: mockFn })
    component.find('button.Drawer__button').simulate('click')
    expect(mockFn).toBeCalled()
  })
  
  it('Should render children', () => {
    component.setProps({ children: 'Inner content' })
    expect(component.contains('Inner content')).toBe(true)
  })
})