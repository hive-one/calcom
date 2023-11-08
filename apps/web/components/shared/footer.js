import { Button } from "@shadcdn/ui";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex w-full max-w-7xl flex-col gap-10 px-[5%] pb-4 pt-10 md:gap-6 md:pt-14">
      <div
        className="grid w-full grid-flow-dense gap-y-10 md:gap-y-0"
        style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}>
        <Link className="col-span-6 md:col-span-7 lg:col-span-9" href="/">
          <Image src="/borg/borg-id-logo.svg" width={88} height={30} alt="Borg.id logo" />
        </Link>
        <div className="col-span-12 flex flex-row flex-wrap justify-center gap-x-6 gap-y-0 md:col-span-3 md:flex-col md:gap-3 lg:col-span-2">
          <Button variant="link" size="sm" className="w-max px-0" asChild>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </Button>
          <Button variant="link" size="sm" className="w-max px-0" asChild>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </Button>
          <Button variant="link" size="sm" className="w-max px-0" asChild>
            <Link href="/impressum">Impressum</Link>
          </Button>
          <Button variant="link" size="sm" className="w-max px-0" asChild>
            <Link href="/terms-conditions">Terms & Conditions</Link>
          </Button>
        </div>
        {/* <div className="col-span-6 flex h-9 items-center justify-end gap-6 md:col-span-2 lg:col-span-1">
          <Twitter size={16} />
          <Envelope size={16} />
        </div> */}
      </div>
      <div className="text-landing-xs">Copyright © 2023 Borg Collective GmbH. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
