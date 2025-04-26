import requests
import pdfplumber
import re

api_key = ""
url = "https://api.openai.com/v1/chat/completions"

pdf_path = "/Users/vinisha/Downloads/Washington-2025-HB1633-Enrolled.pdf"

with pdfplumber.open(pdf_path) as pdf:
    full_text = ""
    for page in pdf.pages:
        full_text += page.extract_text()

MAX_CHARS = 10000
prompt = f"Simplify the following legislative bill into plain English, highlighting key points, dates, and actions:\n\n{full_text[:MAX_CHARS]}"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

data = {
    "model": "gpt-4o",
    "messages": [
        {
            "role": "user",
            "content": prompt
        }
    ]
}

response = requests.post(url, headers=headers, json=data)

final_output = ""

if response.status_code == 200:
    reply = response.json()['choices'][0]['message']['content']
    final_output += "=== Simplified Legislative Bill ===\n\n"
    final_output += reply + "\n\n"
else:
    print(f"Error simplifying bill: {response.status_code}")
    exit()

name_blocks = re.findall(r'(By Representatives|Senators)\s+([A-Za-z,\s]+)', full_text)

last_names = set()

for block in name_blocks:
    names_str = block[1]
    names = [name.strip() for name in names_str.split(',') if name.strip()]
    last_names.update(names)
 
emails = re.findall(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}", full_text)
phones = re.findall(r"\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}", full_text)
 
final_output += "=== People & Contact Info ===\n\n"

for name in sorted(last_names):
    found_email = None
    found_phone = None

    for email in emails:
        if name.lower() in email.lower():
            found_email = email
            break

    for phone in phones:
        found_phone = phone
        break   

    final_output += f"- {name}"
    if found_email:
        final_output += f" | Email: {found_email}"
    if found_phone:
        final_output += f" | Phone: {found_phone}"
    final_output += "\n"

with open("final_summarized_bill.txt", "w") as f:
    f.write(final_output)

print(f"\nSaved to 'final_summarized_bill.txt'")
