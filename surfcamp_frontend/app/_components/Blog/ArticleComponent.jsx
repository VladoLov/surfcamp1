import ArticleHeadline from "./ArticleHeadline";
import ArticleLandscapeImage from "./ArticleLandscapeImage";
import ArticleParagraph from "./ArticleParagraph";
import ArticleParagraphWithImage from "./ArticleParagraphWithImage";

function ArticleComponent({ component }) {
  const componentType = component.__component.split("blog-article.")[1];

  switch (componentType) {
    case "headline":
      return <ArticleHeadline headline={component} />;
    case "paragraph-with-image":
      return <ArticleParagraphWithImage component={component} />;
    case "paragraph":
      return <ArticleParagraph component={component} />;
    case "landscape-image":
      return <ArticleLandscapeImage imageData={component} />;

    default:
      return <h1>Component not found</h1>;
  }
}

export default ArticleComponent;
