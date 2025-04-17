import React from "react";
import "./TitleSection.css";

interface TProps {
  title: string;
}

const TitleSection = ({ title }: TProps) => {
  return (
    <div className="title-section">
      <p>{title}</p>
    </div>
  );
};

export default TitleSection;
