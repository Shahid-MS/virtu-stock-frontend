import GridShape from "../../components/common/GridShape";

export default function Loading() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-2 overflow-hidden z-1">
        <GridShape />
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl inline-flex items-end gap-2">
            Loading
            <span className="flex gap-1 items-end">
              <span className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-3 h-3 bg-gray-300 rounded-full animate-bounce"></span>
            </span>
          </h1>
        </div>
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} - VirtuStock
        </p>
      </div>
    </>
  );
}
