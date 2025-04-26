import PyPDF2
import requests
import pandas as pd

pdf_path = "/Users/vinisha/Downloads/Washington-2025-HB1633-Enrolled.pdf"
csv_path = "/Users/vinisha/Desktop/HackathonReal2025/HackathonGithub/WA/Members-2025-04-25.csv"

api_key = ""
url = "https://api.openai.com/v1/chat/completions"

def summarize_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text()
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

    # Limit characters for GPT
    MAX_CHARS = 10000
    prompt = f"Simplify the following legislative bill into plain English, highlighting key points, dates, and actions:\n\n{text[:MAX_CHARS]}"

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            return response.json()['choices'][0]['message']['content']
        else:
            print(f"GPT Error: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error querying GPT: {e}")
        return None

def extract_names_from_pdf(pdf_path): 
    names = set()
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text = page.extract_text() 
                words = text.split()
                for i, word in enumerate(words):
                    if word.istitle() and i+1 < len(words):
                        next_word = words[i+1]
                        if next_word.istitle() and word.lower() not in ['the', 'by', 'session', 'regular', 'state', 'passed']:
                            names.add(f"{word} {next_word}")
    except Exception as e:
        print(f"Error extracting names: {e}")
    return list(names)

def lookup_contact_info(name, df):
    try:
        first, last = name.split()
        contact_info = df[df['Name'].str.contains(last, case=False, na=False)]
        if not contact_info.empty:
            return contact_info.to_dict(orient='records')
        else:
            return None
    except Exception as e:
        print(f"Error during contact lookup: {e}")
        return None

def main():
    try:
        df_contacts = pd.read_csv(csv_path)
    except Exception as e:
        print(f"Failed to read CSV: {e}")
        return
 
    summary = summarize_pdf(pdf_path)
    if not summary:
        print("Failed to generate summary.")
        return
 
    names = extract_names_from_pdf(pdf_path)
    if not names:
        print("No valid names found in the PDF.")
        return

    results = []
    results.append("=== Simplified Legislative Bill ===\n")
    results.append(summary + "\n")

    results.append("=== People & Contact Info ===\n")
    for name in names:
        contact_info = lookup_contact_info(name, df_contacts)
        if contact_info:
            results.append(f"{name} | Contact Info: {contact_info}")
        else:
            results.append(f"{name}")

    with open("final_summary_with_contacts.txt", "w") as f:
        for line in results:
            f.write(line + "\n")

    print("\nSaved to'final_summary_with_contacts.txt'.")

if __name__ == "__main__":
    main()
