import { Button } from "@shadcdn/ui";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed flex w-full max-w-7xl items-start justify-between px-[5%] pb-6 pt-6">
      <Image src="/borg/borg-id-logo.svg" width={88} height={30} className="mt-0.5" alt="Borg.id logo" />{" "}
      <Button asChild className="">
        <Link href="/auth/login">Log In</Link>
      </Button>
    </header>
  );
};

export default Header;
