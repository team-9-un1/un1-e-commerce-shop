import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SkeletonLoader from "../components/common/SkeletonLoader";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import productService from "../services/productService";
import "../styles/pages/product-detail.css";

const ProductDetail = () => {
    const { id, category } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const isAdmin = user && (user.role === "ADMIN" || user.role === "admin");
    // Xử lý xóa sản phẩm
    const [deleting, setDeleting] = useState(false);
    const handleDelete = async () => {
        if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
        setDeleting(true);
        try {
            await productService.deleteProduct(product.id);
            alert("Đã xóa sản phẩm!");
            navigate("/");
        } catch {
            alert("Xóa thất bại!");
        } finally {
            setDeleting(false);
        }
    };

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);
        productService.getProductById(id)
            .then((data) => {
                if (isMounted) setProduct(data);
            })
            .catch((err) => {
                if (isMounted) setError("Không tìm thấy sản phẩm hoặc lỗi server.");
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });
        return () => { isMounted = false; };
    }, [id]);

    const handleAddToCart = async () => {
        if (!selectedSize) {
            const sizeSection = document.querySelector('.size-selection');
            if (sizeSection) {
                sizeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                sizeSection.classList.add('highlight-required');
                setTimeout(() => {
                    sizeSection.classList.remove('highlight-required');
                }, 2000);
            }
            toast.error("Vui lòng chọn kích thước!");
            return;
        }
        await addToCart({
            ...product,
            color: product?.colors?.[selectedColor]?.name || "Default",
            size: selectedSize
        }, quantity);
        // Toast is handled in CartContext.addToCart
    };

    if (loading) {
        return (
            <div className="product-detail-page">
                <Header />
                <div style={{ margin: '40px 0' }}>
                  <SkeletonLoader type="detail" />
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-detail-page">
                <Header />
                <div className="product-not-found">
                    <h2>{error || "Sản phẩm không tồn tại"}</h2>
                    <button onClick={() => navigate(`/products/${category || ""}`)}>
                        Quay lại
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    // Chuẩn hóa dữ liệu cho UI (nếu backend chưa có colors, sizes, images thì để trống hoắc fallback)
    const images = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
    const colors = product.colors && product.colors.length > 0 ? product.colors : [
        { hex: "#000000", name: "Đen" },
        { hex: "#ffffff", name: "Trắng" },
        { hex: "#8b4513", name: "Nâu" }
    ];
    const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ["S", "M", "L", "XL"];

    const getImageUrl = (url) => {
        if (!url) return "";
        // Nếu url bắt đầu bằng /src/assets thì thay bằng /assets
        let fixed = url.replace(/^\/src\/assets/, '/assets');
        return fixed;
    };

    // Debug: log đường dẫn ảnh thực tế
    if (images && images[selectedImage]) {
        console.log('Image path:', images[selectedImage]);
        console.log('Image URL after getImageUrl:', getImageUrl(images[selectedImage]));
    }

    return (
        <div className="product-detail-page">
            <Header />
            <main className="product-detail-main">
                {/* Back Button */}
                <button
                    className="back-button"
                    onClick={() => navigate(`/products/${category || ""}`)}
                >
                    BACK
                </button>

                <div className="product-detail-container">
                    {/* Image Gallery */}
                    <div className="product-gallery">
                        <div className="main-image">
                            {images.length > 0 ? (
                                <img src={getImageUrl(images[selectedImage])} alt={product.name} />
                            ) : (
                                <div style={{width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>No Image</div>
                            )}
                        </div>
                        <div className="thumbnail-images">
                            {images.slice(0, 4).map((img, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={getImageUrl(img)} alt={`${product.name} ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product-info-section">
                        <h1 className="product-detail-title">Thông tin sản phẩm</h1>
                        <h2 className="product-detail-name">{product.name}</h2>
                                                <p className="product-detail-price">
                                                    {(product.priceCents ?? product.price) ? ((product.priceCents ?? product.price).toLocaleString('vi-VN') + ' VNĐ') : ''}
                                                </p>

                        {/* Add to Cart Button */}
                        <button className="add-to-cart-detail" onClick={handleAddToCart}>
                            <span className="cart-icon"></span>
                            Thêm vào giỏ hàng
                        </button>
                        {isAdmin && (
                            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                                <button
                                    className="edit-btn product-action-btn"
                                    onClick={() => navigate(`/edit-product/${product.id}`)}
                                    style={{ minWidth: 90 }}
                                >
                                    ✏️ Sửa
                                </button>
                                <button
                                    className="delete-btn product-action-btn"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    style={{ minWidth: 90 }}
                                >
                                    🗑️ {deleting ? "Đang xóa..." : "Xóa"}
                                </button>
                                <button
                                    className="add-product-btn product-action-btn"
                                    onClick={() => navigate("/add-product")}
                                    style={{ minWidth: 90 }}
                                >
                                    ➕ Thêm mới
                                </button>
                            </div>
                        )}

                        {/* Color Selection */}
                        {colors && colors.length > 0 && (
                            <div className="product-options">
                                <h3 className="options-title">Màu sắc và kích thước</h3>
                                <div className="color-swatches">
                                    {colors.map((color, index) => (
                                        <div key={index} className="color-option">
                                            <div
                                                className={`color-swatch ${selectedColor === index ? "selected" : ""}`}
                                                style={{ backgroundColor: color.hex, border: color.hex === '#ffffff' ? '1px solid #ddd' : 'none' }}
                                                onClick={() => setSelectedColor(index)}
                                            />
                                            <span className="color-name">{color.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selection */}
                        {sizes && sizes.length > 0 && (
                            <div className="size-selection">
                                <a href="#" className="size-guide-link">
                                    Tư vấn size theo số đo →
                                </a>
                                <div className="size-chart">
                                    <div className="size-chart-row size-chart-header">
                                        <div className="size-cell header-cell">Size</div>
                                        {sizes.map((size) => (
                                            <div
                                                key={size}
                                                className={`size-cell ${selectedSize === size ? "selected" : ""}`}
                                                onClick={() => setSelectedSize(size)}
                                            >
                                                {size}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="size-chart-row">
                                        <div className="size-cell header-cell">Ngực (cm)</div>
                                        {sizes.map((size) => (
                                            <div key={size} className="size-cell">-</div>
                                        ))}
                                    </div>
                                    <div className="size-chart-row">
                                        <div className="size-cell header-cell">Vai (cm)</div>
                                        {sizes.map((size) => (
                                            <div key={size} className="size-cell">-</div>
                                        ))}
                                    </div>
                                    <div className="size-chart-row">
                                        <div className="size-cell header-cell">Dài (cm)</div>
                                        {sizes.map((size) => (
                                            <div key={size} className="size-cell">-</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Description */}
                <div className="product-description-section">
                    <h3 className="description-title">Mô tả sản phẩm</h3>
                    <div className="description-content">
                        {product.description && <p>{product.description}</p>}
                        {product.material && (
                            <div className="material-info">
                                <strong>CHẤT LIỆU:</strong>
                                <p style={{ whiteSpace: "pre-line" }}>{product.material}</p>
                            </div>
                        )}
                        {product.careInstructions && (
                            <div className="care-instructions">
                                <strong>Hướng dẫn bảo quản:</strong>
                                <p style={{ whiteSpace: "pre-line" }}>
                                    {product.careInstructions}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetail;
