import meilisearch
import os
from dotenv import load_dotenv

load_dotenv()

client = meilisearch.Client(os.getenv("MEILISEARCH_HOST"), os.getenv("MEILISEARCH_API_KEY"))

key = client.create_key(options={
  'description': 'Search Key',
  'actions': ['search', 'indexes.get', 'documents.get', 'version'],
  'indexes': ['*'],
  'expiresAt': None
})

print(key)

