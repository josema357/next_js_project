import Link from "next/link";

export default function Page(){
  return (
    <nav>
      <ul>
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
        {/* Agrega más elementos del menú según tu necesidad */}
      </ul>
    </nav>
  );
}