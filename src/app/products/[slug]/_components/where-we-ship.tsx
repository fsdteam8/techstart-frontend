import Image from "next/image";

const WhereWeShip = () => {
  return (
    <div className=" container flex flex-col-reverse  md:flex-row items-center justify-start gap-x-[50px]">
      <div className="flex-1 space-y-[32px]">
        <h1 className="font-semibold text-[25px] md:text-[40px] max-w-[700px]">
          Where we ship this product
        </h1>
        <p className="text-[#111827] text-[15px]">
          Our products comply with federal regulations under the 2018 Farm Bill.
          We deliver to the states marked in green. If your state isn’t
          included, we invite you to browse our other offerings.
        </p>
        <p className="text-[#111827] text-[15px] bg-[#F0EDF9] p-3">
          <span className="font-semibold">We ship to:</span> <br />
          Alabama, Arizona, Arkansas, District of Columbia, Delaware, Florida,
          Georgia, Illinois, Indiana, Kansas, Kentucky, Louisiana, Maine,
          Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Nebraska,
          Nevada, New Hampshire, New Jersey, New Mexico, New York, North
          Carolina, Ohio, Oklahoma, Oregon, Pennsylvania, South Carolina, South
          Dakota, Tennessee, Texas, Virginia, Washington, West Virginia,
          Wisconsin, Wyoming
        </p>
      </div>
      <div className="flex-1">
        <Image src="/decoration/usmap.svg" width={704} height={608} alt="us" />
      </div>
    </div>
  );
};

export default WhereWeShip;
