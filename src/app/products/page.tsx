import ProductHeader from "./_components/product-header";
import Sidebar from "./_components/sidebar";

const Page = () => {
  return (
    <div className="container mt-[20px] md:mt-[40px]">
      <ProductHeader />

      <div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-[365px]">
            <div className="sticky top-[100px]">
              <Sidebar />
            </div>
          </div>

          <div className="flex-1  min-h-[200vh]">
            {/* Product List Component would go here */}
            <p>Product List Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
