import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface Props {
  decodedSlug: string;
}

const TopProductDetailsBar = ({ decodedSlug }: Props) => {
  return (
    <div>
      <div className="container flex justify-between items-center h-[80px] ">
        <h1 className="text-primary md:text-[30px] text-[18px] font-semibold">
          Product Details
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>{decodedSlug}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default TopProductDetailsBar;
