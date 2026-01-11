const Community = () => {
  const WHATSAPP_LINK = "https://chat.whatsapp.com/FlK8sMxzeg2E1PUYd5rbt1";
  const INSTAGRAM_URL = "https://www.instagram.com/virtustock.in";
  const YOUTUBE_LINK = "https://youtube.com/@virtustock";
  return (
    <>
      <div className="rounded-xl border bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex flex-col xl:flex-row items-center xl:items-start gap-4 justify-betw">
          {/* Left: Image */}
          <div className="flex-shrink-0">
            <img
              src="/images/community/community.png"
              alt="Community"
              className=" w-75 h-50 lg:w-100 lg:h-75 object-contain"
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col items-center xl:items-start text-center xl:text-left space-y-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
              Have questions or want to stay updated? Join our community and
              connect with us on WhatsApp and Instagram.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400 text-black font-bold select-none">
              <span>Join Our Community</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>

            <div className="flex gap-4 p-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 bg-white shadow-theme-xs select-none dark:border-gray-700 dark:bg-gray-800"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="whatsappGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#25D366" />
                      <stop offset="100%" stopColor="#128C7E" />
                    </linearGradient>
                  </defs>

                  <path
                    fill="url(#whatsappGradient)"
                    d="M16.04 2.004C8.835 2.004 3 7.838 3 15.042c0 2.655.74 5.141 2.03 7.262L3 30l7.9-2.06a13.02 13.02 0 0 0 5.14 1.03c7.205 0 13.04-5.835 13.04-13.04 0-7.204-5.835-13.04-13.04-13.04Zm0 23.78a10.7 10.7 0 0 1-4.98-1.24l-.36-.19-4.69 1.22 1.25-4.56-.23-.37a10.69 10.69 0 1 1 9.01 5.14Zm5.8-7.89c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.35-.26-.63-.52-.55-.71-.56-.19-.01-.4-.01-.61-.01-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.27 3.46 5.49 4.86.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"
                  />
                </svg>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 bg-white shadow-theme-xs select-none dark:border-gray-700 dark:bg-gray-800"
              >
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="instagramGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#feda75" />
                      <stop offset="25%" stopColor="#fa7e1e" />
                      <stop offset="50%" stopColor="#d62976" />
                      <stop offset="75%" stopColor="#962fbf" />
                      <stop offset="100%" stopColor="#4f5bd5" />
                    </linearGradient>
                  </defs>

                  <path
                    fill="url(#instagramGradient)"
                    d="M10 1.8c2.3 0 2.6 0 3.5.05.85.04 1.31.18 1.62.3.42.16.72.36 1.04.68.32.32.52.62.68 1.04.12.31.26.77.3 1.62.05.9.05 1.2.05 3.5s0 2.6-.05 3.5c-.04.85-.18 1.31-.3 1.62-.16.42-.36.72-.68 1.04-.32.32-.62.52-1.04.68-.31.12-.77.26-1.62.3-.9.05-1.2.05-3.5.05s-2.6 0-3.5-.05c-.85-.04-1.31-.18-1.62-.3a2.73 2.73 0 0 1-1.04-.68 2.73 2.73 0 0 1-.68-1.04c-.12-.31-.26-.77-.3-1.62C1.8 12.6 1.8 12.3 1.8 10s0-2.6.05-3.5c.04-.85.18-1.31.3-1.62.16-.42.36-.72.68-1.04.32-.32.62-.52 1.04-.68.31-.12.77-.26 1.62-.3C7.4 1.8 7.7 1.8 10 1.8ZM10 6.5A3.5 3.5 0 1 0 10 13.5A3.5 3.5 0 0 0 10 6.5Zm0 5.8A2.3 2.3 0 1 1 10 7.7a2.3 2.3 0 0 1 0 4.6Zm3.65-6.2a.82.82 0 1 1 0-1.65.82.82 0 0 1 0 1.65Z"
                  />
                </svg>
              </a>

              <a
                href={YOUTUBE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 bg-white shadow-theme-xs select-none dark:border-gray-700 dark:bg-gray-800"
              >
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="youtubeGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ff4d4d" />
                      <stop offset="100%" stopColor="#cc0000" />
                    </linearGradient>
                  </defs>

                  <path
                    fill="url(#youtubeGradient)"
                    d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.5v-7l6.1 3.5-6.1 3.5Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
