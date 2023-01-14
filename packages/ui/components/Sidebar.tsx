import NavMenuButtons from "./NavMenuButtons";

export default function Sidebar() {
  return (
    <div className="col-span-3 col-start-1 max-sm:hidden">
      <NavMenuButtons />
    </div>
  );
}
