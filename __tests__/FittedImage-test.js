import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

const component = '../src/FittedImage.js';
jest.unmock(component);
jest.unmock('classnames');
jest.unmock('prop-types');

const FittedImage = require(component);

describe('FittedImage', () => {

  it('should render a div tag with "FittedImage--background" when browser does not support object-fit', () => {

    const instance = renderIntoDocument( <FittedImage src="123.jpg" />);
    expect( findDOMNode(instance).tagName ).toBe( 'DIV' );
    expect( findDOMNode(instance).className ).toContain( 'FittedImage--background' );

  });

  it('should render a div tag with "FittedImage--background" when background=true', () => {

    const instance = renderIntoDocument( <FittedImage src="123.jpg" background={true} />);
    expect( findDOMNode(instance).tagName ).toBe( 'DIV' );
    expect( findDOMNode(instance).className ).toContain( 'FittedImage--background' );

  });

  it('should have the "FittedImage" class', () => {

    const instance = renderIntoDocument(
      <FittedImage src="123.jpg" />
    );
    expect( findDOMNode(instance).className ).toContain( 'FittedImage' );

  });

  it('should have the "FittedImage--auto" class in default mode', () => {

    const instance = renderIntoDocument(
      <FittedImage src="123.jpg" />
    );
    expect( findDOMNode(instance).className ).toContain( 'FittedImage--auto' );

  });

  it('should have the "FittedImage--contain" class when fit="contain"', () => {

    const instance = renderIntoDocument(
      <FittedImage fit="contain" src="123.jpg" />
    );
    expect( findDOMNode(instance).className ).toContain( 'FittedImage--contain' );

  });

  it('should have the "FittedImage--cover" class when fit="cover"', () => {

    const instance = renderIntoDocument(
      <FittedImage fit="cover" src="123.jpg" />
    );
    expect( findDOMNode(instance).className ).toContain( 'FittedImage--cover' );

  });

  it('should accept custom classes', () => {

    const customClass = 'CustomClass';
    const instance = renderIntoDocument(
      <FittedImage fit="cover" src="123.jpg" className={customClass} />
    );
    expect( findDOMNode(instance).className ).toContain( customClass );

  });

  it('should accept custom styles', () => {

    const customStyle = { width: '200px' };
    const instance = renderIntoDocument(
      <FittedImage fit="cover" src="123.jpg" style={customStyle} />
    );
    expect( findDOMNode(instance).style.width ).toEqual( customStyle.width );

  });

});
