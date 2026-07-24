import Link from "next/link";
import { BookCardProps } from "@/types";
import Image from "next/image";

const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
    return (
        <Link href={`/books/${slug}`}>
            <article className="">
                <figure className="hover:-translate-y-1.5 transition">
                    <div className=" flex items-center justify-center w-40 h-50 relative overflow-hidden">
                        <Image src={coverURL} alt={title} fill className="object-cover p-6 bg-white rounded-lg " />
                    </div>

                    <figcaption className="book-card-meta">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <p className="text-base text-gray-500">{author}</p>
                    </figcaption>
                </figure>
            </article>
        </Link>
    )
}
export default BookCard