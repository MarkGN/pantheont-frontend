import NavbarLink from "./NavbarLink";
const tabs = ["boon", "item", "plant", "spell", "tag"];

export default function Header() {
  return <div className="topnav">
    <NavbarLink url="/boon" name="Boon" />
    <NavbarLink url="/item" name="Item" />
    <NavbarLink url="/plant" name="Plant" />
    <NavbarLink url="/spell" name="Spell" />
    <NavbarLink url="/tag" name="Tag" />
    <NavbarLink url="/character" />
  </div>;
}