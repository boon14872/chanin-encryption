
import LoginForm from "./form";

export default function Home() {
  return (
    <main className="">
      <div className="relative sm:max-w-xl sm:mx-auto py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-300 to-violet-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-5xl font-semibold">
                ยินดีต้อนรับเข้าสู่ระบบการเข้ารหัสข้อมูล
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
