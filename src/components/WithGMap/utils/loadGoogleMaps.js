import scriptjs from 'scriptjs'

let loadPromise

export default function loadGoogleMaps(bootstrapURLKeys) {
  if (loadPromise) 
    return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('google map cannot be loaded outside browser env'))
      return
    }

    if (window.google && window.google.maps) {
      resolve(window.google.maps)
      return
    }

    const queryString = Object.keys(bootstrapURLKeys).reduce(
      (r, key) => `${r}&${key}=${bootstrapURLKeys[key]}`,
      ''
    )

    scriptjs(
      `https://maps.googleapis.com/maps/api/js?${queryString}`,
      () => {
        if (typeof window.google === 'undefined') {
          reject(new Error('google map initialization error (not loaded)'))
          return
        }
        resolve(window.google.maps)    
      }        
    )
  })

  return loadPromise
}