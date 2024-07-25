import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";

function InfoBlock({ data }) {
  const { headline, text, button, showImageRight, image } = data;

  return (
    <div className={`info ${showImageRight ? "info--reversed" : ""}`}>
      <img
        src={image || "/info-blocks/default-image.png"}
        alt={headline || "Info Block"}
        className="info__image"
      />
      <div className="info__text">
        <h2 className="info__headline">{headline}</h2>
        <ReactMarkdown className="copy">{text}</ReactMarkdown>

        {button}
      </div>
    </div>
  );
}

InfoBlock.propTypes = {
  data: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    button: PropTypes.node,
    showImageRight: PropTypes.bool,
    image: PropTypes.string,
  }).isRequired,
};

export default InfoBlock;
