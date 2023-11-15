import Loading from "@/common/Loading";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div>
        <ul className="flex gap-2">
          <li>
            <Link href="/sales">
              <p className="text-blue-600 hover:text-blue-800">Products</p>
            </Link>
          </li>
          <li>
            <Link href="/sales">
              <p className="text-blue-600 hover:text-blue-800">Reports</p>
            </Link>
          </li>
          <li>
            <Link href="/sales">
              <p className="text-blue-600 hover:text-blue-800">Customers</p>
            </Link>
          </li>
        </ul>
      </div>
      <Loading text={"In maintenance"}/>
    </>
  );
}
