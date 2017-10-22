import React from 'react'

import Input from './Input'

describe('Input component', () => {
  let component

  beforeEach(() => {
    component = shallow(<Input />)
  })

  it('Should match snapshot', () => {
    const props = { diplayWrapper: true, onClear: () => {} }
    expect(renderer.create(<Input {...props} />).toJSON()).toMatchSnapshot()
  })

  it('Should display colored wrapper when diplayWrapper prop is set', () => {
    component.setProps({ displayWrapper: true })
    expect(component.hasClass('colored')).toBe(true)
  })

  it('Should fire onClear prop on clear button click', () => {
    const mockFn = jest.fn()
    component.setProps({ onClear: mockFn })
    component.find('button.Input__clear-button').simulate('click')
    expect(mockFn).toBeCalled()
  })
})