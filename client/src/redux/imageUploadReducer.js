// actions to be dispatched to reducer for imageUploadReducer === //

export function updateImageContainerLocation (currentUserLocation) {
  console.log('updating User location with action')
  return {
    type: 'UPDATE_IMAGE_CONTAINER_LOCATION',
    currentUserLocation,
  }
}

export function handlePlaceChange(placeText){
  console.log('place test', placeText)
  return {
    type: 'HANDLE_PLACE_CHANGE',
    place: placeText,
  }
}

export function handleCommentChange(commentText){
  return {
    type: 'HANDLE_COMMENT_CHANGE',
    comment: commentText,
  }
}

export function handleImageChange(file, imagePreviewUrl){
  return {
    type: 'HANDLE_IMAGE_CHANGE',
    file,
    imagePreviewUrl,
  }
}

//====== initial state for image container ====== //

const imageUploadInitialState = {
  file: '',
  imagePreviewUrl: '',
  location: {
    lat: 0.0,
    lng: 0.0,
  },
  place: '',
  comment: '',
}

//========= reducer to connect to container component ====//

export default function imageUploadReducer(state = imageUploadInitialState, action) {
  switch(action.type) {

    case 'UPDATE_IMAGE_CONTAINER_LOCATION' : {
      console.log('updating image user location in state tree')
      return {
        ...state,
        location: action.currentUserLocation
      }
    }

    case 'HANDLE_PLACE_CHANGE' : {
      return {
        ...state,
        place: action.place,
      }
    }

    case 'HANDLE_COMMENT_CHANGE' : {
      return {
        ...state,
        comment: action.comment,
      }
    }

    case 'HANDLE_IMAGE_CHANGE' : {
      return {
        ...state,
        file: action.file,
        imagePreviewUrl: action.imagePreviewUrl,
      }
    }

    default : return state
  }
}

