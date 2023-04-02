const { S3 } = require('@aws-sdk/client-s3')
const { Config } = require('@aws-sdk/client-s3')
const config = require('../../config').s3

// AWS Configuration Update
const awsConfig = {
  credential: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
  region: config.AWS_REGION,
}

const defaultParams = {
  Bucket: config.BucketName,
  ACL: config.ACL,
}

// Define AWS S3
const AWSs3 = new S3(awsConfig)

// Upload File to S3
const uploadFileToS3 = async (buffer, filename, mimetype) => {
  const params = {
    ...defaultParams,
    Key: filename,
    Body: buffer,
    ContentType: mimetype,
  }
  try {
    const data = await AWSs3.upload(params)
    console.log('File uploaded successfully. This Message from aws.model')
    return data
  } catch (e) {
    console.log(
      'Error occured while trying to upload to S3 bucket. This Message from aws.model.Upload',
      e
    )
    throw e
  }
}
// Get File from S3
const getFileFromS3 = async (filename) => {
  const params = {
    ...defaultParams,
    Key: filename,
  }
  console.log(params)
  try {
    const data = await AWSs3.getObject(params)
    console.log('File uploaded successfully. This Message from aws.model')
    return data
  } catch (e) {
    console.log(
      'Error occured while trying to upload to S3 bucket. This Message from aws.model.Upload',
      e
    )
    throw e
  }
}
// Delete File from S3
const deleteFileFromS3 = async (filename) => {
  const params = {
    ...defaultParams,
    Key: filename,
  }
  try {
    const data = await AWSs3.deleteObject(params)
    console.log('File uploaded successfully. This Message from aws.model')
    return data
  } catch (e) {
    console.log(
      'Error occured while trying to upload to S3 bucket. This Message from aws.model.Upload',
      e
    )
    throw e
  }
}

module.exports = { AWSs3, uploadFileToS3, getFileFromS3, deleteFileFromS3 }
