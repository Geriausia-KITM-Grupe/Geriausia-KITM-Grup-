import SildeCover from "./SildeCover";
import SilderControler from "./SilderControler";
import Slide from "./Slide";

const Slider = () => {
  return (
    <>
      <div className="slideshow">
        <div className="slideshow__slide slideshow__slide--active">
          <Slide />
          <SilderControler />
          <SildeCover />
        </div>
      </div>
    </>
  );
};

export default Slider;
