import Image from "next/image";
import logo from "../assets/images/logo.png";

export function Header() {
  return (
    <header className="flex items-center justify-between h-30 w-full">
      <span className="flex items-center ml-2 md:ml-30">
        <Image
          src={logo}
          alt="Logo CubeHabits"
          width={60}
          height={60}
          unoptimized
        />
        <h1 className="text-3xl font-bold text-[#0288d1]">CubeHabits</h1>
      </span>
    </header>
  );
}
