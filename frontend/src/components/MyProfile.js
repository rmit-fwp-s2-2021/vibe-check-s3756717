import React from "react";

export default function MyProfile(props) {
  return (
    <div>
      <h1 className="display-4">My Profile</h1>
      <h4><strong>Hello {props.user.first_name} {props.user.last_name}!</strong></h4>
    </div>
  );
}
