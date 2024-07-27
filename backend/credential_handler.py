import os.path
from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

SCOPES = [
"https://www.googleapis.com/auth/forms.body.readonly",
"https://www.googleapis.com/auth/forms.responses.readonly",
]

def request_creds():
    """Reads the credentials from the file."""
    creds = None
    if os.path.exists('credentials.json'):
        flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
        creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
        return Credentials.from_authorized_user_file('token.json', SCOPES)
    else:
        print("Credentials file not found.")



def get_creds():
    """Gets the credentials from the file."""
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        return creds
    return request_creds()