import { useRouteError } from "react-router-dom";
function ErrorPage() {
    const error=useRouteError()
    console.error(error)
    return (
        <main>
            <div className="flex flex-col items-center justify-center h-screen gap-5">
            <img src="/icons/error.svg" className="w-40 lg:w-80  aspect-square object-contain object-center'" />
            <h1 className=" text-red-500 font-bold text-lg lg:text-2xl">Ouch! 404 not found</h1>
            </div>
        </main>
    );
}

export default ErrorPage;