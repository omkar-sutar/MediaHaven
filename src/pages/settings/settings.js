import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import "./settings.css";
import { retrieveImageQuality, setImageQuality } from "../../utils";
import { useNavigate } from "react-router-dom";

export function Settings() {
  const [imageQualitySliderValue, setImageQualitySliderValue] = useState(retrieveImageQuality());
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate()
  

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setImageQualitySliderValue(value);
  };

  const onSave = (e)=>{
    setImageQuality(imageQualitySliderValue)
    alert("Settings updated!")
    navigate("/media")
  }

  return (
    <>
      <Header></Header>
      <div className="settings-container">
        <h2>
          <u>Settings</u>
        </h2>
        <div className="slider-container">
          <p className="slider-label">Image quality: {`${imageQualitySliderValue}%`}</p>
          <input
            id="quality-slider"
            type="range"
            min="11"
            max="100"
            value={imageQualitySliderValue}
            onChange={handleSliderChange}
            className="default-slider"
          />
        </div>

        <button className="settings-save-btn" onClick={onSave}>Save</button>
      </div>
    </>
  );
}