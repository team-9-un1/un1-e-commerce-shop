import React, { useMemo, useState } from 'react';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { ArrowLeft, ChevronRight, Ticket, X } from 'lucide-react';

const ShoppingCart = () => {
  const { cartItems, loading, subtotal = 0, total = 0, updateQuantity, removeFromCart } = useCart();

  const isEmpty = cartItems.length === 0;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [selectedIds, setSelectedIds] = useState(() =>
    cartItems.map((i) => i.id || i._id).filter(Boolean)
  );

  const allSelected = useMemo(() => {
    if (cartItems.length === 0) return false;
    const ids = cartItems.map((i) => i.id || i._id).filter(Boolean);
    return ids.length > 0 && ids.every((id) => selectedIds.includes(id));
  }, [cartItems, selectedIds]);

  const shippingLabel = 'Miễn phí';
  const voucherValue = 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <SkeletonLoader type="list" count={3} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="mx-auto max-w-[1429px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
            aria-label="Quay lại"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="text-[15px] tracking-[0.18em] text-gray-700">
            <span className="italic">un1</span>
            <span className="mx-2">/</span>
            <span>Giỏ hàng</span>
          </div>
        </div>

        <h1 className="text-[44px] sm:text-[56px] leading-none tracking-[0.09em] font-normal text-black mb-8">
          Giỏ hàng
        </h1>

        {isEmpty ? (
          <div className="border border-gray-200 rounded-2xl p-10 text-center">
            <p className="text-xl text-gray-800">Giỏ hàng của bạn đang trống.</p>
            <Link to="/" className="inline-flex mt-6 items-center justify-center rounded-full border border-black px-8 py-3">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <section className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  className="size-[22px] accent-black"
                  checked={allSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(cartItems.map((i) => i.id || i._id).filter(Boolean));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                />
                <div className="text-xl text-black">Tất cả sản phẩm</div>
              </div>

              <div className="h-px bg-gray-300 mb-6" />

              <div className="space-y-0">
                {cartItems.map((item) => {
                  const product = item.product || {};
                  const productName = item.name || product.name || 'Sản phẩm';
                  const productImage =
                    item.image || product.image || '/src/assets/images/placeholder-product.png';
                  const unitPrice =
                    (item.priceCents ?? item.price ?? product.priceCents ?? product.price) || 0;
                  const itemId = item.id || item._id;
                  const isSelected = itemId ? selectedIds.includes(itemId) : false;

                  return (
                    <div key={itemId || productName} className="py-4 border-b border-gray-300">
                      <div className="flex items-start gap-6">
                        <div className="pt-10">
                          <input
                            type="checkbox"
                            className="size-[22px] accent-black"
                            checked={isSelected}
                            onChange={(e) => {
                              if (!itemId) return;
                              setSelectedIds((prev) => {
                                if (e.target.checked) return [...prev, itemId];
                                return prev.filter((x) => x !== itemId);
                              });
                            }}
                          />
                        </div>

                        <div className="w-[162px] h-[214px] rounded-[10px] overflow-hidden bg-gray-100 shrink-0">
                          <img src={productImage} alt={productName} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-[28px] sm:text-[32px] font-bold text-black leading-tight">
                                {productName}
                              </h3>
                              <div className="mt-3 text-[18px] sm:text-[20px] text-black leading-snug">
                                <div>Màu sắc: {item.color || '-'}</div>
                                <div>Kích cỡ: {item.size || '-'}</div>
                                <div>{unitPrice.toLocaleString('vi-VN')} VND</div>
                              </div>
                            </div>

                            <button
                              type="button"
                              className="p-2 text-gray-700 hover:text-black"
                              onClick={() => {
                                if (window.confirm(`Bạn có chắc chắn muốn xóa "${productName}" khỏi giỏ hàng?`)) {
                                  removeFromCart(itemId);
                                }
                              }}
                              title="Xóa"
                            >
                              <X size={28} />
                            </button>
                          </div>

                          <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
                            <div>
                              <div className="text-[20px] font-bold text-black mb-2">Số lượng</div>
                              <div className="inline-flex items-center border border-[#9d9999] rounded-full h-10 px-3 gap-4">
                                <button
                                  type="button"
                                  className="text-[28px] leading-none px-1 disabled:opacity-40"
                                  onClick={() => updateQuantity(itemId, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  aria-label="Giảm số lượng"
                                >
                                  -
                                </button>
                                <span className="text-[22px] w-6 text-center">{item.quantity}</span>
                                <button
                                  type="button"
                                  className="text-[22px] leading-none px-1"
                                  onClick={() => updateQuantity(itemId, item.quantity + 1)}
                                  aria-label="Tăng số lượng"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="text-right text-[20px] sm:text-[22px] text-black">
                              Tổng: {(unitPrice * item.quantity).toLocaleString('vi-VN')} VND
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <aside className="lg:col-span-4">
              <div className="border border-[#9d9999] bg-white">
                <div className="px-6 py-6">
                  <div className="text-[22px] sm:text-[26px]">
                    <span className="font-bold">Tổng đơn hàng</span>
                    <span className="font-normal">{` | ${totalItems} Sản phẩm`}</span>
                  </div>

                  <div className="mt-6 space-y-4 text-[18px] sm:text-[20px]">
                    <div className="flex items-center justify-between gap-4">
                      <div>Tổng cộng</div>
                      <div className="text-right">{subtotal.toLocaleString('vi-VN')} VND</div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>Phí giao hàng</div>
                      <div className="text-right">{shippingLabel}</div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>Voucher giảm giá</div>
                      <div className="text-right">{voucherValue.toLocaleString('vi-VN')} VND</div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-300" />

                <div className="px-6 py-6">
                  <div className="flex items-end justify-between gap-6">
                    <div className="text-[28px] sm:text-[32px] font-bold">Thành tiền</div>
                    <div className="text-[22px] sm:text-[26px] font-bold">{total.toLocaleString('vi-VN')} VND</div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full flex items-center justify-between gap-4 border border-gray-300 bg-white px-5 py-4"
              >
                <div className="flex items-center gap-4 text-[18px] sm:text-[20px]">
                  <Ticket size={22} />
                  <span>Phiếu giảm giá</span>
                </div>
                <ChevronRight size={22} />
              </button>

              <Link
                to="/checkout"
                className="mt-6 block w-full rounded-full bg-red-600 py-4 text-center text-white font-bold text-[22px] sm:text-[26px] tracking-wide"
              >
                THANH TOÁN
              </Link>

              <Link
                to="/"
                className="mt-4 block w-full rounded-full border border-black py-4 text-center text-black text-[22px] sm:text-[24px] tracking-[0.08em]"
              >
                TIẾP TỤC MUA SẮM
              </Link>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ShoppingCart;
