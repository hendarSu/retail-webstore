"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Share, ShoppingCart, Minus, Plus } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { getProduct, getRelatedProducts } from "@/components/product-data"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { id } = params
  const product = getProduct(id)
  const relatedProducts = getRelatedProducts(id)

  const [selectedColor, setSelectedColor] = useState(product.colors[0].name)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)

  const { addToCart, totalItems } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      color: selectedColor,
      size: selectedSize,
      image: product.images[0],
      quantity: quantity,
      stock: product.stock,
    })

    toast({
      title: "Ditambahkan ke keranjang",
      description: `${product.name} - ${selectedColor}, ${selectedSize} (${quantity}x)`,
      duration: 3000,
    })
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="p-4 bg-white flex items-center justify-between">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari produk di toko ini"
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
        </div>
        <div className="flex items-center ml-2 space-x-3">
          <button className="p-1">
            <Share className="h-5 w-5 text-gray-500" />
          </button>
          <Link href="/keranjang" className="p-1 relative">
            <ShoppingCart className="h-5 w-5 text-red-500" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Product Image */}
      <div className="bg-white">
        <div className="relative aspect-[3/4] w-full">
          <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white p-4">
        <div className="flex items-center mb-1">
          <h2 className="text-sm">{product.name.split(" ")[0]}</h2>
        </div>
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold">{product.name.split(" ").slice(1).join(" ")}</h1>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-bold">{product.price.toLocaleString()}</span>
          <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice.toLocaleString()}</span>
        </div>
        <div className="text-sm text-gray-500 mt-1">Pilih Warna</div>

        {/* Color Options */}
        <div className="flex mt-2 space-x-2">
          {product.colors.map((color) => (
            <button
              key={color.name}
              className={`border rounded-md overflow-hidden ${selectedColor === color.name ? "border-green-500" : "border-gray-300"}`}
              onClick={() => setSelectedColor(color.name)}
            >
              <Image
                src={`/placeholder.svg?height=60&width=60&text=${color.name}`}
                alt={color.name}
                width={60}
                height={60}
                className="w-full h-auto"
              />
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-500 mt-4">Pilih Ukuran</div>

        {/* Size Options */}
        <div className="flex mt-2 space-x-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                selectedSize === size ? "border-green-500 text-green-500" : "border-gray-300 text-gray-700"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Quantity */}
        <div className="mt-4">
          <div className="text-sm text-gray-500 mb-2">Jumlah</div>
          <div className="flex items-center">
            <button
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4 text-gray-500" />
            </button>
            <div className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-300">
              <span className="text-sm">{quantity}</span>
            </div>
            <button
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md"
              onClick={incrementQuantity}
              disabled={quantity >= product.stock}
            >
              <Plus className="h-4 w-4 text-gray-500" />
            </button>
            <div className="ml-3 text-sm text-red-500">Stock sisa {product.stock}</div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full py-3 bg-green-500 text-white rounded-md font-medium mt-6" onClick={handleAddToCart}>
          Tambahkan ke Keranjang
        </button>
      </div>

      {/* Product Description */}
      <div className="bg-white p-4 mt-2">
        <h2 className="text-base font-medium mb-2">Detail Produk</h2>
        <p className="text-sm text-gray-700 mb-4">{product.description}</p>
        <p className="text-sm text-gray-700 mb-4">
          Produnt massa vitae consectetur tempor gravida blandit sollicitudin. Venenatis pretium dictum mi tempor donec
          in.
        </p>
        <button className="text-sm text-green-500">Lihat selengkapnya</button>
      </div>

      {/* Related Products */}
      <div className="bg-white p-4 mt-2">
        <h2 className="text-base font-medium mb-4">Lainnya di toko ini</h2>
        <div className="grid grid-cols-3 gap-2">
          {relatedProducts.slice(0, 3).map((item) => (
            <Link href={`/product/${item.id}`} key={item.id} className="block">
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.name}
                  width={150}
                  height={150}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-xs font-medium">{item.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-semibold">{item.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 line-through ml-1">{item.originalPrice.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* All Products */}
      <div className="bg-white p-4 mt-2">
        <h2 className="text-base font-medium mb-4">Semua Produk</h2>
        <div className="grid grid-cols-2 gap-4">
          {relatedProducts.slice(0, 2).map((item) => (
            <Link href={`/product/${item.id}`} key={item.id} className="block">
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.name}
                  width={150}
                  height={150}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-xs font-medium">{item.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-semibold">{item.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 line-through ml-1">{item.originalPrice.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Toaster />
    </div>
  )
}

