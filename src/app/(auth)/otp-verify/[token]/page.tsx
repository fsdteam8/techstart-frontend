const Page = ({ params }: { params: { token: string } }) => {
  return <div>Page: {params.token}</div>;
};

export default Page;
