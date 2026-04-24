import PropTypes from "prop-types";
import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const BRAND_ICONS = {
  facebook: FaFacebook,
  facebookF: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
};

const brandIconNames = Object.keys(BRAND_ICONS);

export function BrandIcon({ brand, ...props }) {
  const Icon = BRAND_ICONS[brand];
  return <Icon {...props} />;
}

BrandIcon.propTypes = {
  brand: PropTypes.oneOf(brandIconNames).isRequired,
};
