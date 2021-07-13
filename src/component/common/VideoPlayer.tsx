import React from 'react'
import ReactPlayer from 'react-player'

interface Props {
    url?: string
}

const VideoPlayer: React.FC<Props> = ({url}) => {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <ReactPlayer width={'100%'} height={'100%'} url={url} playing={true} controls={true}/>
        </div>
    );
}


export default VideoPlayer;
