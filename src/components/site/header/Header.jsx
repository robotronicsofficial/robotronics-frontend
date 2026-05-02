import { Link } from "@tanstack/react-router";

import logoMark from "@/assets/logo/robotronicsCharacter.svg";
import { Container } from "@/components/ui/container";
import HeaderActions from "./HeaderActions";
import HeaderMobileMenu from "./HeaderMobileMenu";
import HeaderNav from "./HeaderNav";

const Brand = () => (
  <Link
    to="/"
    className="flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-80"
    aria-label="Robotronics — home"
  >
    <img
      src={logoMark}
      alt=""
      aria-hidden="true"
      className="h-8 w-8 shrink-0"
    />
    <span className="text-h5 font-semibold tracking-tight">Robotronics</span>
  </Link>
);

const Header = () => (
  <header
    className="sticky top-0 z-header w-full border-b border-border bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70"
  >
    <Container size="wide">
      <div className="flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Brand />
          <HeaderNav />
        </div>
        <div className="flex items-center gap-1">
          <HeaderActions />
          <HeaderMobileMenu />
        </div>
      </div>
    </Container>
  </header>
);

export default Header;
