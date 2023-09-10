import axios from "axios";
import { useEffect, useState } from "react";
import "./ImageContainer.css";
import close from "./Icons/close.png";
import previous from "./Icons/left-arrow.png";
import next from "./Icons/next.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
const ImageContainer = () => {
  const [images, setImages] = useState([]);
  const [showImage, setShowImage] = useState(null);
  const [imageChange, setImageChange] = useState(0);

  useEffect(() => {
    async function getImages() {
      const res = await axios.get("https://picsum.photos/v2/list?limit=100");
      setImages(res.data);
    }
    getImages();
  }, []);

  const handleImageChange = (imageUrl, index) => {
    setShowImage(imageUrl);
    setImageChange(index);
  };

  const handlePrevImage = () => {
    if (imageChange === 0) setImageChange(images.length - 1);
    else setImageChange(imageChange - 1);

    setShowImage(images[imageChange].download_url);
  };

  const handleNextImage = () => {
    if (imageChange === images.length - 1) setImageChange(0);
    else setImageChange(imageChange + 1);

    setShowImage(images[imageChange].download_url);
  };

  return (
    <div className="image-container">
      <div>
      <h1>Image Gallery</h1>


      </div>

      <div className="images">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="media"
              onClick={() => handleImageChange(image.download_url, index)}
            >
              <LazyLoadImage 
                effect="blur"
                placeholderSrc={image.download_url}
                key={image.author}
                src={image.download_url}
              />
            </div>
          );
        })}
      </div>

      <div
        className="popup-image"
        style={{ display: showImage ? "block" : "none" }}
      >
        <span onClick={() => setShowImage(null)} className="close">
          <img src={close} alt="" />
        </span>

        {showImage && <img src={showImage} alt="" />}

        <span className="prev" onClick={() => handlePrevImage()}>
          <img src={previous} alt="" />
        </span>
        <span className="next" onClick={() => handleNextImage()}>
          <img src={next} alt="" />
        </span>
      </div>
    </div>
  );
};

export default ImageContainer;
