import React from "react";
import "./style.css";

const Donate = () => {
  return (
    <form className="Donate-Page">
      <h1>Enter Item Details <span>Below</span></h1>
      <input type="text" title="title" id="" placeholder="Enter Title"/>
      <input type="size" title="size" id="" placeholder="Size (S/M/L)"/> 
      <textarea name="description" id="" cols="30" rows="10" placeholder="Description (Optional)"/>
      <button className = "button0"type='upload'>Upload Image</button>
      <button className = "button1"type='submit'>Submit</button>
    </form>
  )
};

export default Donate;
