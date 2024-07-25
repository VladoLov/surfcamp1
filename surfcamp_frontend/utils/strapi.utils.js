import InfoBlock from "@/app/_components/InfoBlock";
import axios from "axios";
import Link from "next/link";
import qs from "qs";

const BASE_URL = process.env.BASE_URL || "http://localhost:1337/api";
const UPLOADS_URL = process.env.UPLOADS_URL || "http://localhost:1337/uploads";
const BASE_URLI = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function fetchDataFromStrapi(route) {
  const url = `${BASE_URL}/${route}`;

  try {
    const { data } = await axios.get(url);
    return data.data; // Return the relevant part of the data
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw new Error(`Could not fetch data from ${url}`);
  }
}

export const createInfoBlock = (block) => {
  const { headline, text, image, showImageRight, button } = block.attributes;
  const BASE_URL = process.env.BASE_URLI || "http://localhost:1337";
  const imageUrl = image ? `${BASE_URL}${image.data.attributes.url}` : null;
  const buttonElement = button ? (
    <Link
      href={`/${button.slug}`}
      key={button.id}
      className={`btn btn--medium btn--${button.color}`}
    >
      {button.text}
    </Link>
  ) : null;

  const formattedText = text
    .map((paragraph) =>
      paragraph.children
        .map((child) => {
          let textSegment = child.text;
          if (child.bold) {
            textSegment = `**${textSegment}**`;
          }
          // Add other formatting checks here (e.g., italic, underline)
          return textSegment;
        })
        .join("")
    )
    .join("\n\n");

  return (
    <InfoBlock
      key={block.id}
      data={{
        headline,
        text: formattedText,
        image: imageUrl,
        showImageRight,
        button: buttonElement,
      }}
    />
  );
};

export async function fetchBlogArticles() {
  const blogData = await fetchDataFromStrapi("blog-articles?populate=deep");

  const processedBlogArticles = blogData.map(processBlogArticles);
  processedBlogArticles.sort(
    (a, z) => new Date(z.publishedAt) - new Date(a.publishedAt)
  );
  return processedBlogArticles;
}

function processBlogArticles(article) {
  return {
    ...article.attributes,
    id: article.id,
    slug: article.attributes.slug, // Ensure slug is included in the processed data
    featuredImage:
      BASE_URLI + article.attributes?.featuredImage?.data?.attributes?.url,
    articleComponent: article.attributes.articleComponent || [], // Ensure articleComponent is included
  };
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleDateString("en-US", options);
}

export function extractImageData(imageData) {
  return BASE_URLI + imageData.data?.attributes?.url;
}

export async function fetchIndividualEvent(eventId) {
  const response = await axios.get(`${BASE_URLI}/api/events/${eventId}`);
  return response.data.data;
}

export function processEventData(event) {
  return {
    ...event.attributes,
    image: BASE_URLI + event.attributes?.image?.data?.attributes?.url,
    id: event.id,
  };
}
export const formatParagraphs = (paragraphs) => {
  return paragraphs
    .map((paragraph) =>
      paragraph.children
        .map((child) => {
          let textSegment = child.text;
          if (child.bold) {
            textSegment = `**${textSegment}**`;
          }
          // Add other formatting checks here (e.g., italic, underline)
          return textSegment;
        })
        .join("")
    )
    .join("\n\n");
};

export function generateSignupPayload(formData, eventId) {
  if (!eventId) {
    return {
      data: { ...formData, isGeneralIntrest: true },
    };
  } else {
    return {
      data: {
        ...formData,
        event: {
          connect: [eventId],
        },
      },
    };
  }
}
function createEventQuery(eventIdToExclude) {
  const queryObject = {
    pagination: {
      start: 0,
      limit: 12,
    },
    sort: ["startingDate:asc"],
    filters: {
      startingDate: {
        $gt: new Date(),
      },
    },
    populate: {
      image: {
        populate: "*",
      },
    },
  };
  if (eventIdToExclude) {
    queryObject.filters.id = {
      $ne: eventIdToExclude,
    };
  }
  return qs.stringify(queryObject, { encodeValuesOnly: true });
}

export async function fetchAllEvents(eventIdToExclude = null) {
  const query = createEventQuery(eventIdToExclude);

  const response = await axios.get(`${BASE_URLI}/api/events?${query}`);
  return response.data.data.map((event) => processEventData(event));
}
