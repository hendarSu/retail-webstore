"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Trash, Minus, Plus } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart()
  const [selectAll, setSelectAll] = useState(true)
  const [selectedItems, setSelectedItems] = useState<string[]>(items.map((item) => item.id))

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map((item) => item.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const handleUpdateQuantity = (id: string, newQuantity: number, stock: number) => {
    if (newQuantity > 0 && newQuantity <= stock) {
      updateQuantity(id, newQuantity)
    }
  }

  const selectedItemsCount = selectedItems.length
  const selectedItemsTotal = items
    .filter((item) => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="p-4 bg-white flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">Keranjang Kamu</h1>
      </div>

      {items.length === 0 ? (
        <div className="bg-white mt-2 p-8 text-center">
          <p className="text-gray-500 mb-4">Keranjang belanja kamu masih kosong</p>
          <Link href="/" className="inline-block px-4 py-2 bg-green-500 text-white rounded-md">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="bg-white mt-2 p-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <span className="ml-2 text-sm">Pilih Semua</span>
            </div>

            {items.map((item) => (
              <div className="border-t pt-4 mt-4" key={`${item.id}-${item.color}-${item.size}`}>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-green-500 focus:ring-green-500 mt-1"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                  <div className="ml-2 flex-1">
                    <div className="flex">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm font-semibold">Rp{item.price.toLocaleString()}</span>
                          <span className="text-xs text-gray-500 line-through ml-1">
                            {item.originalPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.color}, {item.size}
                        </p>
                        <p className="text-xs text-red-500 mt-1">Stock sisa {item.stock}</p>
                      </div>
                      <div className="ml-2 w-20 h-20 relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <button className="p-1" onClick={() => removeFromCart(item.id)}>
                        <Trash className="h-4 w-4 text-gray-400" />
                      </button>
                      <div className="flex items-center">
                        <button
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.stock)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4 text-gray-500" />
                        </button>
                        <div className="w-8 h-8 flex items-center justify-center border-t border-b border-gray-300">
                          <span className="text-sm">{item.quantity}</span>
                        </div>
                        <button
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.stock)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Button */}
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">{selectedItemsCount} Item</span>
              <span className="text-lg font-bold">Rp{selectedItemsTotal.toLocaleString()}</span>
            </div>
            <Link
              href="/checkout"
              className={`block w-full py-3 text-white text-center rounded-md font-medium ${
                selectedItemsCount > 0 ? "bg-green-500" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

