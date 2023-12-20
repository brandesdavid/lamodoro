from bs4 import BeautifulSoup
import requests
import json

def get_links(base_url):
    links = []
    for staffel in range(1, 3):  # Loop through staffel 1 to 2
        for episode in range(1, 51):  # Loop through episode 1 to 50
            url = f"{base_url}/staffel-{staffel}/episode-{episode}"
            print(f"Connecting to: {url}")  # Print the URL before connecting
            try:
                response = requests.get(url, timeout=5)  # Set timeout to 5 seconds
                soup = BeautifulSoup(response.text, 'html.parser')

                for a_tag in soup.find_all('a'):
                    if a_tag.find('i', class_='icon Vidoza'):
                        href = a_tag.get('href')
                        if not href.startswith('http'):
                            href = 'https://aniworld.to' + href
                        links.append(href)
            except requests.exceptions.Timeout:
                print(f"Timeout occurred for URL: {url}")
                continue  # Skip to the next URL

    return links

# Test the function
base_url = 'https://aniworld.to/anime/stream/digimon-digital-monsters'
links = get_links(base_url)

# Save the links to a JSON file
with open('links.json', 'w') as f:
    json.dump(links, f)