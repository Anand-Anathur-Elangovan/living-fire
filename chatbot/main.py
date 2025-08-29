# # import gspread
# # from google.oauth2.service_account import Credentials
# # import requests

# # # ========== Google Sheets Setup ==========
# # SERVICE_ACCOUNT_FILE = "service_account.json"  # downloaded from GCP
# # SCOPES = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

# # creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
# # client = gspread.authorize(creds)

# # # Open Google Sheet (by ID)
# # SHEET_ID = "1Jx92km4fGK5j4r5DxjV6z3hUksWZ-f496i_qybvZflg"
# # spreadsheet = client.open_by_key(SHEET_ID)

# # # Get data from all tabs with auto-renamed headers
# # all_tabs_data = {}

# # for worksheet in spreadsheet.worksheets():
# #     headers = worksheet.row_values(1)

# #     # 🔹 Auto-rename duplicates & blanks
# #     seen = {}
# #     unique_headers = []
# #     for h in headers:
# #         if h.strip() == "":
# #             h = "Unnamed"
# #         if h in seen:
# #             seen[h] += 1
# #             unique_headers.append(f"{h}_{seen[h]}")
# #         else:
# #             seen[h] = 0
# #             unique_headers.append(h)

# #     # Get all rows except the header
# #     rows = worksheet.get_all_values()[1:]

# #     # Convert to list of dicts (tabular data)
# #     records = [dict(zip(unique_headers, row)) for row in rows]
# #     all_tabs_data[worksheet.title] = records

# # # ========== Hugging Face Setup ==========
# # HF_API_KEY = "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"  # replace with your Hugging Face token
# # # API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large"
# # API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-small"
# # headers = {"Authorization": f"Bearer {HF_API_KEY}"}

# # def query_hf(prompt):
# #     """Send query to Hugging Face model"""
# #     payload = {"inputs": prompt}
# #     response = requests.post(API_URL, headers=headers, json=payload)
# #     response.raise_for_status()  # raise error if failed
# #     return response.json()

# # # ========== Chatbot Function ==========
# # def chatbot(user_query: str) -> str:
# #     """
# #     Takes user input, injects Google Sheets data, and queries Hugging Face model.
# #     """
# #     context = f"Here is the Google Sheets data:\n{all_tabs_data}\n"
# #     prompt = context + f"Answer the user question: {user_query}"

# #     result = query_hf(prompt)

# #     # Some models return different JSON formats; handle safely
# #     if isinstance(result, list) and "generated_text" in result[0]:
# #         return result[0]["generated_text"]
# #     elif isinstance(result, dict) and "generated_text" in result:
# #         return result["generated_text"]
# #     else:
# #         return str(result)

# # # ========== Example ==========
# # if __name__ == "__main__":
# #     answer = chatbot("What is the price of Product A in tab 'Electronics'?")
# #     print("🤖 Chatbot:", answer)



# import gspread
# from google.oauth2.service_account import Credentials
# import requests
# import json
# import time

# # ========== Google Sheets Setup ==========
# SERVICE_ACCOUNT_FILE = "service_account.json"  # downloaded from GCP
# SCOPES = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

# creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
# client = gspread.authorize(creds)

# # Open Google Sheet (by ID)
# SHEET_ID = "1Jx92km4fGK5j4r5DxjV6z3hUksWZ-f496i_qybvZflg"
# spreadsheet = client.open_by_key(SHEET_ID)

# # Get data from all tabs with auto-renamed headers
# all_tabs_data = {}

# for worksheet in spreadsheet.worksheets():
#     headers = worksheet.row_values(1)

#     # 🔹 Auto-rename duplicates & blanks
#     seen = {}
#     unique_headers = []
#     for h in headers:
#         if h.strip() == "":
#             h = "Unnamed"
#         if h in seen:
#             seen[h] += 1
#             unique_headers.append(f"{h}_{seen[h]}")
#         else:
#             seen[h] = 0
#             unique_headers.append(h)

#     # Get all rows except the header
#     rows = worksheet.get_all_values()[1:]

#     # Convert to list of dicts (tabular data)
#     records = [dict(zip(unique_headers, row)) for row in rows]
#     all_tabs_data[worksheet.title] = records

# # ========== Hugging Face Setup ==========
# HF_API_KEY = "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"  # replace with your Hugging Face token

# # Try a more reliable model - let's use a different T5 variant
# API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-base"
# headers = {"Authorization": f"Bearer {HF_API_KEY}"}

