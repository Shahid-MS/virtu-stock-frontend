import GridShape from "../../components/common/GridShape";
export default function IntenalServerError() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          <h2 className="mb-5 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-xl">
            INTERNAL SERVER ERROR
          </h2>

          <img src="/images/error/500.svg" alt="404" className="dark:hidden" />
          <img
            src="/images/error/500-dark.svg"
            alt="404"
            className="hidden dark:block"
          />

          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            Yikes! Our server ran into a problem. We're working on it!
          </p>
        </div>
        {/* <!-- Footer --> */}
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} - VirtuStock
        </p>
      </div>
    </>
  );
}
