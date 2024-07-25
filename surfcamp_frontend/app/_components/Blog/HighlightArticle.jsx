import Link from "next/link";

function HighlightArticle({ data }) {
  const { headline, excerpt, slug, featuredImage } = data;
  return (
    <article className="highlight-article">
      <div className="highlight-article__info">
        <h3>{headline}</h3>
        <div className="copy">{excerpt}</div>
        <Link className="btn btn--turquoise btn--medium" href={`/blog/${slug}`}>
          read more
        </Link>
      </div>
      <img
        className="highlight-article__image"
        src={featuredImage}
        alt="hero"
      />
    </article>
  );
}

export default HighlightArticle;
