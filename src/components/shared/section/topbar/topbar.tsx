export default function TopbarCarousel() {
  const promotionalContent = [
    "🔥 Grand Purp Rewards • Earn 1 point for every $1 you spend • Get $20 off when you reach 200 points • Free to join - points add up automatically",
    "🔥 Grand Purp Rewards • Earn 1 point for every $1 you spend • Get $20 off when you reach 200 points • Free to join - points add up automatically",
    "🔥 Grand Purp Rewards • Earn 1 point for every $1 you spend • Get $20 off when you reach 200 points • Free to join - points add up automatically",
  ];

  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-0 overflow-hidden relative">
      <div className="flex items-center justify-between px-4 py-2">
        {/* <div className="bg-purple-600 h-full w-[40px] md:w-[70px]"></div> */}

        {/* Scrolling Content Container */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex animate-scroll-mobile sm:animate-scroll-desktop whitespace-nowrap">
            {promotionalContent.map((content, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-xs sm:text-sm font-medium px-4 sm:px-8"
              >
                {content}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-r from-purple-600 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-l from-purple-700 to-transparent pointer-events-none z-10" />
    </div>
  );
}
