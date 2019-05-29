import React, {Component} from 'react'
import PropTypes from 'prop-types';

import isModern from './utils/isModern'
import loadImage from './utils/loadImage'
import states from './utils/states'

import './index.css'

class FittedImage extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      status: states.PENDING
    }
  }

  componentDidMount() {
    if (this.props.loader) {
      this._loadImage();
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.src !== props.src) {
      this._loadImage();
    }
  }

  render() {
    if (this.props.loader && !this._isLoaded()) {
      return this.props.loader;
    }

    return this._getImage()
  }

  _getClassName(background) {
    return [
      'FittedImage',
      background ? 'FittedImage--background' : null,
      'FittedImage--' + this.props.fit,
       this.props.className
    ].filter(item => !!item).join(' ')
  }

  _getImage() {
    /* eslint-disable no-unused-vars */
    const { background, fit, src, loader, onLoad, onError, ...props } = this.props

    if ( !background && isModern ) {
      return <img {...props} src={src} className={this._getClassName(false)} />
    }

    return (
      <div {...props} 
        style={Object.assign({}, this.props.style, {backgroundImage: `url(${this.props.src})`})} 
        className={this._getClassName(true)} />
    )
  }

  _isLoaded() {
    return states.LOADED === this.state.status
  }

  async _loadImage() {
    this.setState({
      status: states.LOADING
    })

    try {
      await loadImage(this.props.src)
    } catch(err) {
      this._onLoadError()
    }

    this._onLoadSuccess()
  }

  _onLoadSuccess() {
    this.setState({
      status: states.LOADED
    })

    this.props.onLoad()
  }

  _onLoadError() {
    this.setState({
      status: states.DEAD
    })

    this.props.onError()
  }

}

FittedImage.propTypes = {
  background: PropTypes.bool,
  className: PropTypes.string,
  fit: PropTypes.oneOf(['auto', 'contain', 'cover']),
  loader: PropTypes.element,
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  onLoad: PropTypes.func,
  onError: PropTypes.func
}

FittedImage.defaultProps = {
  background: false,
  fit: 'auto',
  style: {},
  onLoad: () => {},
  onError: () => {}
}

export default FittedImage