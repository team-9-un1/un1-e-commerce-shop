import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/product/ProductForm";
import Header from "../components/common/Header";
import SkeletonLoader from "../components/common/SkeletonLoader";
import productService from "../services/productService";

const getImages = () => {
  return [
    "bespoke-metal-towels.jpg",
    "handcrafted-rubber-tuna.jpg",
    "small-wooden-mouse.jpg",
    "rustic-plastic-tuna.jpg",
    "handmade-soft-soap.jpg",
    "handmade-rubber-pants.jpg",
    "sleek-cotton-pizza.jpg",
    "gorgeous-granite-fish.jpg",
  ];
};

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [newImage, setNewImage] = useState(""); // object URL để preview ảnh mới
  const [formData, setFormData] = useState(null); // Thêm state để nhận dữ liệu form
  const productFormRef = useRef(); // ref để lấy dữ liệu form con
  const [categoryName, setCategoryName] = useState(""); // Lưu tên loại để cập nhật đường dẫn ảnh
  const [selectedImagePath, setSelectedImagePath] = useState(""); // đường dẫn dự kiến khi lưu
  const [newImageFile, setNewImageFile] = useState(null); // lưu file ảnh mới để upload nếu cần

  useEffect(() => {
    setLoading(true);
    setImages(getImages());
    Promise.all([
      productService.getProductById(id).then(setProduct),
      productService.getCategories ? productService.getCategories().then(setCategories).catch(() => {}) : Promise.resolve()
    ]).finally(() => setLoading(false));
  }, [id]);

  const handleEdit = async (data) => {
    setSubmitting(true);
    try {
      const submitData = { ...data };
      // Ép kiểu về số cho các trường số
      submitData.priceCents = Number(submitData.priceCents);
      submitData.inventory = Number(submitData.inventory);
      if (submitData.categoryId) {
        submitData.categoryId = Number(submitData.categoryId);
      }
      // Nếu có ảnh mới, xác định prefix theo loại sản phẩm khi lưu
      if (newImageFile) {
        // Lấy tên loại từ categoryId
        let catName = "";
        if (submitData.categoryId && categories.length > 0) {
          const cat = categories.find((c) => c.id === submitData.categoryId);
          catName = cat ? cat.name : "";
        }
        let prefix = "/assets/images/products/";
        if (catName.toLowerCase() === "nam" || catName.toLowerCase() === "man") prefix = "/assets/images/products/man/";
        else if (catName.toLowerCase() === "nữ" || catName.toLowerCase() === "woman" || catName.toLowerCase() === "nu") prefix = "/assets/images/products/woman/";
        submitData.image = prefix + newImageFile.name;
      }
      await productService.editProduct(id, submitData);
      setMessage("Cập nhật thành công!");
      setTimeout(() => navigate("/"), 1000);
    } catch {
      setMessage("Lỗi khi cập nhật!");
    } finally {
      setSubmitting(false);
    }
  };

  // Xử lý chọn file ảnh mới
  // Xác định prefix đường dẫn ảnh dựa vào loại sản phẩm
  const getImagePrefix = (category) => {
    if (!category) return "/assets/images/products/";
    if (category.toLowerCase() === "nam" || category.toLowerCase() === "man") return "/assets/images/products/man/";
    if (category.toLowerCase() === "nữ" || category.toLowerCase() === "woman") return "/assets/images/products/woman/";
    return "/assets/images/products/";
  };

  // Khi chọn file ảnh mới
  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      let fileName = file.name;
      // Lấy loại hiện tại từ categoryName (ưu tiên), hoặc formData, hoặc product
      let prefix = getImagePrefix(categoryName || formData?.category || product?.category || "");
      setNewImage(objectUrl); // dùng object URL để preview
      setNewImageFile(file); // lưu file để upload nếu cần
      setSelectedImagePath(prefix + fileName);
    } else {
      setNewImage("");
      setSelectedImagePath("");
      setNewImageFile(null);
    }
  };
  // Khi đổi loại realtime, cập nhật lại đường dẫn ảnh nếu đã chọn ảnh mới
  useEffect(() => {
    if (newImageFile) {
      let prefix = getImagePrefix(categoryName || formData?.category || product?.category || "");
      setSelectedImagePath(prefix + newImageFile.name);
    }
    // eslint-disable-next-line
  }, [categoryName]);

  // Khi đổi loại realtime, cập nhật lại đường dẫn ảnh nếu đã chọn ảnh mới
  useEffect(() => {
    if (newImageFile) {
      let category = formData?.category || product?.category || "";
      let prefix = getImagePrefix(category);
      setSelectedImagePath(prefix + newImageFile.name);
    }
    // eslint-disable-next-line
  }, [formData?.category]);

  if (loading || !product) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col">
      <Header />
      <div className="flex justify-center items-start pb-20 px-2 w-full grow" style={{marginTop: '120px'}}>
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-blue-200">
            <SkeletonLoader type="detail" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col">
      <Header />
      <div className="flex justify-center items-start pb-20 px-2 w-full grow" style={{marginTop: '120px'}}>
        <div className="w-full max-w-2xl">
          <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-800 tracking-tight drop-shadow-lg uppercase">Sửa sản phẩm</h2>
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-blue-200">
            {submitting ? (
              <SkeletonLoader type="detail" />
            ) : (
              <form className="space-y-8" style={{width: '100%'}} onSubmit={(event) => {
                event.preventDefault();
                // Lấy dữ liệu mới nhất từ form con qua ref
                if (productFormRef.current && productFormRef.current.getFormData) {
                  const latestData = productFormRef.current.getFormData();
                  handleEdit(latestData);
                } else if (formData) {
                  handleEdit(formData);
                }
              }}>
                {/* Các trường nhập liệu sản phẩm */}
                <div>
                  <ProductForm
                    ref={productFormRef}
                    onSubmit={(data) => {
                      setFormData(data);
                      // Lấy tên loại từ categories
                      const cat = categories.find((c) => c.id === data.categoryId);
                      setCategoryName(cat ? cat.name : "");
                    }}
                    initialData={product}
                    categories={categories}
                    images={images}
                  />
                </div>
                {/* Chọn ảnh mới */}
                <div>
                  <label className="block font-semibold mb-2 text-blue-700">Ảnh sản phẩm</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
                  />
                </div>
                {/* Preview ảnh */}
                {(product.image || newImage) && (
                  <div className="flex items-center gap-8 mt-4">
                    {/* Ảnh cũ */}
                    {product.image && (
                      <div className="relative group flex flex-col items-center">
                        <img
                          src={product.image}
                          alt="Ảnh cũ"
                          className={`w-36 h-36 object-cover rounded-2xl border-2 border-gray-200 shadow ${newImage ? 'opacity-40 blur-[2px]' : ''}`}
                        />
                        <span className="absolute left-0 right-0 bottom-0 text-xs text-center text-gray-600 bg-white/80 rounded-b-2xl py-1">Ảnh cũ</span>
                        <span className="block mt-2 text-xs text-gray-500 break-all bg-gray-100 px-2 py-1 rounded border border-gray-200 max-w-[12rem] text-center">{product.image}</span>
                      </div>
                    )}
                    {/* Ảnh mới */}
                    {newImage && (
                      <div className="relative group flex flex-col items-center">
                        <img
                          src={newImage}
                          alt="Ảnh mới"
                          className="w-36 h-36 object-cover rounded-2xl border-2 border-blue-400 shadow-lg"
                        />
                        <span className="absolute left-0 right-0 bottom-0 text-xs text-center text-blue-700 bg-white/90 rounded-b-2xl py-1">Ảnh mới (chưa upload)</span>
                      </div>
                    )}
                  </div>
                )}
                {/* Hiển thị đường dẫn ảnh mới dưới cùng form */}
                {selectedImagePath && (
                  <div className="mt-8 flex flex-col items-center">
                    <span className="text-sm font-semibold text-blue-700">Đường dẫn ảnh mới sẽ lưu:</span>
                    <span className="block mt-1 text-xs text-blue-700 break-all bg-blue-50 px-2 py-1 rounded border border-blue-200 max-w-full text-center">{selectedImagePath}</span>
                  </div>
                )}
                <div className="flex flex-row gap-4 mt-8">
                  <button type="submit" className="flex-1 py-3 px-4 bg-gray-200 text-blue-700 rounded-2xl hover:bg-gray-300 transition font-bold text-lg shadow-lg tracking-wider border border-blue-200">Cập nhật</button>
                  <button type="button" className="flex-1 py-3 px-4 bg-gray-200 text-blue-700 rounded-2xl hover:bg-gray-300 transition font-bold text-lg shadow-lg tracking-wider border border-blue-200" onClick={() => navigate("/")}>Quay lại</button>
                </div>
                {message && <div className="mt-4 text-center text-green-600 font-semibold text-lg animate-pulse">{message}</div>}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
