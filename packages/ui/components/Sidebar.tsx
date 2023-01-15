import NavMenuButtons from "./NavMenuButtons";

export default function Sidebar() {
  return (
    <div className="col-span-2 col-start-1 max-sm:hidden">
      <NavMenuButtons />
    </div>
  );
}
