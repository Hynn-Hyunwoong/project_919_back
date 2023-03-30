document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/signed-url')
    const { signedUrl } = await response.json()
    const backgroundImageElement = document.getElementById('background-image')
    backgroundImageElement.style.backgroundImage = `url(${signedUrl})`
  } catch (error) {
    console.error('Error fetching signed URL:', error)
  }
})
