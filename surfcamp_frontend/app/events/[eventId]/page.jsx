import SignupForm from "@/app/_components/Events/SignupForm";
import FeaturedItems from "@/app/_components/FeaturedItems/FeaturedItems";
import {
  fetchAllEvents,
  fetchDataFromStrapi,
  fetchIndividualEvent,
  formatParagraphs,
  processEventData,
} from "@/utils/strapi.utils";
import ReactMarkdown from "react-markdown";

async function page({ params }) {
  const { eventId } = params;
  const event = await fetchIndividualEvent(eventId);
  const processedEvent = processEventData(event);
  const otherEvents = await fetchAllEvents(eventId);

  const {
    name,
    description,
    startingDate,
    endDate,
    singlePrice,
    sharedPrice,
    createdAt,
    updatedAt,
    publishedAt,
    id,
  } = processedEvent;
  const pricing = { sharedPrice: sharedPrice, singlePrice: singlePrice };
  const formattedDescription = formatParagraphs(description);

  return (
    <main className="events-page">
      <SignupForm
        headline={name}
        infoText={
          <ReactMarkdown className="copy">{formattedDescription}</ReactMarkdown>
        }
        buttonLabel="Sign Up"
        pricing={pricing}
        eventId={eventId}
      />
      <FeaturedItems
        items={otherEvents}
        itemType="event"
        headline={"Explore other events!"}
      />
    </main>
  );
}

export default page;

export async function generateStaticParams() {
  try {
    // Fetch event data from Strapi
    const events = await fetchDataFromStrapi("events");

    // Map through the events to create an array of slugs
    const slugs = events.map((event) => ({
      eventId: String(event.id),
    }));

    return slugs;
  } catch (err) {
    console.error("Error fetching slugs for events:", err);
    return [];
  }
}
