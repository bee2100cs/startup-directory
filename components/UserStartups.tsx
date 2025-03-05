import { client } from '@/sanity/lib/client'
import { STARTUP_BY_AUTHOR } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { StartupTypeCard } from './StartupCard';

const UserStartups = async ({ id }: {id: string }) => {

    const startups = await client.fetch(STARTUP_BY_AUTHOR, {
        id});
  return (
    <>
        {startups.length > 0 ? (
            startups.map((startup: StartupTypeCard) => (
            <StartupCard key={startup._id} post={startup} />
            ))
        ) : (
                <p className='no-result'> No posts yet</p>
        )}
    </>
  );
};

export default UserStartups