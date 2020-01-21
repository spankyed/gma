// data file
const randString = () =>
  Math.random()
    .toString(36)
    .substring(3, 9)

const themes = [
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'orange',
  'yellow',
  'grey',
  'red',
  'pink'
]

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


export default {
  products: products,
  counters: [...new Array(10)].map((item, index) => ({ id: randString(), count: 0, theme: themes[index % 10] }))
}
