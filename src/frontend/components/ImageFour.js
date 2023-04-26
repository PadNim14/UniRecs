import { Parallax } from "react-parallax";
import stanford from '../assets/stanford.jpg'
const ImageFour = () => (
    <div className="parallax-container">
        <Parallax speed={10} className="image" bgImage={stanford} strength={900}>
            <div className="content">
                <span className="img-txt">
                    Find your perfect college today!
                </span>

            </div>
        </Parallax>
    </div>

);

export default ImageFour