import Link from "next/link";
import CsrPage from "./views/csr/page";



export default function Home() {

  return (
    <div className="flex flex-col">
    <Link
      href='/views/csr/'
      className="m-1 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
    >Client side rendering</Link>
    <Link
      href='/views/ssr/'
      className="m-1 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
    >Server side rendering</Link>
    </div>
  );
}
