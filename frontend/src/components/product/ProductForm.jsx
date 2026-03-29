import React, { useState, forwardRef, useImperativeHandle } from "react";
import "../../styles/components/product-form.css";

const initialState = {
  name: "",
  description: "",
  priceCents: "",
  sku: "",
  categoryId: "",
  inventory: 100,
  image: "",
};

const ProductForm = ({ onSubmit, initialData = initialState, submitLabel = "Lưu", categories = [], images = [], setSKU, renderExtraFields }, ref) => {
  // Map old data (category) sang categoryId nếu có
  const getInit = (data) => {
    if (data.categoryId) return data;
    // Nếu có category là tên, tìm id
    if (data.category && categories.length > 0) {
      const found = categories.find((c) => c.name === data.category);
      if (found) return { ...data, categoryId: found.id };
    }
    return data;
  };
  const [form, setForm] = useState(getInit(initialData));

  // Cho phép cha lấy dữ liệu form hiện tại và cập nhật SKU từ cha
  useImperativeHandle(ref, () => ({
    getFormData: () => form,
    setSKU: (sku) => setForm((prev) => ({ ...prev, sku })),
  }), [form]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryId") {
      // Khi đổi categoryId, nếu có ảnh thì cập nhật prefix nếu cần
      let newForm = { ...form, [name]: value };
      if (form.image) {
        let fileName = form.image.split('/').pop();
        let prefix = "/assets/images/products/";
        // Lấy tên category từ id
        const cat = categories.find((c) => c.id === value);
        if (cat && /^\d+\.png$/i.test(fileName)) {
          if (cat.name.toLowerCase() === "nam") {
            prefix = "/assets/images/products/man/";
          } else if (cat.name.toLowerCase() === "nữ" || cat.name.toLowerCase() === "nu") {
            prefix = "/assets/images/products/woman/";
          }
        }
        newForm.image = prefix + fileName;
      }
      setForm(newForm);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Loại bỏ trường category (nếu có), chỉ gửi categoryId
    const submitData = { ...form };
    delete submitData.category;
    onSubmit(submitData);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block font-medium mb-1">Tên sản phẩm</label>
        <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
      </div>
      <div>
        <label className="block font-medium mb-1">Mô tả</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
      </div>
      <div>
        <label className="block font-medium mb-1">Giá (VNĐ)</label>
        <input name="priceCents" type="number" value={form.priceCents} onChange={handleChange} required min={0} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
      </div>
      <div>
        <label className="block font-medium mb-1">SKU</label>
        <input name="sku" value={form.sku} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
        {renderExtraFields && renderExtraFields({ form })}
      </div>
      <div>
        <label className="block font-medium mb-1">Loại</label>
        <select name="categoryId" value={form.categoryId || ""} onChange={handleChange} required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400">
          <option value="">-- Chọn loại --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Số lượng kho</label>
        <input name="inventory" type="number" value={form.inventory} onChange={handleChange} min={0} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400" />
      </div>
    </div>
  );
};

export default forwardRef(ProductForm);
