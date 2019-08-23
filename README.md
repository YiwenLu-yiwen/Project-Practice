# IE Funny
 
 Get API return values e.g. https://trefle.io/reference#tag/Species
 ```python
    import requests
    payload = {'id': 123}
    headers = {'content-type': 'application/json',
                'Authorization': 'NDdUcFg4SnVNbXlXcHFXTGZweUVJdz09'}
    r = requests.get('https://trefle.io/api/kingdoms', headers = headers, params=payload)
    json.loads(r.text) # return json format
    # print(r.status_code) # print code 200 works good; 404 fake request; 400 something wrong
 ```
