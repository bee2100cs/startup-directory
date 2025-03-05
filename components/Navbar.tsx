import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Navbar = async () => {
  const session = await auth();

  return (
    // Navigation bar with login and log out
    <div className='px-5 py-3 bg-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href="/">
                <Image src="/logo.png" alt='logo' width={144} height={30} />
            </Link>
            <div className='flex item-center gap-5 text-black'>
              {session && session?.user ? (
                <>
                <Link href="/startup/create" className=''>
                  <span className='max-sm:hidden'>Create</span>
                  <BadgePlus className='size-6 sm:hidden'/>
                </Link>
                <form action={ async () => {
                  "use server";

                  await signOut();
                }}>
                  <button type="submit" >
                  <span className='max-sm:hidden'>Logout</span>
                    <LogOut className='size-6 sm:hidden text-red-500'/>
                  </button>
                </form>
                <Link href={`/user/${session?.user?.id}`}>
                  <Avatar className='size-10'>
                    <AvatarImage src={session?.user?.image || ''} alt={session?.user?.image || ''} />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                </Link>
                </>
              ): (
                <form action={ async () => {
                  "use server";

                  await signIn('github');
                }}>
                  <button type="submit">
                    Login
                  </button>
                </form>
              )}
            </div>
        </nav>
    </div>
  )
}

export default Navbar