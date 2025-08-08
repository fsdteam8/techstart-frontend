import LoginForm from "./_components/login-form";
import WelcomeSection from "./_components/welcome-section";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#945FD4] to-[#340C58] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          <WelcomeSection
            title="Welcome Back!"
            description="You can sign in to access with your existing account."
          />
          <div className="flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
