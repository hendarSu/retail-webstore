"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Share, ShoppingCart, MapPin, Clock } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function Home() {
  const { totalItems } = useCart()
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-md mx-auto min-h-screen relative">
      {/* Background Grid */}
      <div className="fixed inset-0">
        <div className="grid grid-cols-3 gap-0">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="relative aspect-square">
              <Image
                src={`/placeholder.svg?height=400&width=400&text=T-Shirt${i + 1}`}
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Time Display */}
      <div className="absolute top-4 left-4 text-white text-2xl font-medium z-10">{currentTime}</div>

      {/* Main Content */}
      <div className="relative">
        {/* Search Bar */}
        <div className="sticky top-0 z-20 p-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white rounded-xl shadow-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari produk di toko ini"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <button className="p-3 bg-white rounded-xl shadow-lg">
              <Share className="h-6 w-6 text-gray-600" />
            </button>
            <Link href="/keranjang" className="p-3 bg-white rounded-xl shadow-lg relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Store Details Card */}
        <div className="mt-4 mx-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-6">Kaos Gaul Ishowspeed Minggir Lu Miskin</h1>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <p className="text-gray-700 text-lg">Jalan Buah Batu No. 105, Kecamatan Turangga, Kota Bandung</p>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600">Senin - Jumat</span>
                        <span className="text-gray-900">22:00 - 10:00</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600">Sabtu</span>
                        <span className="text-gray-900">22:00 - 10:00</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600">Minggu</span>
                        <span className="text-gray-900">Tutup</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white p-4 mt-5">
          <h2 className="text-base font-medium mb-4">Sering Dibeli Bareng Belanjaan</h2>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((item) => (
              <Link href="/product/1" key={item} className="block">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Product"
                    width={150}
                    height={150}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-xs font-medium">Kaos Minggir Lu Miskin - Hitam, S</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-sm font-semibold">129.000</span>
                    <span className="text-xs text-gray-500 line-through ml-1">150.000</span>
                  </div>
                  <button className="mt-2 w-full py-1 text-xs text-center bg-white border border-green-500 text-green-500 rounded-md">
                    Tambah
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Product */}
        <div className="bg-white p-4">
          <div className="rounded-lg overflow-hidden mb-4">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Featured Product"
              width={300}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* All Products */}
        <div className="bg-white p-4">
          <h2 className="text-base font-medium mb-4">Semua Produk</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Link href="/product/1" key={item} className="block">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Product"
                    width={150}
                    height={150}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-xs font-medium">Kaos Minggir Lu Miskin - Hitam, S</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-sm font-semibold">129.000</span>
                    <span className="text-xs text-gray-500 line-through ml-1">150.000</span>
                  </div>
                  <button className="mt-2 w-full py-1 text-xs text-center bg-white border border-green-500 text-green-500 rounded-md">
                    Tambah
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 space-x-1">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div key={dot} className={`h-2 w-2 rounded-full ${dot === 1 ? "bg-green-500" : "bg-gray-300"}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

