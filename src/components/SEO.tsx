import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
}

export function SEO({ title, description }: SEOProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Update browser tab title
    document.title = title;

    // 2. Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 3. Update Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    // 4. Update Open Graph description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", description);
    }

    // 5. Update Canonical link
    const canonicalUrl = `https://growthliftstudio.in${pathname === "/" ? "" : pathname.replace(/\/$/, "")}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl);
  }, [title, description, pathname]);

  return null;
}
