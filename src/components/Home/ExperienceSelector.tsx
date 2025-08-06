import Image from "next/image";

const experiences = [
  {
    title: "Better Sleep",
    image: "/ex-card-1.jpg",
  },
  {
    title: "Relief from Aches",
    image: "/ex-card-2.jpg",
  },
  {
    title: "Chill Out",
    image: "/ex-card-3.jpg",
  },
  {
    title: "Get Energized & Focused",
    image: "/ex-card-4.jpg",
  },
  {
    title: "Feel Happy",
    image: "/ex-card-5.jpg",
  },
  {
    title: "Better Sex",
    image: "/ex-card-6.jpg",
  },
];

export default function ExperienceSelector() {
  return (
    <div className=" container mx-auto -mt-32 z-[100]">
      <div className="bg-white rounded-lg p-6 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-wide font-cinzel">
          CHOOSE YOUR EXPERIENCE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/2] shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl md:text-2xl font-semibold">
                  {experience.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
