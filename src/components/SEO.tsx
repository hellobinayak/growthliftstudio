import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  schema?: Record<string, any> | Record<string, any>[];
}

export function SEO({ title, description, schema }: SEOProps) {
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

    // 4b. Update Open Graph URL
    const pageUrl = `https://growthliftstudio.in${pathname === "/" ? "" : pathname.replace(/\/$/, "")}`;
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", pageUrl);
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

    // 6. Update dynamic JSON-LD schema
    let scriptSchema = document.getElementById("dynamic-seo-schema");
    if (schema) {
      if (!scriptSchema) {
        scriptSchema = document.createElement("script");
        scriptSchema.setAttribute("type", "application/ld+json");
        scriptSchema.setAttribute("id", "dynamic-seo-schema");
        document.head.appendChild(scriptSchema);
      }
      scriptSchema.textContent = JSON.stringify(schema);
    } else {
      if (scriptSchema) {
        scriptSchema.remove();
      }
    }

    return () => {
      // Clean up script on unmount
      const oldScript = document.getElementById("dynamic-seo-schema");
      if (oldScript) {
        oldScript.remove();
      }
    };
  }, [title, description, pathname, schema]);

  return null;
}
