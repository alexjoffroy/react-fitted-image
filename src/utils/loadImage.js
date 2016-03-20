import { defer } from 'q';

function loadImage(url) {
  const deferred = defer();

  let image = new Image();

  image.onload = () => {
    deferred.resolve();
  };

  image.onerror = () => {
    deferred.reject(new Error('Error when loading ' + url));
  }

  image.src = url;

  return deferred.promise;
}

module.exports = loadImage;
