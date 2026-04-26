import os
import re
from datetime import date

# ── CONFIG ──────────────────────────────────────────────────────────────────
PAGES_DIR = "src/pages"
OUTPUT_DIR = "public"  # mirrors go into public/ so GitHub Pages serves them
BASE_URL   = "https://growthliftstudio.in"
TODAY      = date.today().isoformat()

PAGE_MAP = {
    "Home.tsx":            ("",               "Growth Lift Studio | Lead Generation for Home Improvement Contractors",
                            "Performance-based Facebook Ads and Google Ads for bathroom remodeling, kitchen remodeling, and window replacement contractors across the US."),
    "Services.tsx":        ("services",       "Services | Growth Lift Studio",
                            "Facebook Ads and Google Ads lead generation services for home improvement contractors. Performance-based pricing — pay only when you close a job."),
    "CaseStudies.tsx":     ("case-studies",   "Case Studies | Growth Lift Studio",
                            "Real results from home improvement contractors. 21 leads in 30 days for a NYC bathroom remodeler at $55/lead."),
    "FAQ.tsx":             ("faq",            "FAQ | Growth Lift Studio",
                            "Frequently asked questions about Growth Lift Studio's lead generation services, pricing, and guarantee."),
    "Testimonials.tsx":    ("testimonials",   "Testimonials | Growth Lift Studio",
                            "What home improvement contractors say about working with Growth Lift Studio."),
    "AboutUs.tsx":         ("about",          "About Us | Growth Lift Studio",
                            "Growth Lift Studio is a performance-based lead generation agency founded by Binayak Dey, specializing exclusively in home improvement businesses."),
    "Contact.tsx":         ("contact",        "Contact | Growth Lift Studio",
                            "Get in touch with Growth Lift Studio to start generating qualified leads for your home improvement business."),
    "PrivacyPolicy.tsx":   ("privacy-policy", "Privacy Policy | Growth Lift Studio",
                            "Privacy policy for growthliftstudio.in"),
    "TermsConditions.tsx": ("terms",          "Terms & Conditions | Growth Lift Studio",
                            "Terms and conditions for Growth Lift Studio services."),
}

# ── TEXT EXTRACTION ──────────────────────────────────────────────────────────

