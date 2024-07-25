import ReactMarkdown from "react-markdown";

function ArticleParagraph({ component }) {
  /*  const { paragraph } = component; */
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
    <ReactMarkdown className="copy article-paragraph">
      {formattedText}
    </ReactMarkdown>
  );
}

export default ArticleParagraph;
