export default function loadImage(url) {
    return new Promise((resolve, reject) => {
  
      let image = new Image()
    
      image.onload = resolve
    
      image.onerror = () => reject(new Error('Error when loading ' + url))
    
      image.src = url;
  
    })
  }