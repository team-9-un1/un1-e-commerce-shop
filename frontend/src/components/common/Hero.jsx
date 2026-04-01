import React, { useState, useEffect } from "react";
import "../../styles/components/hero.css";
import productService from "../../services/productService";

const Hero = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    productService.getBannerByKey('HOME_HERO')
      .then(setBanner)
      .catch((err) => console.error("Error fetching hero banner:", err));
  }, []);

  const heroImage = banner?.imageUrl || "/src/assets/images/hero-image.png";

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-background">
          <img src={heroImage} alt={banner?.title || "Hero"} />
        </div>
        <div className="hero-overlay">
          <h1 className="hero-title">{banner?.title || "Welcome to UN1"}</h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
