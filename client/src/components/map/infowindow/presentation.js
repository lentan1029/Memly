import React from 'react'
import { calculateSince, calculateDistance } from './utils/infowindowUtils'

export default (props) => {
  // const infowindow = props.$hover ? (
  //   <div className="memly-infowindow" /* Infowindow floats above marker */>
  //     <img className="memly-media" src={props.media.url} />
  //   </div>
  // ) : (
  //   <div display={'none'}></div>
  // )

  return (
    <div className="iw">
      <div className="iw-layers">
        <div className="iw-overlay">
          <div className="iw-header">
            <img className="iw-avatar" src={props.user.avatarUrl} />
            <div className="iw-name">{props.user.name}</div>
            <div className="iw-place">{props.place}</div>
          </div>
          <div className="iw-footer">
            <div className="iw-pane">
              <div className="iw-like-button" onClick={(e)=>props.handleLike(e)}>
                <img className="iw-like-image" value={props.id} alt={props.media.url} src="../../../../images/icons/heart/heart@2x.png" />
              </div>
              <div className="iw-dislike-button" onClick={(e)=>props.handleDislike(e)}>
                <img className="iw-dislike-image" value={props.id} alt={props.media.url} src="../../../../images/icons/dislike/dislike@2x.png" />
              </div>
            </div>
            <div className="iw-time">{calculateSince(props.media.timestamp)}</div>
          </div>
        </div>
        <img className="iw-media" src={props.media.url} />
      </div>
      <div className="iw-comment">{props.comment}</div>
    </div>
  );
}