import { extractImageData } from "@/utils/strapi.utils";

function ArticleLandscapeImage({ imageData }) {
  return (
    <div className="article-image">
      <img src={extractImageData(imageData.image)} alt="" />
      {imageData.imageCaption && (
        <p className="copy article-image__caption">{imageData.imageCaption}</p>
      )}
    </div>
  );
}

export default ArticleLandscapeImage;
