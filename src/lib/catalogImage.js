import catalogImageFallback from "@/assets/images/catalog-fallback.svg";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";

export const CATALOG_IMAGE_FALLBACK = catalogImageFallback;

export const resolveCatalogImageUrl = (value) => (
  resolveBackendAssetUrl(value, CATALOG_IMAGE_FALLBACK)
);
