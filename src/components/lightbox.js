import { useEffect, useState, useRef } from "react";
import "./lightbox.css"
import { GetImage, PrepareVideoURL } from "../pages/media/apis";

const imageExtensions = [".jpg", ".png"]

export function Lightbox({ showLightBox, setShowLightBox, filenames, lightboxFileIndex, setLightBoxFileIndex }) {
    const [imageToShow, setImageToShow] = useState(null);
    const [videoToShow, setVideoToShow] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        let isImage = imageExtensions.some(ext => filenames[lightboxFileIndex].endsWith(ext));
        
        if (isImage) {
            console.log("Getting image", lightboxFileIndex);
            GetImage(filenames[lightboxFileIndex]).then((uri) => {
                console.log(uri);
                setImageToShow(uri);
                setVideoToShow(null);
            });
        } else {
            console.log("Getting video", filenames[lightboxFileIndex]);
            setVideoToShow(PrepareVideoURL(filenames[lightboxFileIndex]));
            setImageToShow(null);
        }
    }, [lightboxFileIndex, filenames]);

    const showNext = (e) => {
        e.stopPropagation();
        if (lightboxFileIndex >= filenames.length - 1) {
            console.log('fileindex > last index');
            setShowLightBox(false);
        } else {
            setLightBoxFileIndex(prev => prev + 1);
        }
    };

    const showPrev = (e) => {
        e.stopPropagation();
        if (lightboxFileIndex <= 0) {
            setShowLightBox(false);
        } else {
            setLightBoxFileIndex(prev => prev - 1);
        }
    };

    const handleVideoLoad = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Error playing video:", error);
            });
        }
    };

    console.log("Entered Lightbox component");
    return (
        <div id="lightbox">
            <button onClick={showPrev} className="lightbox-prev-btn"></button>
            {imageToShow && <img id="lightbox-img" alt="Can't display the image" src={imageToShow} />}
            {videoToShow && (
                <video 
                     //ref={videoRef}
                    src={videoToShow}
                    controls
                    autoPlay={true}
                    //onLoadedMetadata={handleVideoLoad}
                ></video>
            )}
            <button onClick={showNext} className="lightbox-next-btn"></button>
            <button  className="lightbox-close-btn" onClick={()=>setShowLightBox(false)}>Close</button>
        </div>
    );
}