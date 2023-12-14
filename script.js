function srAlert(message) {
  const srAlert = document.querySelector('[js-sr-alert]')
  if (!srAlert) return
  srAlert.innerHTML = message
  setTimeout(() => srAlert.innerHTML = '', 3000)
}

function fetchBg() {
  const intro = document.querySelector('[js-intro]')
  if (!intro) return
  return fetch('https://postales.ares.uy/random').then((response) => response.json()).then((data) => {
    const url = `https://postales.ares.uy/${data.url}`
    const imgElement = document.createElement('img')
    imgElement.addEventListener('load', () => {
      intro.style.backgroundImage = `url('${url}')`
      intro.classList.add('image-loaded')
    })
    imgElement.src = url
  })
}

document.addEventListener('DOMContentLoaded', () => {
  fetchBg()
  document.querySelector('[js-bg-btn]')?.addEventListener('click', () => {
    srAlert('Cambiando imagen de fondo')
    document.querySelector('[js-intro]')?.classList.remove('image-loaded')
    fetchBg()?.then(() => srAlert('Imagen de fondo cargada'))
  })
})