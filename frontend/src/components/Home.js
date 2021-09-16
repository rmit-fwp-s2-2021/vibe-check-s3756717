import React from "react";
import logo from "../logo.svg";

export default function Home(props) {
  return (
    <div className="text-center">
      <h1 className="display-4">Home</h1>
      {props.user !== null && <h4><strong>Hello {props.user.first_name} {props.user.last_name}!</strong></h4>}
      <img src={logo} className="w-50" alt="logo" />
    </div>
  );
}
