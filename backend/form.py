from credential_handler import get_creds
from googleapiclient.discovery import build
# Removed the unused import statement

FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf_PxjOg8gNViPrVU2BcpyHJ7dc8k1l4LyQ8ykSlqj8fMomKw/viewform?usp=sf_link"  
FORM_ID = "1z1gSbypa9DpGgThq1D-JveOc2Py__Rzr309bFZTmYR4"
DISCOVERY_DOC = "https://forms.googleapis.com/$discovery/rest?version=v1"


def  get_responses():
    """Gets the questions from the form."""
    creds = get_creds()
    service = build('forms', 'v1', credentials=creds, discoveryServiceUrl=DISCOVERY_DOC, static_discovery=False)
    form =  service.forms().responses().list(formId=FORM_ID).execute()
    return form

def get_questions():
    """Gets the questions from the form."""
    creds = get_creds()
    service = build('forms', 'v1', credentials=creds, discoveryServiceUrl=DISCOVERY_DOC, static_discovery=False)
    form =  service.forms().get(formId=FORM_ID).execute()
    return form