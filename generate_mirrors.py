import os
from bs4 import BeautifulSoup
import markdownify

pages = [
    ("dist/index.html", "public/index.md"),
    ("dist/index.html", "public/services/index.md"),
    ("dist/index.html", "public/results/index.md"),
    ("dist/index.html", "public/about/index.md"),
    ("dist/index.html", "public/testimonials/index.md"),
    ("dist/index.html", "public/faq/index.md"),
    ("dist/index.html", "public/blog/index.md"),
]

slugs = [
    ("Growth Lift Studio - Home", "public/index.md"),
    ("Services", "public/services/index.md"),
    ("Case Studies", "public/results/index.md"),
    ("About Us", "public/about/index.md"),
    ("Testimonials", "public/testimonials/index.md"),
    ("FAQ", "public/faq/index.md"),
    ("Blog", "public/blog/index.md"),
]

# Read the single dist/index.html
with open("dist/index.html", "r", encoding="utf-8") as f:
    content = f.read()

soup = BeautifulSoup(content, "html.parser")

for tag in soup(["script", "style", "noscript"]):
    tag.decompose()

main = soup.find("body") or soup
md = markdownify.markdownify(str(main), heading_style="ATX")

for title, md_path in slugs:
    os.makedirs(os.path.dirname(md_path) if os.path.dirname(md_path) else ".", exist_ok=True)
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(f"# {title}\n\n")
        f.write(md)
    print(f"Done: {md_path}")

print("All mirrors generated.")