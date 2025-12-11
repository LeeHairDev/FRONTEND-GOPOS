// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { orderService } from '../../services/orderService'

const VATInvoiceModal = ({ isOpen, onClose, date }) => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const taxPercent = 10

  useEffect(() => {
    if (isOpen) fetchDailySales()
  }, [isOpen, date])

  const fetchDailySales = async () => {
    setLoading(true)
    try {
      const res = await orderService.getAllOrders(undefined, undefined, 1, 1000)
      const orders = res?.orders || []

      const target = date ? new Date(date) : new Date()
      const start = new Date(target)
      start.setHours(0, 0, 0, 0)
      const end = new Date(target)
      end.setHours(23, 59, 59, 999)

      const dailyOrders = orders.filter(o => {
        const d = new Date(o.createdAt)
        return d >= start && d <= end
      })

      const map = new Map()
      let accSubtotal = 0

      dailyOrders.forEach(o => {
        const orderItems = o.items || []
        orderItems.forEach(it => {
          const id = it.product?.id || it.productId || it._id || it.product?._id || it.name || it.productName
          const name = it.product?.name || it.productName || it.name || 'Sản phẩm'
          const qty = Number(it.quantity || 1)
          const price = Number(it.price || it.product?.price || 0)
          const line = qty * price
          accSubtotal += line

          if (!map.has(id)) map.set(id, { id, name, qty: 0, revenue: 0 })
          const entry = map.get(id)
          entry.qty += qty
          entry.revenue += line
          map.set(id, entry)
        })
      })

      setItems(Array.from(map.values()))
      setSubtotal(accSubtotal)
    } catch (err) {
      console.error('Fetch daily sales error', err)
    }
    setLoading(false)
  }

  const handlePrint = () => window.print()

  const tax = Math.round((subtotal * taxPercent) / 100)
  const grandTotal = subtotal + tax

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-screen overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-bold text-blue-600">GoPOS</h1>
            <p className="text-xs text-gray-600">HÓA ĐƠN GTGT (VAT)</p>
          </div>
          <div className="text-right text-sm">
            <p>Ngày: {new Date(date || Date.now()).toLocaleDateString('vi-VN')}</p>
            <p>Loại: Hóa đơn tổng hợp</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-bold text-sm mb-2">Tổng hợp sản phẩm đã bán</h3>
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1">Sản phẩm</th>
                  <th className="text-center py-1">SL</th>
                  <th className="text-right py-1">Doanh thu</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-1 font-medium">{it.name}</td>
                    <td className="text-center py-1">{it.qty}</td>
                    <td className="text-right py-1">{it.revenue.toLocaleString('vi-VN')} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-gray-50 p-3 rounded mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Tạm tính:</span>
            <span className="font-medium">{subtotal.toLocaleString('vi-VN')} VND</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Thuế VAT ({taxPercent}%):</span>
            <span className="font-medium">{tax.toLocaleString('vi-VN')} VND</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Tổng cộng:</span>
            <span className="text-blue-600">{grandTotal.toLocaleString('vi-VN')} VND</span>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <button onClick={handlePrint} className="px-3 py-1 bg-blue-600 text-white rounded">In hóa đơn</button>
          <button onClick={onClose} className="px-3 py-1 bg-gray-200 text-gray-700 rounded">Đóng</button>
        </div>
      </div>
    </div>
  )
}

export default VATInvoiceModal
