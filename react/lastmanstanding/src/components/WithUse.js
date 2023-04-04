import json from "../assets/json.png";
import react_img from "../assets/react_img.png";
import compatible from "../assets/compatable.svg";
import compatible_mobile from "../assets/compatible-mobile.svg";

const withUse = () => {
  return (
    <div className="use-container">
      <div className="use-with-text">
        Accurate and compatible <br /> with any technology
      </div>
      <div className="use-with-icons">
        <img src={compatible} alt="" />
      </div>
    </div>
  );
};

// quick, easy(docs), efficient, secure!!!

export default withUse;
