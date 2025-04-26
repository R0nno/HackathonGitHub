import requests
import pdfplumber

api_key = ""    
url = "https://api.openai.com/v1/chat/completions"

pdf_path = "/Users/vinisha/Downloads/Washington-2025-HB1633-Enrolled.pdf"

print("Extracting text from PDF...")

with pdfplumber.open(pdf_path) as pdf:
    full_text = ""
    for page in pdf.pages:
        full_text += page.extract_text()

MAX_CHARS = 10000    
text_to_summarize = full_text[:MAX_CHARS]

prompt = f"Simplify the following legislative bill into plain English, highlighting key points, dates, and actions:\n\n{text_to_summarize}"

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
    print(f"Error simplifying bill: {response.status_code} - {response.json()}")
    exit()

names = set()
words = full_text.split()

for i, word in enumerate(words):
    if word.istitle() and i+1 < len(words) and words[i+1].istitle():
        names.add(f"{word} {words[i+1]}")

if not names:
    print("No names found.")
else:
    print(f"Found {len(names)} potential names.")
 
final_output += "=== People Mentioned in the Bill ===\n\n"

for name in names:
    name_prompt = f"Who is {name} in the context of Washington legislative bills?"
    data['messages'][0]['content'] = name_prompt

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        answer = response.json()['choices'][0]['message']['content']
        if "I don't have information" in answer or "I'm not sure" in answer:
            final_output += f"- {name}\n"
        else:
            final_output += f"- {name}: {answer}\n\n"
    else:
        final_output += f"- {name}\n"   # Just list the name if API fails for that person
 
output_file = "final_summarized_bill.txt"
with open(output_file, "w") as f:
    f.write(final_output)

print(f"\n Saved to '{output_file}'")
