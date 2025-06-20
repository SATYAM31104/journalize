import React from 'react';
import Link from "next/link"; 
import Image from 'next/image';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';           
import { Button } from './ui/button';
import { FolderOpen, PenBox } from 'lucide-react';
import UserMenu from './user-menu';
import { checkUser } from '@/lib/checkUser';

const Header = async () => {
  await checkUser();
  return (
    <header className='container mx-auto relative'>
      <nav className='py-6 px-4 flex items-center'>
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={50}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Buttons in top-right corner */}
        <div className='fixed top-4 right-4 flex items-center gap-4 z-50'>
          <SignedIn>
            <Link href='/dashboard#collections'>
              <Button
                variant="journal"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium hover:bg-primary/90 transition"
              >
                <FolderOpen size={18} />
                <span className="hidden md:inline">Collections</span>
              </Button>
            </Link>
          </SignedIn>

          <Link href='/journal/write'>
            <Button
              variant="journal"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium hover:bg-primary/90 transition"
            >
              <PenBox size={18} />
              <span className="hidden md:inline">Write New</span>
            </Button>
          </Link>

          <SignedOut>
            <SignInButton forceRedirectUrl='/dashboard'>
              <Button
                variant="outline"
                className="rounded-xl px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition"
              >
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;