# def query_hf(prompt, max_retries=3):
#     """Send query to Hugging Face model with retry logic"""
#     payload = {"inputs": prompt}
    
#     for attempt in range(max_retries):
#         try:
#             response = requests.post(API_URL, headers=headers, json=payload)
#             response.raise_for_status()  # raise error if failed
            
#             # Check if model is loading
#             if response.status_code == 503:
#                 # Model is loading, get estimated time
#                 result = response.json()
#                 if "estimated_time" in result:
#                     wait_time = result["estimated_time"]
#                     print(f"Model is loading, waiting {wait_time:.2f} seconds...")
#                     time.sleep(wait_time)
#                     continue
            
#             return response.json()
            
#         except requests.exceptions.HTTPError as e:
#             if response.status_code == 404:
#                 # Try an alternative model if the first one fails
#                 if API_URL.endswith("flan-t5-base"):
#                     print("Model not found, trying an alternative...")
#                     # Try a different model
#                     alt_api_url = "https://api-inference.huggingface.co/models/google/flan-t5-large"
#                     response = requests.post(alt_api_url, headers=headers, json=payload)
#                     if response.status_code == 200:
#                         return response.json()
                
#                 raise Exception(f"Model not found. Please check the model name: {e}")
#             elif response.status_code == 503:
#                 # Model is loading, wait and retry
#                 print("Model is loading, retrying in 10 seconds...")
#                 time.sleep(10)
#                 continue
#             else:
#                 raise Exception(f"HTTP error: {e}")
#         except Exception as e:
#             if attempt == max_retries - 1:
#                 raise Exception(f"Failed after {max_retries} attempts: {e}")
#             print(f"Attempt {attempt + 1} failed, retrying...")
#             time.sleep(2)
    
#     return {"error": "Failed to get response from model"}

# # ========== Chatbot Function ==========
# def chatbot(user_query: str) -> str:
#     """
#     Takes user input, injects Google Sheets data, and queries Hugging Face model.
#     """
#     # Convert the data to a more readable format
#     data_str = json.dumps(all_tabs_data, indent=2)
#     context = f"Here is the Google Sheets data:\n{data_str}\n"
#     prompt = context + f"Based on the data above, answer the user question: {user_query}"

#     try:
#         result = query_hf(prompt)
        
#         # Handle different response formats
#         if isinstance(result, list):
#             if len(result) > 0 and "generated_text" in result[0]:
#                 return result[0]["generated_text"]
#             else:
#                 return str(result)
#         elif isinstance(result, dict):
#             if "generated_text" in result:
#                 return result["generated_text"]
#             elif "error" in result:
#                 return f"Error: {result['error']}"
#             else:
#                 return str(result)
#         else:
#             return f"Unexpected response format: {str(result)}"
            
#     except Exception as e:
#         return f"Error processing your request: {str(e)}"

# # ========== Example ==========
# if __name__ == "__main__":
#     # Test with a simpler query first
#     answer = chatbot("How many tabs are in the spreadsheet?")
#     print("🤖 Chatbot:", answer)
    
#     # Then try the original query
#     answer = chatbot("What is the price of Product A in tab 'Electronics'?")
#     print("🤖 Chatbot:", answer)


import gspread
from google.oauth2.service_account import Credentials
import requests
import json
import time

# ========== Google Sheets Setup ==========
SERVICE_ACCOUNT_FILE = "service_account.json"
SCOPES = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
client = gspread.authorize(creds)

# Open Google Sheet
SHEET_ID = "1Jx92km4fGK5j4r5DxjV6z3hUksWZ-f496i_qybvZflg"
spreadsheet = client.open_by_key(SHEET_ID)

# Get data from all tabs
all_tabs_data = {}

for worksheet in spreadsheet.worksheets():
    headers = worksheet.row_values(1)
    seen = {}
    unique_headers = []
    
    for h in headers:
        if h.strip() == "":
            h = "Unnamed"
        if h in seen:
            seen[h] += 1
            unique_headers.append(f"{h}_{seen[h]}")
        else:
            seen[h] = 0
            unique_headers.append(h)
    
    rows = worksheet.get_all_values()[1:]
    records = [dict(zip(unique_headers, row)) for row in rows]
    all_tabs_data[worksheet.title] = records

# ========== Hugging Face Setup ==========
HF_API_KEY = "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"
headers = {"Authorization": f"Bearer {HF_API_KEY}"}

