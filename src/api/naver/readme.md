# SMS Verification

1. 인증번호 받기

## Req

```json
{
  "phone": "01049054702"
}
```

## Res

```json
{
  "message": "SMS sent successfully.",
  "requestId": "VORSSA-1680567743777-448-57491600-enNcwdbE",
  "messageId": {
    "statusCode": "202",
    "statusName": "success",
    "requestId": "VORSSA-1680567743777-448-57491600-enNcwdbE",
    "requestTime": "2023-04-04T09:22:23.777"
  }
}
```

응답에 있는 requestId 를 히든으로 가지고 있어야함

2. 인증번호 검증

## req

```json
{
  "requestId": "VORSSA-1680567743777-448-57491600-enNcwdbE",
  "userInputCode": "889176"
}
```

## res

```json

{
    "response": true,
    "message": "인증번호가 확인되었습니다."
}

{
    "response": false,
    "message": "인증번호가 일치하지 않습니다."
}


```
