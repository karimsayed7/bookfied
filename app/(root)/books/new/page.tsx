import UploadForm from "@/components/UploadForm";

const Page = () => {
    return (
        <main className="new-book">
            <section className="flex flex-col gap-1 text-center mt-10">
                <h1 className="font-bold text-[23px]">Add a New Book</h1>
                <p className="text-base text-gray-600">Upload a PDF to generate your  interactive reading experience</p>
            </section>

            <UploadForm />
        </main>
    )
}

export default Page