import { Parallax } from "react-parallax";
import windsor from '../assets/windsor.jpg'
const ImageOne = () => (
    <Parallax speed={-10} className="image" bgImage={windsor} strength={1000}>
        <div className="content">
            <span className="img-txt">
                Our goal: Navigating the college search; one step at a time.
            </span>

        </div>
    </Parallax>
);

export default ImageOne