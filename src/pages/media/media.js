import { useEffect, useState, useRef } from "react";
import { Navigate } from 'react-router-dom';
import { GetFilenames, GetThumbnails, UnauthorizedError } from './apis';
import { MediaView } from "../../components/mediaview";
import { Header } from "../../components/header";
import { Lightbox } from "../../components/lightbox";
import "./media.css"

export default function Media() {
    const [listFilesResp, setListFilesResp] = useState({ "files": [] });
    const [thumbnails, setThumbnails] = useState({});
    const [filenames, setFilenames] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const [showMedia, setShowMedia] = useState({});
    const [serviceUnavailable,setServiceUnavailable] = useState(false)
    const [showLightBox,setShowLightBox] = useState(false)
    const [lightboxFileIndex, setLightBoxFileIndex] = useState(0)
    const thumbnailLoader = useRef(null);

    // Initialize this only once
    if (!thumbnailLoader.current) {
        thumbnailLoader.current = new ThumbnailLoader()
    }

    useEffect(() => {
        GetFilenames().then(jsonData => {
            setFilenames(jsonData.files.map(file => file.filename));
            setListFilesResp(jsonData);
        }).catch((error) => {
            console.log(error.message);
            if (error === UnauthorizedError) {
                setShowLogin(true);
            }
            else if(error.message==="Failed to fetch"){
                setServiceUnavailable(true)
            }
        });

    }, []);

    // useEffect(() => {
    //     // // Create a new AbortController for each thumbnail loading session
    //     // abortControllerRef.current = new AbortController();

    //     // SetThumbnailsInBatch(filenames, thumbnails, setThumbnails, abortControllerRef.current.signal)
    //     //     .catch((error)=>{
    //     //         if(error===UnauthorizedError)setShowLogin(true)
    //     //     });

    //     // // Cleanup function
    //     // return () => {
    //     //     if (abortControllerRef.current) {
    //     //         abortControllerRef.current.abort();
    //     //     }
    //     // };
    //     console.log("Starting thumbnail loading session")
    //     thumbnailLoader.current.start(filenames, thumbnails, setThumbnails).catch((error)=>{
    //         if(error==UnauthorizedError){
    //             setShowLogin(true)
    //         }
    //     })

    //     // Cleanup function
    //     return ()=>{
    //         thumbnailLoader.current.stop()
    //     }
    // }, [listFilesResp]);


    // Thumbnail loading is on when lightbox is off and vice versa
    useEffect(() => {

        console.log(showLightBox,listFilesResp)

        if (showLightBox===false){
            console.log("Starting thumbnail loading session")
            thumbnailLoader.current.start(filenames, thumbnails, setThumbnails).catch((error)=>{
            if(error==UnauthorizedError){
                setShowLogin(true)
            }
        })
        }
        else{
            // Abort the current thumbnail loading
        thumbnailLoader.current.stop()
        }

        // Cleanup function
        return ()=>{
            console.log("Cleanup")
            thumbnailLoader.current.stop()
        }
        
    }, [showLightBox,listFilesResp]);

    if (showLogin) {
        return <Navigate to={"/login"} />;
    }

    if (serviceUnavailable){
        return <div style={{justifyContent:"center", display:"flex", color:"#FFBADE"}}><h1>Service Unavailable</h1></div>
    }

    return (
        <>
        <div>
            <Header />
            <MediaView
                thumbnails={thumbnails}
                filenames={filenames}
                showLightBox={showLightBox}
                setShowLightBox={setShowLightBox}
                lightboxFileIndex = {lightboxFileIndex}
                setLightBoxFileIndex = {setLightBoxFileIndex}
                key={"mediaview"}
            />
            {/* { showLightBox, setShowLightBox, filenames, lightboxFileIndex, setLightBoxFileIndex} */}
            {showLightBox?<Lightbox 
                showLightBox={showLightBox}
                setShowLightBox={setShowLightBox}
                filenames={filenames}
                lightboxFileIndex = {lightboxFileIndex}
                setLightBoxFileIndex = {setLightBoxFileIndex}>
             </Lightbox>:'' }
        </div>
        </>
    );
}

async function SetThumbnailsInBatch(filenames, thumbnails, setThumbnails, signal) {
    const batchSize = 16;
    let offset = 0

    //Continue where left off
    for (let filename of filenames) {
        if (thumbnails[filename]) offset++
        else break;
    }

    for (let i = offset; i < filenames.length; i += batchSize) {
        if (signal.aborted) {
            console.log("Thumbnail loading aborted");
            return;
        }

        const batch = filenames.slice(i, i + batchSize);

        try {
            const jsonData = await GetThumbnails(batch, signal);
            setThumbnails(prev => ({
                ...prev,
                ...jsonData
            }));
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log("Fetch aborted");
                return;
            }
            console.error("Error fetching thumbnails:", error);
            throw error
        }
    }
}


class ThumbnailLoader {
    
    constructor() {
        if(ThumbnailLoader._instance){
            return ThumbnailLoader._instance
        }
        ThumbnailLoader._instance=this
        console.log("Thumbnail loader initialized")
        this.controller = new AbortController()
    }

    start(filenames, thumbnails, setThumbnails) {
        if(this.controller.signal.aborted){
            this.controller = new AbortController()
        }
        console.log("start()")
        return SetThumbnailsInBatch(filenames, thumbnails, setThumbnails, this.controller.signal);
    }

    stop() {
        this.controller.abort();
        console.log("stop()");
    }
}