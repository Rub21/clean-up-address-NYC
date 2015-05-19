# Clean up specialco adrees(A,B) in NYC

## 
I've done a script to make URLs from all places where is a special-co(A,B) address.

I did a grid for  special-co-A

https://github.com/Rub21/clean-up-address-NYC/blob/master/grid-a-NYC.geojson

and special-co-B

https://github.com/Rub21/clean-up-address-NYC/blob/master/grid-b-NYC.geojson

and to get all URLS, run the nex script

## How to run

`git clone https://github.com/Rub21/clean-up-address-NYC.git`

`cd clean-up-address-NYC`

`npm install`

- `node index.js --csvfile=a.csv --geofile=grid-a-NYC.geojson`

- `node index.js --csvfile=b.csv --geofile=grid-b-NYC.geojson`

*it will be create a files called:*

- a-urls-1.csv,a-urls-2.csv ...


- b-urls-1.csv,b-urls-2.csv ...


Copy the text from each csv file and paste in a ticked. 


now click in one of then URL in ticked.  will be download the especial-co (A) and special-co(B) in JOSM.

and use the next maps in backgroud to fix the adress.

- special-co(A)

`https://b.tiles.mapbox.com/v4/ruben.b62d31b1/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicnViZW4iLCJhIjoiYlBrdkpRWSJ9.JgDDxJkvDn3us36aGzR6vg`

- special-co(B)

`https://a.tiles.mapbox.com/v4/ruben.61efb1aa/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicnViZW4iLCJhIjoiYlBrdkpRWSJ9.JgDDxJkvDn3us36aGzR6vg`



# How to work

- If the url download poins as adrees, remove these points and upload the change

- If the url download buildings as way or relation, remove  the tag `addr:housenumber` and `addr:street` and upload the change

- If the URL does not give you any data,, it is because is not any special-co (A,B) address in that place.
