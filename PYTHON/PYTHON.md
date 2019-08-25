 
 Get API return values e.g. https://trefle.io/reference#tag/Species
 ```python
    import requests
    payload = {'id': 123} # change to {'q': 'acinacea'} if finding specific plant
    headers = {'content-type': 'application/json',
                'Authorization': 'NDdUcFg4SnVNbXlXcHFXTGZweUVJdz09'}
    r = requests.get('https://trefle.io/api/plants', headers = headers, params=payload)
    json.loads(r.text) # return json format
    # print(r.status_code) # print code 200 works good; 404 fake request; 400 something wrong
 ```

Get each row and index:
```python
    for index, row in df.iterrows():
        ### get each row and index 
```

Replace substring
```python
string = 'Sa,Lo,Cl/Lo'
string.replace('/',',').split(',)
# result = ['Sa', 'Lo', 'Cl', 'Lo']
```
Drop NA in dataframe
```python
df = df.dropna() #dropna
```
Reset dataframe index
```python
df = df.reset_index(drop = True)
```