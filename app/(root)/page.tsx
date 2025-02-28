import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: 50,
      author: { _id: 1, name: "Bee"},
      _id: 2,
      description: "This is a trading management App",
      image:
      "https://images.unsplash.com/photo-1740654227692-a00a3dd36e4d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Apps",
      title: "Anansi Ledger"
    },
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Yobra"},
      _id: 1,
      description: "This is Climate change Analysis and info App",
      image:
      "https://plus.unsplash.com/premium_photo-1740708549031-fd00d8821c5b?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Apps",
      title: "Kushoto Ledger"
    },
];

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
            posts.map((post: StartUpCardType, index: number) => (
              <StartupCard key={post?._id} post={post}/>
            ))
          ) : (
            <p className="no-results">No Startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
