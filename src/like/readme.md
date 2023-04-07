# Like Backend

## Like 추가/제거 (POST)

## REQ

```JSON
{

    "userIndex":"1",
    "recruitIndex":"5"
}
```

## RES

```JSON
{
    "message": "added Like"
}

{
    "message": "remove Like"
}

```

## Like 불러오기(GET)

## REQ

```JSON
{
    "recruitIndex":"999"
}
```

## RES

```JSON
0
```
