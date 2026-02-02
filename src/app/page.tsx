import Link from "next/link";
import CsrPage from "./views/csr/page";



export default function Home() {

  return (
    <div className="flex flex-col">
    <Link href='/views/csr/'>Client side rendering</Link>
    <Link href='/views/ssr/'>Server side rendering</Link>
    </div>
  );
}
