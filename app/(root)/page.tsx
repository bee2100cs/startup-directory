import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUP_QUERY } from "@/sanity/lib/querries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";


export default async function Home({ 
  searchParams,
 }: {
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params});

  return (
    <>
      {/* Hero section */}
      <section className="blue_container">
        <h1 className="heading">Pitch Your StartUp, <br /> Connect With Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query= {query} />

      </section>
      {/* Startups section */}
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : 'All Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
        
        {/* Add new data immediately on the homepage without having to reload */}
      <SanityLive />
    </>
  );
}
