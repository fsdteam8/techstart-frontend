import Image from "next/image";
import { ReactNode } from "react";

interface TreeWrapperProps {
  children: ReactNode;
}

const TreeWrapper = ({ children }: TreeWrapperProps) => {
  return (
    <div className="relative">
      {/* Right Tree */}
      <Image
        src="/decoration/tree-right.svg"
        alt="Right Tree"
        className="object-cover absolute top-0 right-0 z-[-1] hidden md:block"
        width={250}
        height={400}
        priority
      />

      {/* Left Tree */}
      <Image
        src="/decoration/tree-left.svg"
        alt="Left Tree"
        className="object-cover absolute top-0 transform -translate-y-1/2 left-0 z-[-1] hidden md:block"
        width={250}
        height={400}
        priority
      />

      {/* Section Content */}
      {children}
    </div>
  );
};

export default TreeWrapper;
