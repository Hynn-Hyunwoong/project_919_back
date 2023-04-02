const s3Model = require('./aws.model')
const upload = require('../../middleware/multer')

const uploadFile = (req, res) => {
  upload.single('file')(req, res, (e) => {
    if (e) {
      console.log(
        `Error in uploading file: ${e}, This Message from single in aws controller`
      ),
        res.status(500).json({
          ErrorMessage: `${e}, This Message from single in aws controller`,
        })
    } else {
      console.log(
        `File uploaded successfully. This Message from aws.controller`
      ),
        res.status(200).json({
          message: `File uploaded successfully. This Message from aws.controller`,
          url: req.file.location,
        })
    }
  })
}

const downloadFile = async (req, res) => {
  try {
    console.log('console log in req.params in AWS Controller', req.params)
    const filename = req.params.filename.trim().replace(/\n/g, '') || 'error'
    console.log('console log in filename : ', filename)
    if (!filename) {
      throw new Error('filename is required')
    }
    const fileData = await s3Model.getFileFromS3(filename)
    console.log(fileData)
    res.set('Content-Type', fileData.ContentType)
    console.log('Content-Type : ', fileData.ContentType)
    res.set('Content-Disposition', `attachment; filename=${filename}`)
    console.log('Content-Disposition : ', `attachment; filename=${filename}`)
    res.send(fileData.Body)
  } catch (e) {
    console.log('catch req params : ', req.params.filename)
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
