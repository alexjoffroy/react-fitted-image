<a href="https://www.npmjs.com/package/react-fitted-image"><img src="https://img.shields.io/npm/dt/react-fitted-image.svg" alt="Total Downloads"></a>
<a href="https://github.com/alexjoffroy/react-fitted-image/releases"><img src="https://img.shields.io/npm/v/react-fitted-image.svg" alt="Latest Release"></a>
<a href="https://github.com/alexjoffroy/react-fitted-image/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/react-fitted-image.svg" alt="License"></a>

# react-fitted-image

Pictures are always difficult to handle in web page, especially in a responsive way. A well-known workaround is to style the img tag with something like this:

```css
img {
  max-width: 100%;
  height: auto;
}
```

This method works well, but there is a lot of cases where it's not sufficient. Fortunately CSS introduced some times ago the ["object-fit" property](https://developer.mozilla.org/fr/docs/Web/CSS/object-fit), improving the way we can handle image displaying.
The current component provides an easy react binding to display images with object-fit property.

In addition, you can provide a loader which will be displayed during the image processing by the browser.

Object-fit is well supported by browsers but not all of them for now ( see [Caniuse](http://caniuse.com/#feat=object-fit) ). To work on stuffs like IE, a basic test is done with [CSS.supports](https://developer.mozilla.org/en/docs/Web/API/CSS/supports) to provide a fallback based on "background" CSS property.

## Demo

http://alexjoffroy.github.io/react-fitted-image/example/

## Usage

### Install

```
npm install --save react-fitted-image
```

### Properties

| Property   | Type     | Description                                                            | Default value | Required |
| ---------- | -------- | ---------------------------------------------------------------------- | ------------- | -------- |
| background | bool     | Force the component to use the CSS bacground properties                | false         | no       |
| className  | string   | Custom classname for the component                                     | \_            | no       |
| fit        | string   | Value of the object-fit property. Can be "auto", "contain", or "cover" | "auto"        | no       |
| loader     | element  | Component to use as loader                                             | \_            | no       |
| onLoad     | function | Success callback for image loading                                     | \_            | no       |
| onError    | function | Error callback for image loading                                       | \_            | no       |
| src        | string   | Image url to render                                                    | \_            | yes      |
| style      | object   | Custom styles                                                          | {}            | no       |

### Example

```javascript
<FittedImage
  fit="contain"
  loader={<div>Loading</div>}
  onLoad={(...args) => console.log(...args)}
  onError={(...args) => console.log(...args)}
  src="public/img.jpg"
/>
```
