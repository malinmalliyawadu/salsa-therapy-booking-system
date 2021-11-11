import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Header = () => {
  const [user, loading, error] = useAuthState(getAuth());

  return (
    <header className="shadow-sm sticky py-6 px-8 flex justify-between items-center top-0 left-0 right-0 bg-white border-b border-gray-200">
      <h1
        className="text-5xl font-bold text-purple-900"
        style={{
          textShadow:
            "rgba(0, 0, 0, 0.2) 0px 2px 2px, rgba(0, 0, 0, 0.1) 0px 3px 4px",
        }}
      >
        Salsa Therapy 💃
      </h1>

      <nav className="flex gap-6 items-center">
        <div>
          <a
            href="/schedule"
            className="border-b-4 pb-1 text-purple-500 border-purple-500"
          >
            Upcoming Classes
          </a>
        </div>
        <div>
          <a href="/pricing">Pricing</a>
        </div>
        <div>
          {user?.photoURL ? (
            <img src={user?.photoURL} className="rounded-full" />
          ) : (
            <a href="/auth">Login</a>
          )}
        </div>
      </nav>
    </header>
  );
};
