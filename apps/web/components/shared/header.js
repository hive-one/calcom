import { Button } from "@shadcdn/ui";
import Image from "next/image";
import Link from "next/link";

const Header = ({ isScrolled }) => {
  return (
    <header
      className="fixed flex w-full max-w-7xl items-start justify-between px-[5%] pb-6 pt-6"
      style={
        isScrolled
          ? {
              background: "rgba(255,255,255,0.92)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 35%, 50%, rgba(0,0,0,0))",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 35%, 50%, rgba(0,0,0,0))",
              backdropFilter: "blur(5px)",
            }
          : {}
      }>
      <Link href="/">
        <Image src="/borg/borg-id-logo.svg" width={88} height={30} className="mt-0.5" alt="Borg.id logo" />{" "}
      </Link>
      <Button asChild className="">
        <Link href="/auth/login">Log In</Link>
      </Button>
    </header>
  );
};

export default Header;
