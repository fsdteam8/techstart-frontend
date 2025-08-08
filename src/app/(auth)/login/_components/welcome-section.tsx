import Image from "next/image";

interface Props {
  title: string;
  description: string;
}

export default function WelcomeSection({ title, description }: Props) {
  return (
    <div className="relative bg-gradient-to-br from-[#7d4df3] to-[#6b46c1] flex items-center justify-center p-8 lg:p-12 text-white overflow-hidden h-full">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-md">
        <div className="mb-8">
          <div className="relative w-40 h-40  mx-auto mb-6">
            <div className="absolute inset-0 bg-white/20 rounded-full backdrop-blur-sm" />
            <div className="absolute inset-4 flex items-center justify-center">
              <Image
                src="/loginimage.png"
                alt="Decorative leaf"
                width={200}
                height={200}
                className="opacity-60"
              />
            </div>
          </div>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          {title}
        </h1>

        <p className="text-lg text-white/90 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
