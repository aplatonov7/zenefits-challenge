import React from 'react'

import { App } from './App'

describe('App component', () => {
  it('Should match snapshot', () => {
    expect(renderer.create(<App />).toJSON()).toMatchSnapshot()
  })
})