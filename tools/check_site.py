from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
PAGES = sorted(ROOT.glob("*.html"))
CSS_URL = re.compile(r"url\(\s*['\"]?([^)'\"]+)")


class AuditParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.refs = []
        self.blank_links = []
        self.images = []
        self.title = False
        self.description = False

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if "id" in data:
            self.ids.append(data["id"])
        if tag == "title":
            self.title = True
        if tag == "meta" and data.get("name", "").lower() == "description" and data.get("content", "").strip():
            self.description = True
        if tag in {"a", "link"} and data.get("href"):
            self.refs.append(data["href"])
        if tag in {"img", "script", "video", "source"} and data.get("src"):
            self.refs.append(data["src"])
        if tag == "a" and data.get("target") == "_blank" and "noopener" not in data.get("rel", "").split():
            self.blank_links.append(data.get("href", ""))
        if tag == "img":
            self.images.append(data)


def local_path(page, value):
    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc or value.startswith(("mailto:", "tel:", "javascript:")):
        return None
    clean = unquote(parsed.path)
    if not clean:
        return None
    return (page.parent / clean).resolve()


def main():
    errors = []
    for page in PAGES:
        parser = AuditParser()
        source = page.read_text(encoding="utf-8")
        parser.feed(source)
        parser.refs.extend(CSS_URL.findall(source))
        duplicate_ids = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
        if duplicate_ids:
            errors.append(f"{page.name}: duplicate ids: {', '.join(duplicate_ids)}")
        if page.name != "404.html" and not parser.title:
            errors.append(f"{page.name}: missing title")
        if page.name not in {"404.html"} and not parser.description:
            errors.append(f"{page.name}: missing meta description")
        for href in parser.blank_links:
            errors.append(f"{page.name}: target=_blank missing rel=noopener: {href}")
        for image in parser.images:
            if not image.get("alt", "").strip():
                errors.append(f"{page.name}: image missing descriptive alt text: {image.get('src', '')}")
        for ref in parser.refs:
            path = local_path(page, ref)
            if path is not None and not path.exists():
                errors.append(f"{page.name}: missing local reference: {ref}")

    for stylesheet in sorted((ROOT / "css").glob("*.css")):
        for ref in CSS_URL.findall(stylesheet.read_text(encoding="utf-8")):
            path = local_path(stylesheet, ref)
            if path is not None and not path.exists():
                errors.append(f"{stylesheet.relative_to(ROOT)}: missing local reference: {ref}")

    if errors:
        print("Site audit failed:")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)
    print(f"Site audit passed for {len(PAGES)} HTML pages.")


if __name__ == "__main__":
    main()
