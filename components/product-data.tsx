export const products = [
  {
    id: "1",
    name: "Kaos Minggir Lu Miskin",
    price: 129000,
    originalPrice: 150000,
    description:
      "Lorem ipsum dolor sit amet consectetur. Quis tempor eget vestibulum facilisi. Massa vel egit ridiculus scelerisque elit ligula morbi adipiscing.",
    colors: [
      { name: "Hitam", value: "black" },
      { name: "Abu-Abu", value: "gray" },
      { name: "Putih", value: "white" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 5,
    images: [
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400&text=Image2",
      "/placeholder.svg?height=500&width=400&text=Image3",
    ],
  },
  {
    id: "2",
    name: "Kaos NASA",
    price: 139000,
    originalPrice: 160000,
    description:
      "Produnt massa vitae consectetur tempor gravida blandit sollicitudin. Venenatis pretium dictum mi tempor donec in.",
    colors: [
      { name: "Hitam", value: "black" },
      { name: "Abu-Abu", value: "gray" },
      { name: "Putih", value: "white" },
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 8,
    images: [
      "/placeholder.svg?height=500&width=400&text=NASA",
      "/placeholder.svg?height=500&width=400&text=NASA2",
      "/placeholder.svg?height=500&width=400&text=NASA3",
    ],
  },
  {
    id: "3",
    name: "Kaos Nirvana",
    price: 149000,
    originalPrice: 170000,
    description:
      "Produnt massa vitae consectetur tempor gravida blandit sollicitudin. Venenatis pretium dictum mi tempor donec in.",
    colors: [
      { name: "Hitam", value: "black" },
      { name: "Abu-Abu", value: "gray" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 3,
    images: [
      "/placeholder.svg?height=500&width=400&text=Nirvana",
      "/placeholder.svg?height=500&width=400&text=Nirvana2",
    ],
  },
]

export function getProduct(id: string) {
  return products.find((product) => product.id === id) || products[0]
}

export function getRelatedProducts(currentId: string) {
  return products.filter((product) => product.id !== currentId)
}

