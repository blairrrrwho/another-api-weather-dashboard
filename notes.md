Converting dt object from an API call to JS date object: 
-- Stack Overflow solution --

    I found the answer.
We can convert to dt object to JS date object. Like this.

The tricky part is we have to convert day object to string.

    const dt = 1610685149
    
    var day = new Date(dt*1000);
    
    console.log(day.toUTCString()) // 'Fri, 15 Jan 2021 04:32:29 GMT'
    console.log(day.toDateString()) // 'Fri Jan 15 2021'
    console.log(day.toISOString()) // '2021-01-15T04:32:29.000Z'
    console.log(day.toString()) // 'Fri Jan 15 2021 07:32:29 GMT+0300 (GMT+03:00)'
I found the answer from here w3schools.com display dates

End of the day, I implement this solution to my code just like this.

function createDate(dt, type) {
        var day = new Date(dt * 1000);
        if (type == "long") {
            let options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            return day.toLocaleString("en-us", options); // Friday, January 15, 2021
        } else {
            return day.toLocaleString("en-us", { weekday: "long" }); // Friday
        }
    }



TODO: 

- get items from local storage and have them become buttons in the search history side bar; clickable
- have the page preload to something so it's not blank
- UV index??
- style the shit out of it 
- i think everything is technically working.......... but we want media queries and everything right in there
- check and make sure the api calls are not the outdated ones 