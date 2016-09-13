import React from 'react';

const ImageRetrieve = ({handleSubmit}) => {
  return (
		<button type="submit" onClick={(e)=>handleSubmit(e)}>Retrieve Nearby Images</button>
	);
};

export default ImageRetrieve;