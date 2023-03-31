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
