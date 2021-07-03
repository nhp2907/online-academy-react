import React from 'react'
import ReactPlayer from 'react-player'

interface Props {
    url?: string
}

const VideoPlayer: React.FC<Props> = ({url}) => {
    return (
        <div>
            <ReactPlayer url={url} playing={true} controls={true}/>
        </div>
    );
}


export default VideoPlayer;
