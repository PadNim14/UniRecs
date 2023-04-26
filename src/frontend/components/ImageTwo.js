import { Parallax } from "react-parallax";
import library from '../assets/library.jpg'
const ImageTwo = () => (
    <div className="parallax-container">
        <Parallax speed={10} className="image" bgImage={library} strength={200}>
            <div className="content">
                <span className="img-txt">
                    We're here to help you with the college process.
                </span>

            </div>
        </Parallax>
    </div>

);

export default ImageTwo