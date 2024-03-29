 
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

Value in dataframe
```python
df.loc[df['x']=='x']['x'] = y # change values
df.iloc[indx]['init'] # get certain value
```
Drop in dataframe
```python
df = df.dropna() #dropna
df = df.drop_duplicates() # drop duplicate
df = df.drop([1]) # drop row index
df = df.drop(columns = ['x']) # drop columns
```
remove duplicate
```python
df.drop_duplicates()
```

Reset dataframe index
```python
df = df.reset_index(drop = True)
```
Add row in dataframe
```python
df2 = pd.dataframe(columns:['1', '2']) ## create dataframe with no value
df1.append(df2, ignore_index=False)
```
Sort dataframe values
```python
dfr.sort_values(by=['Total Survive Percent'], ascending=False) # ascending False decreasing, True increasing
```



Replace substring
```python
string = 'Sa,Lo,Cl/Lo'
string.replace('/',',').split(',)
# result = ['Sa', 'Lo', 'Cl', 'Lo']
```