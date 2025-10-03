export default function SidebarWidget() {
  return (
    <div
      className="
    mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]"
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Built by MS_2.O & Team 🚀
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        Empowering investors with real-time IPO insights and analytics.
      </p>
      <div className="flex gap-4 justify-center">
        {/* GitHub */}
        <a
          href="https://github.com/Shahid-MS"
          target="_blank"
          rel="nofollow"
          className="flex items-center gap-2 px-4 py-2 font-medium text-white rounded-lg bg-gray-800 text-theme-sm hover:bg-gray-900"
        >
          {/* GitHub Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.44c.6.11.82-.26.82-.58v-2.1c-3.34.72-4.05-1.6-4.05-1.6a3.18 3.18 0 00-1.34-1.75c-1.1-.74.08-.73.08-.73a2.5 2.5 0 011.83 1.23 2.56 2.56 0 003.5 1 2.58 2.58 0 01.77-1.61C7.11 16.29 4.33 15.3 4.33 10.9a4.6 4.6 0 011.22-3.19 4.3 4.3 0 01.12-3.15s1.03-.33 3.38 1.23a11.45 11.45 0 016.16 0c2.35-1.56 3.38-1.23 3.38-1.23a4.3 4.3 0 01.12 3.15 4.6 4.6 0 011.22 3.19c0 4.41-2.78 5.38-5.43 5.66a2.87 2.87 0 01.82 2.24v3.32c0 .32.22.69.82.58A12 12 0 0024 12C24 5.37 18.63 0 12 0z"
            />
          </svg>
          GitHub
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/ms20/"
          target="_blank"
          rel="nofollow"
          className="flex items-center gap-2 px-4 py-2 font-medium text-white rounded-lg bg-[#0A66C2] text-theme-sm hover:bg-[#004182]"
        >
          {/* LinkedIn Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-white"
          >
            <path d="M4.98 3.5a2.5 2.5 0 11-.02 5.0 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05A4.2 4.2 0 0117.6 9C21 9 21 12 21 15.6V21h-4v-4.6c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4V21h-4z" />
          </svg>
          LinkedIn
        </a>
      </div>
    </div>
  );
}
