const filename = 'train.jpeg'

const setBackgroundImage = () => {
  axios
    .get(
      `https://127.0.0.1:3000/aws/signedurl/project919files?objectKey=project919files/${filename}`
    )
    .then((response) => {
      const signedUrl = response.data.signedUrl
      const backgroundImageElement = document.getElementById('background-image')
      backgroundImageElement.style.backgroundImage = `url(${signedUrl})`
      backgroundImageElement.style.width = '100%'
      backgroundImageElement.style.height = '100%'
    })
    .catch((e) => {
      console.log(e)
      console.error(`error message signed URL : ${e}`)
    })
}

setBackgroundImage()
setInterval(setBackgroundImage, 4 * 60 * 1000)
