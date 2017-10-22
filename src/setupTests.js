import raf from './tempPolyfill'
import Enzyme, { shallow, render, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

global.shallow = shallow
global.render = render
global.mount = mount
global.renderer = renderer

Enzyme.configure({ adapter: new EnzymeAdapter() })