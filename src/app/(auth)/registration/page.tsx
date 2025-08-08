import WelcomeSection from "../login/_components/welcome-section";
import RegistrationForm from "./_components/registration-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#945FD4] to-[#340C58] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl  rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px] ">
          <div className="bg-white p-8 lg:p-12">
            <h1 className="text-center font-bold text-primary text-[20px] md:text-[30px]">
              Registration
            </h1>
            <RegistrationForm />
          </div>
          <div className="h-full">
            <div className="w-full h-full">
              {/* <LoginForm /> */}
              <WelcomeSection
                title="Hello, Welcome!"
                description="Enter your personal details and start journey with us."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
