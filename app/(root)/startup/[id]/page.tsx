// /startup/postpage
import React from 'react'
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID } from '@/sanity/lib/querries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it';

const md = markdownit();

// export const experimental_ppr = true;

const page = async ({ params }: {params: Promise<{ id: string }>}) => {
    const id = (await params).id;

    const post = await client.fetch(STARTUP_BY_ID, { id });

    if(!post) return notFound();

    const parsedContent = md.render(post?.pitch || '')

  return (
    <>
        <section className='blue_container !min-h-[230px]'>
            <p className='tag'>{formatDate(post?._createdAt)}</p>
            <h1 className='heading'>{post.title}</h1>
            <p className='subheading !max-w-5xl'>{post.description}</p>
        </section>
        <section className='section_container'>
          <img 
            src={post.image ?? ''}
            alt={"thumbnail"}
            className='w-full h-80 object-cover rounded-xl'
          />

          <div className='spae-y-5 mt-10 max-w-4xl mx-auto'>
            <div className='flex-between gap-5'>
              <Link href={`/user/${post.author?._id}`}
              className='flex gap-2 item-center mb-3'>
                {post.author && (
                  <>
                    <Image 
                    src={post.author.image ?? ''} 
                    alt="avatar"
                    width={44}
                    height={44}
                    className='rounded-full drop-shadow-lg'
                  />
                
                <div>
                  <p className='text-20-medium'>{post.author.name ?? ''}</p>
                  <p className='text-16-medium text-black-300'>@{post.author.username ?? ''}</p>
                </div>
                </>
              )}
              </Link>

              <p className='category-tag'>{post.category}</p>
            </div>

            <h3 className='text-30-bold'>Pitch Details</h3>
            {parsedContent ? (
              <article 
                className='prose max-w-4xl font-work-sans break-all'
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className='no-result'>No details provided</p>
            )}
          </div>

          <hr className='divider'/>

          {/* TODO: EDITOR SELECTED STARTUPS */}
        </section>
    </>
  )
}

export default page