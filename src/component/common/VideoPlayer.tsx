import React, {LegacyRef, useEffect, useRef, useState} from 'react'
import ReactPlayer from 'react-player'
import {Simulate} from "react-dom/test-utils";
import {current} from "@reduxjs/toolkit";

interface Props {
    playing?: boolean
    currentTime?: number
    url?: string
    playedSecondsChange?: (currentSecond: number) => void
}

const VideoPlayer: React.FC<Props> = ({url, currentTime, playedSecondsChange, playing}) => {
    const playerRef = useRef<ReactPlayer>(null);
    const [seeked, setSeeked] = useState(false);
    const [currentSecond, setCurrentSecond] = useState(currentTime || 0);

    // useEffect(() => {
    //     return () => {
    //         if (playerRef && playerRef.current) {
    //             const current = playerRef.current.getCurrentTime()
    //             playedSecondsChange?.(current);
    //         }
    //     }
    // }, [])

    return (
        <div style={{width: '100%', height: '100%'}}>
            <ReactPlayer playing={playing||false} width={'100%'} height={'100%'} url={url} controls={true}
                         ref={playerRef}
                         onProgress={s => playedSecondsChange?.(s.playedSeconds)}
                         onReady={(player => {
                             if (!seeked) {
                                 setSeeked(true);
                                 player.seekTo(currentTime || 0, "seconds")
                             }
                         })}
            />
        </div>
    );
}


export default VideoPlayer;
