import React from 'react';
import classnames from 'classnames';
import loadImage from './utils/loadImage.js';
import './FittedImage.scss';

const modern = ( window.CSS && CSS.supports && CSS.supports('object-fit', 'cover') );
const states = {
  PENDING:  0,
  LOADING:  1,
  LOADED:   2,
  DEAD:     3
};

const FittedImage = React.createClass({

  /*  Properties  */

  displayName: 'FittedImage',

  propTypes: {
    background: React.PropTypes.bool,
    className: React.PropTypes.string,
    fit: React.PropTypes.oneOf(['auto', 'contain', 'cover']),
    loader: React.PropTypes.element,
    src: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
    onLoad: React.PropTypes.func,
    onError: React.PropTypes.func
  },

  /* Lifecycle */

  getDefaultProps() {
    return {
      background: false,
      fit: 'auto',
      style: {},
      onLoad: () => {},
      onError: () => {}
    };
  },

  getInitialState() {
    return {
      status: states.PENDING
    };
  },

  componentDidMount() {
    if (this.props.loader) {
      this._loadImage();
    }
  },

  componentWillReceiveProps(props) {
    if (this.props.src !== props.src) {
      this._loadImage();
    }
  },

  render() {
    if ( !this.props.loader || this._isLoaded() ) {
      return this._getImage()
    } else {
      return this.props.loader;
    }
  },

  /* Custom */

  _getClassName( background ) {
    return classnames(
      'FittedImage',
      background ? 'FittedImage--background' : null,
      'FittedImage--' + this.props.fit,
       this.props.className
    );
  },

  _getImage() {
    const { background, src, onLoad, onError, ...props } = this.props;
    if ( !background && modern ) {
      return <img {...props} src={src} className={ this._getClassName(false) } />;
    } else {
      return <div {...props} style={ this._getStyle() } className={ this._getClassName(true) }></div>;
    }
  },

  _getStyle() {
    let style = this.props.style || {};
    style.backgroundImage = 'url(' + this.props.src + ')';
    return style;
  },

  _isLoaded() {
    return states.LOADED === this.state.status;
  },

  _loadImage() {
    this.setState({
      status: states.LOADING
    });
    loadImage( this.props.src ).then( this._onLoadSuccess, this._onLoadError );
  },

  _onLoadSuccess() {
    this.setState({
      status: states.LOADED
    });

    this.props.onLoad();
  },

  _onLoadError() {
    this.setState({
      status: states.DEAD
    });

    this.props.onError();
  }

});

export default FittedImage;
