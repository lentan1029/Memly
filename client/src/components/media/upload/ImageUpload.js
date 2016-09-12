import React from 'react'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

const ImageUpload = ({imagePreviewUrl, handleSubmit, handleImageChange, handlePlaceChange, handleCommentChange}) => {
  // let {imagePreviewUrl} = this.state;
  let $imagePreview = null;
  if (imagePreviewUrl !== '') {
    $imagePreview = (<img  style={{marginTop: '2%'}} className='img-rounded' height='30%' width='30%' src={imagePreviewUrl} />);
  } else {
    $imagePreview = (<div className="previewText">Preview image</div>);
  }

  return (
    <div className='imageuploadcontain'>
    <div className='innerimageupload'>
    <div className='innerinnerimageupload'>
    <div className='innerinnerimageuploadh3'><h3>New Memly</h3></div>
    <div className='innerinnerimageuploadform'><form onSubmit={(e)=>handleSubmit(e)}>
      <FormGroup id='formControlsText' onChange={(e)=>handlePlaceChange(e)}>
        <ControlLabel>Tag Place:</ControlLabel>
        <FormControl type='text'/>
      </FormGroup>
      
      <FormGroup id='formControlsText' onChange={(e)=>handleCommentChange(e)}>
        <ControlLabel>Comment:</ControlLabel>
        <FormControl type='text'/>
      </FormGroup>

      <FormGroup controlId='formControlsFile' onChange={(e)=>handleImageChange(e)}>
        <ControlLabel>Upload Photo:</ControlLabel>
        <FormControl type='file'/>
      </FormGroup>
       <Button type="submit">
          Submit
      </Button>
    </form></div>
    <div className="imagePreview ">{$imagePreview}</div>
    </div>
    </div>
    </div>
  );
}

export default ImageUpload

// <form method="post" action="/api/photo" enctype="multipart/form-data">
//   <p>Title: <input type="text" name="title" /></p>
//   <p>Image: <input type="file" name="image" /></p>
//   <p><input type="submit" value="Upload" /></p>
// </form>

// <form method="post" action="/api/photo" encType="multipart/form-data">

// <div><button className="submitButton" type="submit">Upload Image</button></div>

