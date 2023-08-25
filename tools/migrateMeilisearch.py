import meilisearch
import json
import os
from dotenv import load_dotenv

load_dotenv()

client = meilisearch.Client(os.getenv("MEILISEARCH_HOST"), os.getenv("MEILISEARCH_API_KEY"))


indexes = ["Stories", "User", "Tags", "Category"]

for index in indexes:

    client.index(index).update(primary_key="id")

    with open(f"{index}.json", encoding='utf-8') as file:
        data = json.load(file)
        process = client.index(index).add_documents(data)
        print(process)
