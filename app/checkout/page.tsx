"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Minus, Plus, Trash } from "lucide-react"
import { useCart } from "@/context/cart-context"

type CheckoutForm = {
  name: string
  phone: string
  address: string
  notes: string
}

export default function Checkout() {
  const router = useRouter()
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()

  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    address: "",
    notes: "",
  })

  const [errors, setErrors] = useState<Partial<CheckoutForm>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof CheckoutForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<CheckoutForm> = {}

    if (!form.name.trim()) {
      newErrors.name = "Nama harus diisi"
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Nomor handphone harus diisi"
    } else if (!/^[0-9]{10,13}$/.test(form.phone.trim())) {
      newErrors.phone = "Nomor handphone tidak valid"
    }

    if (!form.address.trim()) {
      newErrors.address = "Alamat pengiriman harus diisi"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Prepare order data
    const orderData = {
      customer: form,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
      })),
      totalPrice,
    }

    // In a real app, you would send this data to your backend
    console.log("Order submitted:", orderData)

    // Simulate order success
    alert("Pesanan berhasil! Anda akan diarahkan ke WhatsApp untuk menyelesaikan pembayaran.")

    // Clear cart after successful order
    clearCart()

    // Redirect to home or order confirmation page
    router.push("/")
  }

  const handleQuantityChange = (id: string, newQuantity: number, stock: number) => {
    if (newQuantity > 0 && newQuantity <= stock) {
      updateQuantity(id, newQuantity)
    }
  }

  // Calculate promo (for demo purposes - 10% discount)
  const discount = Math.round(totalPrice * 0.1)
  const finalTotal = totalPrice - discount

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4">
        <div className="bg-white p-8 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-4">Keranjang Kosong</h2>
          <p className="text-gray-600 mb-6">Anda belum menambahkan produk ke keranjang</p>
          <Link href="/" className="bg-green-500 text-white px-6 py-2 rounded-md">
            Kembali Belanja
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="p-4 bg-white flex items-center">
        <Link href="/keranjang" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Customer Information */}
        <div className="bg-white mt-2 p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Nama <span className="text-red-500">(*)</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Isi nama"
              className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">No Handphone *</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Isi nomor handphone"
              className={`w-full p-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Alamat Pengiriman *</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Alamat pengiriman dengan lengkap"
              rows={3}
              className={`w-full p-2 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            ></textarea>
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Catatan Pengiriman</label>
            <div className="flex">
              <input
                type="text"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Catatan / Rumah dengan pagar hitam"
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                className="bg-gray-100 px-3 border border-l-0 border-gray-300 rounded-r-md text-gray-500"
              >
                00:00
              </button>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white mt-2 p-4">
          <h2 className="text-base font-medium mb-4">Detail Pesanan</h2>

          {items.map((item) => (
            <div className="flex items-start mb-4" key={`${item.id}-${item.color}-${item.size}`}>
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-sm font-semibold">Rp{item.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 line-through ml-1">{item.originalPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {item.color}, {item.size}
                </p>
                <p className="text-xs text-red-500 mt-1">Stock sisa {item.stock}</p>
              </div>
              <div className="ml-2 w-16 h-16 relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="ml-2 flex items-center">
                <button type="button" className="p-1" onClick={() => removeFromCart(item.id)}>
                  <Trash className="h-4 w-4 text-gray-400" />
                </button>
                <div className="flex flex-col items-center ml-2">
                  <button
                    type="button"
                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-md mb-1"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.stock)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3 text-gray-500" />
                  </button>
                  <span className="text-xs">{item.quantity}</span>
                  <button
                    type="button"
                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-md mt-1"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.stock)}
                    disabled={item.quantity >= item.stock}
                  >
                    <Plus className="h-3 w-3 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Notes */}
        <div className="bg-white mt-2 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-medium">Ada lagi pesanannya?</h2>
            <Link href="/" className="text-sm text-green-500">
              Tambah
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-1">Masih bisa tambah menu lain ya!</p>
        </div>

        {/* Payment Details */}
        <div className="bg-white mt-2 p-4">
          <h2 className="text-base font-medium mb-4">Detail Pembayaran</h2>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Harga</span>
            <span className="text-sm">{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Promo</span>
            <span className="text-sm">-{discount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold mt-4">
            <span>Total pembayaran</span>
            <span>{finalTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t p-4">
          <button type="submit" className="w-full py-3 bg-green-500 text-white text-center rounded-md font-medium">
            Order di Whatsapp
          </button>
        </div>
      </form>
    </div>
  )
}

