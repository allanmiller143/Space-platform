/* eslint-disable react/prop-types */
import "./spinner.css";

const Spinner = ({height = "100vh"}) => (
  <div className="fallback-spinner" style={{height: height}}>
    <div className="loading component-loader">
      <div className="effect-1 effects" />
      <div className="effect-2 effects" />
      <div className="effect-3 effects" />
    </div>
  </div>
);
export default Spinner;
