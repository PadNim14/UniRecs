import { Parallax } from "react-parallax";
import library from '../assets/library.jpg'
const ImageOne = () => (
    <Parallax speed={-10} className="image" bgImage={library} strength={200}>
        <div className="content">
            <span className="img-txt">
                We're here to help you with the college process.
            </span>

        </div>
    </Parallax>
);

export default ImageOne