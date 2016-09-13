import React, { PropTypes } from 'react';

const FirstTimeUser = (props) => {
  return (
    <div>
      <form onSubmit ={(event)=>{ event.preventDefault(); var name = document.getElementById('editName').value; var email = document.getElementById('editEmail').value; var birthday = document.getElementById('editBirthday').value; var gender = document.getElementById('editGender').value; var bio = document.getElementById('editBio').value; props.changeProfileInfo(name, email, birthday, gender, bio); }}>
        <input id="editName" type="text" placeholder ='Name'/>
        <input id="editEmail" placeholder ='Email'/>
        <input id="editBirthday" placeholder ='Birthday'/>
        <input id="editGender" placeholder ='Gender'/>
        <input id="editBio" placeholder='About Me'/>
        <button>
        Edit Profile
        </button>
      </form>
    </div>

  );


};

export default FirstTimeUser;