import React, { useEffect } from 'react';
import "./thumbnail.css"
import bg from "../assets/gray_thumbnail_bg.jpg"

const DEFAULT_IMAGE = bg

export function Thumbnail({ imageData, filename,fileIndex,setShowLightBox,setLightBoxFileIndex }) {
    const src = imageData ? `data:image/jpeg;base64,${imageData}` : DEFAULT_IMAGE;

    function onThumbnailClick(){
        setLightBoxFileIndex(fileIndex)
        setShowLightBox(true)
        console.log(`Image ${filename} ${fileIndex}:clicked`)
    }
    
    return (
        <div className="thumbnail">
            <img src={src} alt="Thumbnail"  onClick={onThumbnailClick}/>
        </div>
    );
}