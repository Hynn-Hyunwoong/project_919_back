# project_919_back

app.get('/signed-url/', async (req, res) => {
try {
const signedUrl = await s3.getSignedUrlPromise('getObject', {
Bucket: process.env.AWS_BUCKET_NAME,
Key: 'project919files/train.jpeg',
Expires: 60 \* 60,
})
res.json({ signedUrl })
} catch (e) {
console.error(e)
res.status(500).json({ error: e.message })
}
})
