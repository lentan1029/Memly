import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import MapMemlyContainer from '../memly/container';

// import shallowCompare from 'react-addons-shallow-compare'
// import controllable from 'react-controllables'

const MapPresentational = (props) => {
  if (props.currentUserLocation.lat === 0) {
    return (
      <div className='loadingscreen'>
        <div className="loading"><h1>L</h1></div> 
        <div className="ringloading pulseloading" />
        <div><h1 className="loading2">ADING</h1></div>
      </div>
      );
  } else {

    const memlys = props.memlys.map((memly, index) => {
      const { _id, showInfo, defaultAnimation, media, user, place, comment } = memly;
      return (
        <MapMemlyContainer
          // Represent other peoples' memlys
          id={_id}
          media={media}
          user={user}
          place={place}
          comment={comment}
          handleLike={props.handleLike}
          handleDislike={props.handleDislike}
          defaultAnimation={defaultAnimation}
          showInfo={showInfo}
          {...memly.location}
          key={index}
        />
      );
    });

    return (
      <div className="map">
       <GoogleMap
        /*
         * Using the ES6 spread syntax (...) below, the following props will be passed from the
         * MapPresentational component into the GoogleMap component:
         * * onChildMouseEnter={(e)=>{console.log(e)}} // event argument will return index of child 
           * onClick={(e)=>{console.log(e)}} // event will show lat long on map
           * options={{styles: mapStyle}}
           * bootstrapURLKeys={{key: 'AIzaSyA0VOMMs7FVCwz_klHsvs_KFt-CV-YbVNc'}}
           * center={[array representing center for googlemaps]}
           * zoom={props.zoom}
           * * Instead of css hover (which sometimes is "bad" for map markers)
             * ("bad" means inability to hover on markers placed under other markers)
             * you can use internal GoogleMap component hover algorithm
           * * Hover algorithm explained at "x_distance_hover" example
           * hoverDistance={K_SIZE}
           */
          {...props}
          // "google-map-react" library requires center to be an array as per below
          center={[props.currentUserLocation.lat, props.currentUserLocation.lng]}
        >
        <MapMemlyContainer
          // Represent current user location
          representCurrentUserLocation={true}
          {...props.currentUserLocation}
        />
        {memlys}
      </GoogleMap>
    </div>
  );
  }
};

export default MapPresentational;