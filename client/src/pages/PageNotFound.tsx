import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex-col-center-center w-screen h-screen gap-9">
      <h1 className="font-bold text-4xl">404</h1>
      <h2 className="font-regular text-2xl">Page not found</h2>
      <Link to="/" className="text-blue-500 underline">
        Home
      </Link>
    </div>
  );
}
