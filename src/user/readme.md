# user Backend Req Data example

## Id중복체크

### req

```json
{
  "userId": "user19@user.com"
}
```

### res

```json
{
  "isAvailable": false
}
```

## 회원가입

### req

```json
{
  "userId": "test@user.com",
  "userPw": "123412342",
  "userNick": "안녕하세요",
  "phone": "01042321323",
  "picture": "test",
  "verified": true,
  "phoneVerificationCode": "142321",
  "phoneVerificationExpiry": "2023-03-31T12:00:00.000Z"
}
```

### res

```json
{
  "userIndex": 21,
  "userId": "test@user.com",
  "userPw": "5ad2ac2d3a7287f2220354f144a6d641d654a6d18dedb1ce4abb2cba51aeb6ad",
  "userNick": "안녕하세요",
  "phone": "01042321323",
  "verified": true,
  "phoneVerificationCode": "142321",
  "phoneVerificationExpiry": "2023-03-31T12:00:00.000Z",
  "updatedAt": "2023-03-31T01:20:31.688Z",
  "createdAt": "2023-03-31T01:20:31.688Z"
}
```

## Phone 중복체크

### req

```json
{
  "phone": "01012341234"
}
```

### res

```json
{
  "isAvailable": false
}
```

## Login

### req

```json
{
  "userId": "test@user.com",
  "userPw": "Apple1984!"
}
```

### res

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjoiZSIsIjEiOiJyIiwiMiI6InIiLCIzIjoibyIsIjQiOiJyIiwidXNlcklkIjoidGVzdEB1c2VyLmNvbSJ9.HwH5zkgE2DNozQxXiZWoepTQTyVAf4EcuzgGIODjAd4",
  "user": {
    "userIndex": 42,
    "userId": "test@user.com",
    "userPw": "00e41197469560fb77e84bc2c8ede331d9cc7a9f14ce602c3a7cdb6daf1b5eac",
    "userNick": "안녕하세요",
    "phone": "01042321323",
    "picture": null,
    "verified": 1,
    "phoneVerificationCode": "142321",
    "phoneVerificationExpiry": "2023-03-31 21:00:00",
    "createdAt": "2023-03-31 14:08:34",
    "updatedAt": "2023-03-31 14:08:34"
  }
}
```

## 회원정보 가져오기

## req

Header에 아래내용 포함필요
Key : Authorization
Value : token value

ex : 로그인시 생성된 token

```json
{
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjoiZSIsIjEiOiJyIiwiMiI6InIiLCIzIjoibyIsIjQiOiJyIiwidXNlcklkIjoidGVzdEB1c2VyLmNvbSJ9.HwH5zkgE2DNozQxXiZWoepTQTyVAf4EcuzgGIODjAd"
}
```

### res

```json
{
  "userIndex": 21,
  "userId": "test@user.com",
  "userPw": "00e41197469560fb77e84bc2c8ede331d9cc7a9f14ce602c3a7cdb6daf1b5eac",
  "userNick": "안녕하세요",
  "phone": "01042321323",
  "picture": null,
  "verified": 1,
  "phoneVerificationCode": "142321",
  "phoneVerificationExpiry": "2023-03-31 21:00:00",
  "createdAt": "2023-03-31 15:08:11",
  "updatedAt": "2023-03-31 15:08:11"
}
```

## userInfo Update

### type1 - 비밀번호 미변경 (현재비밀번호 필요)

### req

header 에 login token 포함되야함

```json
{
  "currentPw": "Apple1984!",
  "userNick": "아바다카다브라",
  "phone": "01099998888"
}
```

### res

```json
{
  "message": "success user Updated"
}
```

### type2 - 비밀번호 변경 (현재비밀번호 필요)

### req

header 에 login token 포함되야함

```json
{
  "currentPw": "Apple1984!",
  "newPassword": "Apple1991!",
  "userNick": "아바다카다브라",
  "phone": "01099998888"
}
```

### res

```json
{
  "message": "success user Updated"
}
```
