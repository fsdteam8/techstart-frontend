import ResetPasswordForm from "./_components/reset-password-form";

const Page = ({ params }: { params: { token: string } }) => {
  return (
    <div className="py-[100px] min-h-[50vh] bg-gradient-to-br from-[#945FD4] to-[#340C58] flex items-center justify-center p-4">
      <div className="w-full max-w-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden p-8 lg:p-12">
        <div className="max-w-[400px] mx-auto space-y-5">
          <div>
            <h1 className="text-center text-2xl font-semibold">
              Reset Password
            </h1>
            <p className="text-center text-gray-400 text-[14px]">
              Please kindly set your new password
            </p>
          </div>
          <ResetPasswordForm token={params.token} />
        </div>
      </div>
    </div>
  );
};

export default Page;
