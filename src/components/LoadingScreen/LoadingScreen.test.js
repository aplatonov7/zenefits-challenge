import React from 'react'

import LoadingScreen from './LoadingScreen'

describe('LoadingScreen component', () => {
  it('Should match snapshot', () => {
    expect(renderer.create(<LoadingScreen />).toJSON()).toMatchSnapshot()
  })
})