const s3Model = require('./aws.model')
const upload = require('../../middleware/multer')

const uploadFile = (req, res) => {
  upload.single('file')(req, res, (e) => {
    if (e) {
      res.status(500).json({
        ErrorMessage: `${e}, This Message from single in aws controller`,
      })
    } else {
      res.status(200).json({
        message: `File uploaded successfully. This Message from aws.controller`,
        url: req.file.location,
      })
    }
  })
}

const downloadFile = async (req, res) => {
  try {
    const filename = req.params.filename
    const fileData = await s3Model.getFileFromS3(filename)
    res.set('Content-Type', fileData.ContentType)
    res.set('Content-Disposition', `attachment; filename=${filename}`)
    res.send(fileData.Body)
  } catch (e) {
    console.log(`This Message from downloadFile in aws controller: ${e}`)
    res.status(500).json({ error: e })
  }
}

const deleteFile = async (req, res) => {
  try {
    const filename = req.params.filename
    await s3Model.deleteFileFromS3(filename)
    res.status(200).json({
      message: `File deleted successfully. This message aws Controller ${filename}`,
    })
  } catch (e) {
    console.log(`This Message from deleteFile in aws controller: ${e}`)
    res.status(500).json({ error: e })
  }
}

module.exports = {
  uploadFile,
  downloadFile,
  deleteFile,
}
