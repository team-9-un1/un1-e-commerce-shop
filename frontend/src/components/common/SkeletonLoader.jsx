// SkeletonLoader.jsx
import React from "react";
import "../../styles/components/SkeletonLoader.css";

const SkeletonLoader = ({ type = "card", count = 8, style = {} }) => {
  if (type === "card") {
    return (
      <div className="skeleton-grid" style={style}>
        {Array.from({ length: count }).map((_, i) => (
          <div className="skeleton-card" key={i}>
            <div className="skeleton-image" />
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
          </div>
        ))}
      </div>
    );
  }
  if (type === "detail") {
    return (
      <div className="skeleton-detail">
        <div className="skeleton-image large" />
        <div className="skeleton-detail-info">
          <div className="skeleton-line" style={{ width: "60%" }} />
          <div className="skeleton-line" style={{ width: "40%" }} />
          <div className="skeleton-line" style={{ width: "80%" }} />
          <div className="skeleton-line" style={{ width: "90%" }} />
        </div>
      </div>
    );
  }
  if (type === "list") {
    return (
      <div className="skeleton-list">
        {Array.from({ length: count }).map((_, i) => (
          <div className="skeleton-list-item" key={i}>
            <div className="skeleton-image small" />
            <div className="skeleton-line" style={{ width: "70%" }} />
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default SkeletonLoader;
