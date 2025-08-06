import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const Logo = () => {
  return (
    <h1 className={`${poppins.className} text-2xl font-medium text-gray-900`}>
      <span className="border-b-4 border-primary">Grand</span>{" "}
      <span className="text-[#6B46C1]">Purp</span>
    </h1>
  );
};

export default Logo;
