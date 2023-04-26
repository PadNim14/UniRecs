import { Parallax } from "react-parallax";
import grad from '../assets/purdue.jpg'
const ImageOne = () => (
    <div className="parallax-container">
        <Parallax speed={10} className="image" bgImage={grad} strength={800}>
            <div className="content">
                <span className="img-txt">
                    <h1>UniRecs</h1>
                </span>
            </div>
        </Parallax>
    </div>

);

export default ImageOne