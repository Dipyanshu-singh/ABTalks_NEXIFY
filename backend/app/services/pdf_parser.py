import fitz

def extract_text_from_pdf(file_path: str) -> str:
    print("Reading PDF:", file_path)

    doc = fitz.open(file_path)

    text = ""

    for page_num, page in enumerate(doc):
        page_text = page.get_text()
        print(f"Page {page_num + 1}: {len(page_text)} characters")
        text += page_text

    doc.close()

    return text