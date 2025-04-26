#pip install pdfplumber 
import requests
import pdfplumber
 
api_key = "api-key-sent-in-discord"    
url = "https://api.openai.com/v1/chat/completions"

pdf_path = "/Users/vinisha/Downloads/Washington-2025-HB1633-Enrolled.pdf" 

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
if response.status_code == 200:
    reply = response.json()['choices'][0]['message']['content']
    
    output_file = "simplified_bill.txt"
    with open(output_file, "w") as f:
        f.write(reply)
    
    print(f"\nSimplified saved to '{output_file}'")
else:
    print(f"Error {response.status_code}: {response.json()}")
