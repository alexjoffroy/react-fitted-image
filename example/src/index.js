import React from 'react';
import { render } from 'react-dom';
import FittedImage from '../../lib/react-fitted-image.js';

const fitOptions = [
  { value: 'auto', label: 'Auto' },
  { value: 'contain', label: 'Contain' },
  { value: 'cover', label: 'Cover' }
];
const sizeOptions = [
  { value: '1200/700', label: '1200x700' },
  { value: '500/800', label: '500x800' },
  { value: '900/900', label: '900x900' }
];

const App = React.createClass({

  getInitialState() {
    return {
      fit: 'contain',
      size: '1200/700'
    };
  },

  getFitOptions() {
    return fitOptions.map( (opt, key) => {
      return <option value={opt.value} key={key}>{opt.label}</option>;
    });
  },

  getSizeOptions() {
    return sizeOptions.map( (opt, key) => {
      return <option value={opt.value} key={key}>{opt.label}</option>;
    });
  },

  onPropChange(prop, e)  {
    let state = {};
    state[prop] = e.target.value;
    this.setState(state);
  },

  render() {
    return (
      <div className="App">
          <div className="Settings">
            <label>Fit property</label>
            <select value={this.state.fit} onChange={this.onPropChange.bind(this, 'fit')}>
              {this.getFitOptions()}
            </select>
          </div>
          <div className="Settings">
            <label>Image size</label>
            <select value={this.state.size} onChange={this.onPropChange.bind(this, 'size')}>
              {this.getSizeOptions()}
            </select>
          </div>
        <div className="Wrapper">
          <FittedImage
            fit={this.state.fit}
            src={'https://placeimg.com/'+this.state.size+'/animals'}
            loader={<div className="Loader">Loading...</div>} />
        </div>
      </div>
    );
  }

})

render(<App />, document.getElementById('app'));
