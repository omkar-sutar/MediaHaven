import React, { useEffect } from 'react';
import "./thumbnail.css"

const DEFAULT_IMAGE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT70WD94DGxM0AJkNKQ1be36WKWXcqAb_NDCQ&s";

export function Thumbnail({ imageData, filename, setShowMedia }) {
    const src = imageData ? `data:image/jpeg;base64,${imageData}` : DEFAULT_IMAGE;

    function onThumbnailClick(){
        setShowMedia({"filename":filename})
        console.log("Image:clicked")
    }
    
    return (
        <div className="thumbnail">
            <img src={src} alt="Thumbnail"  onClick={onThumbnailClick}/>
        </div>
    );
}