import React from 'react'
import HeroSection from "@/components/HeroSection";
import BookCard from '@/components/BookCard';
import { sampleBooks } from '@/lib/constants';
// import {getAllBooks} from "@/lib/actions/book.actions";
// import Search from "@/components/Search";

const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
    // const { query } = await searchParams;

    // const bookResults = await getAllBooks(query)
    // const books = bookResults.success ? bookResults.data ?? [] : []

    return (
        <main className="wrapper container bg-(--bg-primary)">
            <HeroSection />

            <div className="px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
                <h2 className="text-[22px] font-serif font-bold text-[#212a3b]">Recent Books</h2>
                {/* <Search /> */}
            </div>

            <div className="library-books-grid px-5">
                {sampleBooks.map((book) => (
                    <BookCard key={book._id} title={book.title} author={book.author} coverURL={book.coverURL} slug={book.slug} />
                ))}
            </div>
        </main>
    )
}

export default Page