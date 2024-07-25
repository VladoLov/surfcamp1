import { extractImageData } from "@/utils/strapi.utils";
import ReactMarkdown from "react-markdown";

function ArticleParagraphWithImage({ component }) {
  const { image, imageCaption, isLandscape, imageShowsRight } = component;

  const formatText = (children) => {
    return children
      .map((child) => {
        let textSegment = child.text;
        if (child.bold) {
          textSegment = `**${textSegment}**`;
        }
        // Add other formatting checks here (e.g., italic, underline)
        return textSegment;
      })
      .join("");
  };

  const formattedText = component.paragraph
    .map((paragraph) => {
      if (paragraph.type === "paragraph") {
        return formatText(paragraph.children);
      } else if (
        paragraph.type === "list" &&
        paragraph.format === "unordered"
      ) {
        return paragraph.children
          .map((listItem) => `- ${formatText(listItem.children)}`)
          .join("\n");
      }
      return "";
    })
    .join("\n\n"); // Join all the paragraphs and lists into a single string

  return (
    <div
      className={`article-text-image ${
        isLandscape ? "" : "article-text-image--portrait"
      } ${imageShowsRight ? "" : "article-text-image--reversed"}`}
    >
      <ReactMarkdown className="copy article-text-image__text article-paragraph">
        {formattedText}
      </ReactMarkdown>
      <div className="article-tex-image__container">
        <div className="article-tex-image__image">
          <img src={extractImageData(image)} alt="" />
        </div>
        {imageCaption && (
          <p className="article-text-image__caption copy-small">
            {imageCaption}
          </p>
        )}
      </div>
    </div>
  );
}

export default ArticleParagraphWithImage;
