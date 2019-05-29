import React from 'react'
import expect from 'expect'
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FittedImage from 'src/'

configure({ adapter: new Adapter() });

describe('FittedImage', () => {

  it('should have the "FittedImage" and "FittedImage--auto" classes by default', () => {

    const wrapper = mount(<FittedImage src="123.jpg" />)

    expect(wrapper.children().length).toBe(1)
    expect(wrapper.find('.FittedImage.FittedImage--auto').length).toBe(1)

  })

  it('should render a div tag with "FittedImage--background" when browser does not support object-fit', () => {

    const wrapper = mount(<FittedImage src="123.jpg" />)

    expect(wrapper.children().length).toBe(1)
    expect(wrapper.find('.FittedImage--background').length).toBe(1)

  })

  it('should render a div tag with "FittedImage--background" when background=true', () => {

    const wrapper = mount(<FittedImage src="123.jpg" background={true} />)

    expect(wrapper.children().length).toBe(1)
    expect(wrapper.find('.FittedImage--background').length).toBe(1)

  })

  it('should have the "FittedImage--contain" class when fit="contain"', () => {

    const wrapper = mount(<FittedImage src="123.jpg" fit="contain" />)

    expect(wrapper.children().length).toBe(1)
    expect(wrapper.find('.FittedImage--contain').length).toBe(1)

  })

  it('should have the "FittedImage--contain" class when fit="cover"', () => {

    const wrapper = mount(<FittedImage src="123.jpg" fit="cover" />)

    expect(wrapper.children().length).toBe(1)
    expect(wrapper.find('.FittedImage--cover').length).toBe(1)

  })

  it('should accept custom classes', () => {

    const wrapper = mount(<FittedImage src="123.jpg" className="CustomClass OtherOne" />)

    expect(wrapper.children().length).toBe(1)
    expect(wrapper.find('.FittedImage.CustomClass.OtherOne').length).toBe(1)

  })

  it('should accept custom styles', () => {

    const wrapper = mount(<FittedImage src="123.jpg" style={{width: '200px'}} />)

    expect(wrapper.children().length).toBe(1)
    expect(wrapper.find('.FittedImage').length).toBe(1)
    expect(wrapper.find('.FittedImage').first().props().style.width).toBe('200px')
    
  })
  
})