def extract_text_from_tsx(content):
    # Fix common encoding issues
    content = content.replace('ΓÇÖ', "'").replace('ΓÇô', '—').replace('ΓÇ£', '"').replace('ΓÇ¥', '"')
    content = content.replace('\u2019', "'").replace('\u2014', '—').replace('\u201c', '"').replace('\u201d', '"')

    # Remove import statements entirely
    content = re.sub(r'^import\s+[\s\S]*?from\s+[\'"][^\'"]+[\'"];?\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'^import\s+.*?;?\s*$', '', content, flags=re.MULTILINE)

    # Remove lucide-react icon name lists (e.g. ArrowRight, TrendingUp,)
    content = re.sub(r'\b[A-Z][a-zA-Z0-9]+,\s*$', '', content, flags=re.MULTILINE)

    # Remove export / function / const / hook declarations
    content = re.sub(r'^(export|const|function|interface|type|let|var|async)\s+.*', '', content, flags=re.MULTILINE)

    # Remove TypeScript types
    content = re.sub(r':\s*[A-Z][a-zA-Z<>\[\]]+', '', content)

    # Remove single-line comments
    content = re.sub(r'//.*', '', content)

    # Remove multi-line comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)

    # Remove JSX attributes
    content = re.sub(r'\s*(className|style|onClick|onChange|onSubmit|href|src|alt|type|id|key|ref|aria-\w+|data-\w+|target|rel|placeholder|value|name|method|action|role|tabIndex|disabled|required|variants|initial|animate|transition|whileHover|whileTap)\s*=\s*(\{[^}]*\}|"[^"]*"|\'[^\']*\')', '', content)

    # Remove .map(), .filter(), hooks, and JS expressions
    content = re.sub(r'\]\s*\.\s*map\s*\([^)]*\)\s*=>\s*\(', '', content)
    content = re.sub(r'useRef|useState|useEffect|useScroll|useTransform|useSurvey|useNavigate|useLocation', '', content)

    # Remove JSX expressions in curly braces
    content = re.sub(r'\{[^{}]*\}', '', content)

    # Remove HTML/JSX tags
    content = re.sub(r'<[^>]+/?>', '\n', content)
    content = re.sub(r'</[^>]+>', '\n', content)

    # Remove lines that are code artifacts
    lines = content.split('\n')
    clean_lines = []
    for line in lines:
        stripped = line.strip()

        if not stripped or len(stripped) < 3:
            continue

        # Skip pure symbol lines
        if re.match(r'^[\(\)\[\]{};,=><\|&\+\-\*\/\\\.\'\":`]+$', stripped):
            continue

        # Skip JS keywords alone
        if stripped in ('return', 'const', 'export default', '=>', '?', ':', 'null', 'true', 'false', '(', ')', '{', '}', '[', ']'):
            continue

        # Skip lines ending in comma that are likely icon/variable names
        if re.match(r'^[A-Z][a-zA-Z0-9]+,$', stripped):
            continue

        # Skip lines that look like JS variable assignments or function calls
        if re.match(r'^[a-zA-Z_$][a-zA-Z0-9_$]*\s*[\(\[=]', stripped) and '.' not in stripped:
            continue

        # Skip lines with { or } as majority content
        if stripped.count('{') + stripped.count('}') > len(stripped) / 3:
            continue

        # Skip URL-only lines
        if re.match(r'^https?://', stripped):
            continue

        clean_lines.append(stripped)

    text = '\n'.join(clean_lines)
    text = re.sub(r'\n{3,}', '\n\n', text)

    return text.strip()


def text_to_markdown(text, title):
    lines = text.split('\n')
    md_lines = []
    md_lines.append(f"# {title}\n")

    for line in lines:
        line = line.strip()
        if not line:
            md_lines.append('')
            continue

        # Detect likely headings (short lines, no punctuation at end, not a sentence)
        if len(line) < 80 and not line.endswith('.') and not line.endswith(',') and line[0].isupper():
            word_count = len(line.split())
            if word_count <= 8:
                md_lines.append(f"\n## {line}\n")
                continue

        # Regular paragraph line
        md_lines.append(line)

    return '\n'.join(md_lines)


def build_frontmatter(title, description, url):
    return f"""---
title: {title}
description: {description}
url: {url}
last_updated: {TODAY}
---

"""


def generate_mirror(filename, slug, title, description):
    input_path = os.path.join(PAGES_DIR, filename)

    if not os.path.exists(input_path):
        print(f"  SKIP — file not found: {input_path}")
        return

    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract and convert
    raw_text  = extract_text_from_tsx(content)
    markdown  = text_to_markdown(raw_text, title)

    # Build URL
    if slug:
        url        = f"{BASE_URL}/{slug}/"
        output_dir = os.path.join(OUTPUT_DIR, slug)
    else:
        url        = f"{BASE_URL}/"
        output_dir = OUTPUT_DIR

    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "index.md")

    frontmatter = build_frontmatter(title, description, url)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(frontmatter + markdown)

    print(f"  OK  {filename:30s} → {output_path}")


# ── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    print("\n Growth Lift Studio — Markdown Mirror Generator")
    print("=" * 52)

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    count = 0
    for filename, (slug, title, description) in PAGE_MAP.items():
        generate_mirror(filename, slug, title, description)
        count += 1

    print("=" * 52)
    print(f"\n Done — {count} markdown mirrors generated in /{OUTPUT_DIR}/")
    print("\n Next steps:")
    print("  1. Review files in the public/ folder")
    print("  2. git add .")
    print("  3. git commit -m 'Add markdown mirrors for AI visibility'")
    print("  4. git push")
    print(f"\n  Test: {BASE_URL}/index.md")


if __name__ == "__main__":
    main()
