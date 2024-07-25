import ArticleComponent from "@/app/_components/Blog/ArticleComponent";
import ArticleIntro from "@/app/_components/Blog/ArticleIntro";
import ArticleOverview from "@/app/_components/Blog/ArticleOverview";
import FeaturedItems from "@/app/_components/FeaturedItems/FeaturedItems";
import { fetchBlogArticles, fetchDataFromStrapi } from "@/utils/strapi.utils";

export async function generateStaticParams() {
  const articles = await fetchDataFromStrapi("blog-articles");

  // Ensure you log the fetched articles
  //   console.log("Fetched Articles:", articles);

  // Map articles to the required format
  const params = articles.map((article) => ({
    params: { article: article.attributes.slug.trim() },
  }));

  // Log mapped params to verify
  //   console.log("Mapped Params:", params);

  return params;
}

export default async function Page({ params }) {
  const { article: slug } = params;
  const articles = await fetchBlogArticles();
  const article = articles.find((a) => a.slug === slug);

  const moreArticles = articles.filter((a) => a.slug !== slug);

  if (!article) {
    return (
      <main>
        <h1>Article Not Found</h1>
      </main>
    );
  }

  return (
    <main>
      <ArticleIntro article={article} />
      <section className="article-section">
        <ArticleOverview article={article} />
        {article.articleComponent.map((component) => (
          <ArticleComponent key={component.id} component={component} />
        ))}
        <FeaturedItems
          items={moreArticles}
          headline={"Explore our other articles"}
        />
      </section>
    </main>
  );
}
