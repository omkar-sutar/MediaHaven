import React from 'react';
import { Thumbnail } from "./thumbnail"
import "./mediaview.css"

export function MediaView({ thumbnails, filenames, showLightBox, setShowLightBox, lightboxFileIndex, setLightBoxFileIndex }) {
    return (
        <div className="mediaView">
            {filenames.map((filename, index) => (
                <Thumbnail key={index} imageData={thumbnails[filename]} filename={filename} fileIndex={index} 
                showLightBox={showLightBox} setShowLightBox={setShowLightBox} setLightBoxFileIndex={setLightBoxFileIndex} />
            ))}
        </div>
    );
}