import BlogPreview from "./_components/BlogPreview/BlogPreview";
import HeroSection from "./_components/HeroSection";

import { fetchDataFromStrapi, createInfoBlock } from "@/utils/strapi.utils";

export default async function Home() {
  const data = await fetchDataFromStrapi("infoblocks-landing?populate=deep");
  const { info_blocks } = data.attributes;

  const heroHeadline = (
    <>
      <h1>barrel.</h1>
      <h1>your.</h1>
      <h1>happiness.</h1>
    </>
  );

  const infoBlockComponents = info_blocks.data.map(createInfoBlock);
  return (
    <main>
      <HeroSection headline={heroHeadline} />
      {infoBlockComponents}
      <BlogPreview />
    </main>
  );
}

export const revalidate = 300;
