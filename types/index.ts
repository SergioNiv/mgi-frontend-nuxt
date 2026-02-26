export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface Product {
  id: number
  title: string
  category: string
  description: string
  price: number
  stock: number
  thumbnail: string
  images: string[]
}
