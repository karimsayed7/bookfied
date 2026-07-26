import React from 'react'
import { auth } from '@clerk/nextjs/server';
import HeroSection from "@/components/HeroSection";
import BookCard from '@/components/BookCard';
import { sampleBooks } from '@/lib/constants';
import { getAllBooks } from "@/lib/actions/book.actions";
// import Search from "@/components/Search";

export const dynamic = 'force-dynamic';
const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
    const { query } = await searchParams;
    const { userId } = await auth();

    const bookResults = userId ? await getAllBooks(userId, query) : null;
    const books = bookResults?.success ? bookResults.data ?? [] : []

    return (
        <main className="wrapper container bg-(--bg-primary)">
            <HeroSection />

            <div className="px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
                <h2 className="text-[22px] font-serif font-bold text-[#212a3b]">Recent Books</h2>
                {/* <Search /> */}
            </div>

            {!userId ? (
                <div className="px-5 py-16 flex flex-col items-center justify-center text-center">
                    <p className="text-[#212a3b]/60 font-serif text-lg">
                        Sign in to see your books.
                    </p>
                </div>
            ) : books.length === 0 ? (
                <div className="px-5 py-16 flex flex-col items-center justify-center text-center">
                    <p className="text-[#212a3b]/60 font-serif text-lg">
                        {query ? `No books found for "${query}".` : 'No books uploaded yet.'}
                    </p>
                </div>
            ) : (
                <div className="library-books-grid px-5">
                    {books.map((book) => (
                        <BookCard key={book._id} title={book.title} author={book.author} coverURL={book.coverURL} slug={book.slug} />
                    ))}
                </div>
            )}
        </main>
    )
}

export default Page