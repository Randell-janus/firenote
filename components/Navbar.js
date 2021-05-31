import Link from "next/link";
import {
  Nav,
  StyledLink,
  TextPrimary,
  TextSecondary,
} from "./styles/NavStyles";

const Navbar = () => {
  return (
    <Nav>
      <div>
        <Link href="/" passHref>
          <TextPrimary>
            NXT<TextSecondary>AI</TextSecondary>
          </TextPrimary>
        </Link>
      </div>
      <div>
        <Link href="/" passHref>
          <StyledLink>Home</StyledLink>
        </Link>
        <Link href="/about" passHref>
          <StyledLink>About</StyledLink>
        </Link>
        <Link href="/services" passHref>
          <StyledLink>Services</StyledLink>
        </Link>
      </div>
    </Nav>
  );
};

export default Navbar;
