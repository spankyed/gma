// data file
const constants = {
  pathColors: [
    { path: '/', color: 'yellow'},
    { path: '/messages', color: 'red'},
    { path: '/tasks', color: 'green'},
    { path: '/products', color: 'pink'},
    { path: '/collections', color: 'blue'}
  ]
}

const products = [
  {
    "id": 1,
    "description": "Silk Dress",
    "collection": ["Dress", "Women"],
    "image": "https://res.cloudinary.com/duua3lsu1/image/upload/v1557590908/blog/task-grid-thumbnail.png",
    "date": "June 12, 2019"
  },
  {
    "id": 1,
    "description": "Silk Dress",
    "collection": ["Dress", "Women"],
    "image": "https://res.cloudinary.com/duua3lsu1/image/upload/v1557590908/blog/task-grid-thumbnail.png",
    "date": "June 12, 2019"
  },
  {
    "id": 1,
    "description": "Silk Dress",
    "collection": ["Dress", "Women"],
    "image": "https://res.cloudinary.com/duua3lsu1/image/upload/v1557590908/blog/task-grid-thumbnail.png",
    "date": "June 12, 2019"
  }
]

const collections = [
  {
    "id": 1,
    "title": "Silk Dress",
    "collection": ["Dress", "Women"],
    "image": "https://res.cloudinary.com/duua3lsu1/image/upload/v1557590908/blog/task-grid-thumbnail.png",
    "created": "June 12, 2019"
  },
  {
    "id": 2,
    "title": "Silk Dress",
    "collection": ["Dress", "Women"],
    "image": "https://res.cloudinary.com/duua3lsu1/image/upload/v1557590908/blog/task-grid-thumbnail.png",
    "created": "June 12, 2019"
  }
]

//const randString = () => Math.random().toString(36).substring(3, 9)
//counters: [...new Array(10)].map((item, index) => ({ id: randString(), count: 0, theme: themes[index % 10] }))

export default {
  constants: constants,
  collections: collections,
  products: products
}
