# POSTMAN 테스트 구조

## Upload

### req

1. form-data
2. Key name : file

### res

```json
{
  "message": "File uploaded successfully. This Message from aws.controller",
  "url": "https://project919.s3.ap-northeast-2.amazonaws.com/project919files/1680424637691-DisneyPlusLogo.png"
}
```

## GET(DOWNLOAD)

### req

https://127.0.0.1:3000/aws/download/project919files/1680432528191-TvingLogo.png

### res

downloaded

## DELETE

### req

### res
