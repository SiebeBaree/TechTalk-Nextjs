import Link from "next/link";

export default function NavLink({name, path}: {
    name: string;
    path: string;
}) {
    return (
        <Link className="rounded-md border-1 px-6 py-2 bg-primary text-primary-foreground" href={path}>
            {name}
        </Link>
    )
}