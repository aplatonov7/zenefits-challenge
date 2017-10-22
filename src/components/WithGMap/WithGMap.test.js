import React from 'react'

import WithGMap from './WithGMap'
import * as loadGoogleMaps from './utils/loadGoogleMaps'

describe('WithGMap component', () => {
  const dummyComponent = () => <span>Content</span> 

  it('Should call loadGoogleMaps before mount', () => {
    const keys = { key: 'value' }
    let called = false, calledArgs = null
    loadGoogleMaps.default = (args) => new Promise((resolve, reject) => {
      called = true
      calledArgs = args
    })
    mount(React.createElement(WithGMap(keys)(dummyComponent)))
    expect(called).toBe(true)
    expect(calledArgs).toBe(keys)
  })

  it('Should display LoadingScreen while loading gmaps', () => {
    loadGoogleMaps.default = () => Promise.resolve()
    const component = mount(React.createElement(WithGMap()(dummyComponent)))
    expect(component.find('LoadingScreen')).toHaveLength(1)
  })

  it('Should display ErrorScreen on failed load', (done) => {
    loadGoogleMaps.default = () => Promise.reject()
    const component = mount(React.createElement(WithGMap()(dummyComponent)))
    setImmediate(() => {
      try {
        component.update()
        expect(component.find('ErrorScreen')).toHaveLength(1)
      } catch(e) {
        done.fail(e)
      }
      done()
    })
  })

  it('Should display passed component with props on successfull load', (done) => {
    const maps = {}
    loadGoogleMaps.default = () => new Promise(resolve => resolve(maps))
    const component = mount(React.createElement(WithGMap()(dummyComponent)))
    setImmediate(() => {
      try {
        component.update()
        expect(component.find(dummyComponent)).toHaveLength(1)
        expect(component.find(dummyComponent).props().maps).toBe(maps)
      } catch(e) {
        done.fail(e)
      }
      done()
    })
  })
})