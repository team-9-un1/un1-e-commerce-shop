import React from 'react';
import './StoryCard.css'; 

const StoryCard = ({ imageSrc, title, description, link }) => {
  return (
    <div className="story-card">
      <div className="card-image">
        {imageSrc ? (
          <img src={imageSrc} alt={title} />
        ) : (
          <div className="placeholder-box">
            <span>picture related goes here</span>
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>
        <a href={link || "#"} className="card-link">
          Read more <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
};

export default StoryCard;