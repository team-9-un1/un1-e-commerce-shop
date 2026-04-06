import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AdminSidebar from "../components/admin/AdminSidebar";
import "../styles/pages/admin-dashboard.css";
import "../styles/pages/admin-categories.css";

const categories = [
  {
    id: 1,
    name: "NAM",
    image:
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M"],
  },
  {
    id: 2,
    name: "NỮ",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M"],
  },
  {
    id: 3,
    name: "TRẺ EM",
    image: "",
    sizes: ["XS", "S"],
  },
  {
    id: 4,
    name: "PHỤ KIỆN",
    image: "",
    sizes: ["FREESIZE", "M"],
  },
  {
    id: 5,
    name: "THỂ THAO",
    image: "",
    sizes: ["S", "L"],
  },
  {
    id: 6,
    name: "BASIC",
    image: "",
    sizes: ["M", "L"],
  },
];

const AdminCategories = () => {
  return (
    <div className="admin-dashboard-page admin-categories-page">
      <Header />

      <main className="admin-dashboard-main">
        <div className="admin-dashboard-container admin-layout-sticky-sidebar">
          <AdminSidebar />

          <section className="admin-content-card" aria-label="Admin category management">
            <header className="admin-categories-header">
              <h1>Quản lý danh mục</h1>
              <button type="button" className="admin-add-category-btn">
                + Thêm danh mục
              </button>
            </header>

            <div className="admin-categories-grid">
              {categories.map((category) => (
                <article className="admin-category-card" key={category.id}>
                  <div className="admin-category-image-wrap" aria-hidden="true">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="admin-category-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="admin-category-placeholder">No Image</div>
                    )}
                  </div>

                  <h2 className="admin-category-title">{category.name}</h2>

                  <div className="admin-category-sizes">
                    {category.sizes.map((size) => (
                      <button type="button" key={size} className="admin-size-chip">
                        {size}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminCategories;
