import { useEffect, useState, useRef } from "react";
import { Navigate } from 'react-router-dom';
import { GetFilenames, GetThumbnails, UnauthorizedError } from './apis';
import { MediaView } from "../../components/mediaview";
import { Header } from "../../components/header";

export default function Media() {
    const [listFilesResp, setListFilesResp] = useState({ "files": [] });
    const [thumbnails, setThumbnails] = useState({});
    const [filenames, setFilenames] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const [showMedia, setShowMedia] = useState({});
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
            console.log(error);
            if (error === UnauthorizedError) {
                setShowLogin(true);
            }
        });

    }, []);

    useEffect(() => {
        // // Create a new AbortController for each thumbnail loading session
        // abortControllerRef.current = new AbortController();

        // SetThumbnailsInBatch(filenames, thumbnails, setThumbnails, abortControllerRef.current.signal)
        //     .catch((error)=>{
        //         if(error===UnauthorizedError)setShowLogin(true)
        //     });

        // // Cleanup function
        // return () => {
        //     if (abortControllerRef.current) {
        //         abortControllerRef.current.abort();
        //     }
        // };
        console.log("Starting thumbnail loading session")
        thumbnailLoader.current.start(filenames, thumbnails, setThumbnails).catch((error)=>{
            if(error==UnauthorizedError){
                setShowLogin(true)
            }
        })

        // Cleanup function
        return ()=>{
            thumbnailLoader.current.stop()
        }
    }, [listFilesResp]);

    useEffect(() => {
        if (Object.keys(showMedia).length === 0) return;
        console.log("Thumbnail clicked", showMedia);

        // Abort the current thumbnail loading
        thumbnailLoader.current.stop()
        
    }, [showMedia]);

    if (showLogin) {
        return <Navigate to={"/login"} />;
    }

    return (
        <div>
            <Header setShowLogin={setShowLogin} />
            <MediaView
                thumbnails={thumbnails}
                filenames={filenames}
                setShowMedia={setShowMedia}
                key={"mediaview"}
            />
        </div>
    );
}

async function SetThumbnailsInBatch(filenames, thumbnails, setThumbnails, signal) {
    const batchSize = 3;
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