import { Parallax } from "react-parallax";
import grad from '../assets/purdue.jpg'
const ImageOne = () => (
    <Parallax speed={-10} className="image" bgImage={grad} strength={800}>
        <div className="content">
            <span className="img-txt">
                Welcome to UniRecs!
            </span>

        </div>
    </Parallax>
);

export default ImageOne