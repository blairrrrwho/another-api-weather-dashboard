- get items from local storage and have them become buttons in the search history side bar; clickable
- have the page preload to something so it's not blank
- UV index??
- style the shit out of it 
- 

# Open Weather API Calls: 

## 5 Day / 3 Hour API Call: 
api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

Parameters
lat, lon    	required	
        Geographical coordinates (latitude, longitude). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API.

appid	        required	
        Your unique API key (you can always find it on your account page under the "API key" tab)

units	        optional
        Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

mode	        optional	
        Response format. JSON format is used by default. To get data in XML format use mode=xml. Learn more

cnt	            optional	    
        A number of timestamps, which will be returned in the API response. Learn more

units	        optional	
        Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

lang	        optional	 
        You can use the lang parameter to get the output in your language.



## Direct Geocoding API Call:
http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

Parameters:

q	        required	        City name, state code (only for the US) and 
                                country code divided by comma. Please use ISO 3166 country codes.

appid	    required	        Your unique API key (you can always find it on your account 
                                page under the "API key" tab)

limit	    optional	        Number of the locations in the API response 
                                (up to 5 results can be returned in the API response)

















API number 2:


Built-in API request by city name
You can search weather forecast for 5 days with data every 3 hours by city name. All weather data can be obtained in JSON and XML formats.

API call

api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}