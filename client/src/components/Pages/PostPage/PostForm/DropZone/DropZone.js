import React from "react";
import Dropzone from "react-dropzone";
import "./DropZone.css";

const DropZone = ({ handleDrop, uploadedImage }) => {
  return (
    <div className="dropzone">
      <Dropzone
        multiple={false}
        accept="image/jpeg, image/png"
        onDrop={handleDrop}
      >
        <span className={uploadedImage ? "hide" : ""}>
          Click Anywhere To Add Image
        </span>
        <img
          className={!uploadedImage ? "hide" : ""}
          src={uploadedImage ? uploadedImage.preview : ""}
          alt="item"
        />
      </Dropzone>
    </div>
  );
};

export default DropZone;
