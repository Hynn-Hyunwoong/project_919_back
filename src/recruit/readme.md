repository.getView

```js
{
  recruitIndex: 1,
  title: '모집게시물은 user1@user.com님의 Youtube 개인(필리핀)입니다.',
  content: '이 상세사항은 user1@user.com님의 Youtube 개인(필리핀)입니다.',
  openChatLink: 'https://open.kakao.com/o/sample',
  startDate: '2023-04-05 15:30:42',
  endDate: '2023-04-12 15:30:42',
  hidden: 0,
  createdAt: '2023-04-05 15:30:42',
  updatedAt: '2023-04-05 15:30:42',
  ottPlanIndex: 2,
  userIndex: 1
} {
  userIndex: 1,
  userId: 'user1@user.com',
  userPw: '5f2c3649fd348960a8c3c4c29c1846bce0ca7389ad134ba8c6f9ca1d1a7219d2',
  userNick: 'userNick1',
  phone: '01012341231',
  picture: null,
  createdAt: '2023-04-05 15:30:42',
  updatedAt: '2023-04-05 15:30:42'
}
```

{
recruitIndex: 1,
title: '모집게시물은 user1@user.com님의 Wavve Premium M입니다.',
content: '이 상세사항은 user1@user.com님의 Wavve Premium M입니다.',
openChatLink: 'https://open.kakao.com/o/sample',
startDate: '2023-04-05 16:55:38',
endDate: '2023-04-12 16:55:38',
hidden: 0,
createdAt: '2023-04-05 16:55:38',
updatedAt: '2023-04-05 16:55:38',
ottPlanIndex: 22,
userIndex: 1,
'User.userNick': 'userNick1',
'ottPlan.planName': 'Wavve Premium M',
'ottPlan.price': 13900,
'ottPlan.limit': 4,
'ottPlan.ottPlatform.ottPlatformIndex': 6,
'ottPlan.ottPlatform.platformName': 'Wavve',
'ottPlan.ottPlatform.Image': '/public/img/WavveLogo.png',
'ottPlan.Country.countryIndex': 6,
'ottPlan.Country.countryCode': 'KRW'
}

getList 필요한 데이터

```js
id: 9,
star: false,
platformImg: "/img/platformLogo/youtube.png",
limit: 3,
price: 3300,
subject: "제목입니다ㅏㅏㅏㅏ33333",
userNick: "Nicknameeeee222",
```

오는 데이터

```js
;[
  {
    recruitIndex: 36,
    title: '모집게시물은 user19@user.com님의 Netflix Standard M입니다.',
    hidden: 0,
    'User.userNick': 'userNick19',
    'ottPlan.planName': 'Netflix Standard M',
    'ottPlan.price': 13500,
    'ottPlan.limit': 2,
    'ottPlan.ottPlatform.ottPlatformIndex': 2,
    'ottPlan.ottPlatform.Image': '/img/platformLogo/netflix.png',
    'ottPlan.Country.countryIndex': 6,
    'ottPlan.Country.countryCode': 'KRW',
  },
  {
    recruitIndex: 37,
    title: '모집게시물은 user20@user.com님의 Tving Basic Y입니다.',
    hidden: 0,
    'User.userNick': 'userNick20',
    'ottPlan.planName': 'Tving Basic Y',
    'ottPlan.price': 71000,
    'ottPlan.limit': 0,
    'ottPlan.ottPlatform.ottPlatformIndex': 5,
    'ottPlan.ottPlatform.Image': '/img/platformLogo/tving.png',
    'ottPlan.Country.countryIndex': 6,
    'ottPlan.Country.countryCode': 'KRW',
  },
]
```
