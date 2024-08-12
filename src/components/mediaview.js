import React from 'react';
import { Thumbnail } from "./thumbnail"
import "./mediaview.css"

export function MediaView({ thumbnails, filenames, setShowMedia }) {
    return (
        <div className="mediaView">
            {filenames.map((filename, index) => (
                <Thumbnail key={index} imageData={thumbnails[filename]} filename={filename} setShowMedia={setShowMedia}/>
            ))}
        </div>
    );
}