# Let's try a different approach - use a more commonly available model
# First, let's test what models work by trying a few alternatives

MODEL_OPTIONS = [
    "https://api-inference.huggingface.co/models/google/flan-t5-xl",
    "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
    "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
    "https://api-inference.huggingface.co/models/distilgpt2",
    "https://api-inference.huggingface.co/models/bert-base-uncased"
]

def find_working_model():
    """Test which models are available"""
    test_payload = {"inputs": "Hello, how are you?"}
    
    for model_url in MODEL_OPTIONS:
        try:
            print(f"Testing model: {model_url.split('/')[-1]}")
            response = requests.post(model_url, headers=headers, json=test_payload, timeout=10)
            
            if response.status_code == 200:
                print(f"✓ Model {model_url.split('/')[-1]} is available!")
                return model_url
            elif response.status_code == 503:
                print(f"⏳ Model {model_url.split('/')[-1]} is loading...")
                # Wait and try again
                time.sleep(5)
                response = requests.post(model_url, headers=headers, json=test_payload, timeout=10)
                if response.status_code == 200:
                    return model_url
            else:
                print(f"✗ Model {model_url.split('/')[-1]} returned status: {response.status_code}")
                
        except Exception as e:
            print(f"✗ Error with model {model_url.split('/')[-1]}: {str(e)}")
    
    return None

# Find a working model
API_URL = find_working_model()

if API_URL is None:
    print("No working models found. Using a simple rule-based approach instead.")
    
    # Fallback to simple text processing
    def simple_chatbot(query):
        query_lower = query.lower()
        
        # Check for price questions
        if "price" in query_lower and "product" in query_lower:
            product_name = None
            tab_name = None
            
            # Extract product name
            if "product a" in query_lower:
                product_name = "Product A"
            elif "product b" in query_lower:
                product_name = "Product B"
            elif "product c" in query_lower:
                product_name = "Product C"
            
            # Extract tab name
            if "electronics" in query_lower:
                tab_name = "Electronics"
            elif "clothing" in query_lower:
                tab_name = "Clothing"
            elif "books" in query_lower:
                tab_name = "Books"
            
            if product_name and tab_name and tab_name in all_tabs_data:
                for item in all_tabs_data[tab_name]:
                    if item.get("Product", "") == product_name or item.get("Product Name", "") == product_name:
                        return f"The price of {product_name} in {tab_name} is {item.get('Price', 'unknown')}"
                
                return f"Sorry, I couldn't find {product_name} in the {tab_name} tab."
        
        return "I can help with simple price queries. Try asking about the price of a product in a specific tab."

    chatbot = simple_chatbot

else:
    print(f"Using model: {API_URL}")
    
    def query_hf(prompt, max_retries=3):
        """Send query to Hugging Face model"""
        payload = {"inputs": prompt}
        
        for attempt in range(max_retries):
            try:
                response = requests.post(API_URL, headers=headers, json=payload, timeout=30)
                
                if response.status_code == 503:
                    # Model is loading
                    wait_time = 10
                    print(f"Model is loading, waiting {wait_time} seconds...")
                    time.sleep(wait_time)
                    continue
                
                response.raise_for_status()
                return response.json()
                
            except requests.exceptions.RequestException as e:
                if attempt == max_retries - 1:
                    raise e
                print(f"Attempt {attempt + 1} failed, retrying...")
                time.sleep(2)
        
        return {"error": "Failed to get response"}

    def chatbot(user_query):
        """AI-powered chatbot using Hugging Face"""
        data_str = json.dumps(all_tabs_data, indent=2)
        prompt = f"Based on this data: {data_str}\n\nAnswer this question: {user_query}"
        
        try:
            result = query_hf(prompt)
            
            if isinstance(result, list) and len(result) > 0:
                if "generated_text" in result[0]:
                    return result[0]["generated_text"]
                return str(result[0])
            elif isinstance(result, dict):
                if "generated_text" in result:
                    return result["generated_text"]
                return str(result)
            else:
                return str(result)
                
        except Exception as e:
            return f"Error: {str(e)}. Please try a simpler query."

# ========== Test the chatbot ==========
if __name__ == "__main__":
    # Test simple query first
    answer = chatbot("How many tabs are in the spreadsheet?")
    print("🤖 Chatbot:", answer)
    
    # Test the original query
    answer = chatbot("What is the price of Product A in tab 'Electronics'?")
    print("🤖 Chatbot:", answer)