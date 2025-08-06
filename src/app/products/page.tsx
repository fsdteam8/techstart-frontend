import ProductContainer from "./_components/product-container";
import ProductHeader from "./_components/product-header";
import Sidebar from "./_components/sidebar";

const Page = () => {
  return (
    <div className="container mt-[20px] md:mt-[40px]">
      <ProductHeader />

      <div>
        <div className="flex flex-col md:flex-row gap-4 pb-[50px]">
          <div className=" md:w-[365px]">
            <div className="sticky top-[100px]">
              <Sidebar />
            </div>
          </div>

          <div className="flex-1 ">
            <ProductContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
