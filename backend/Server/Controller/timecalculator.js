function Timedifference(userTime, lastTime) {
   
    var userDate = parseTimeString(userTime);
    var lastDate = parseTimeString(lastTime);


    var timeDiff = lastDate.getTime() - userDate.getTime();

  
    if (timeDiff < 0) {
        timeDiff += 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    }

   
    var hours = Math.floor(timeDiff / (1000 * 60 * 60));
    var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${hours}h:${minutes}m:${seconds}s`
}

function parseTimeString(timeString) {
    // Split the time string into hours, minutes, seconds, and period (AM/PM)
    var parts = timeString.split(/:| /);
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);
    var seconds = parseInt(parts[2], 10);
    var period = parts[3];

   
    if (period === "PM" && hours < 12) {
        hours += 12;
    }

  
    var date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    return date;
}


// var userTime = "11:30:35 AM";
// var lastTime = "1:03:39 PM";
// var Timedifference = timeDifference(userTime, lastTime);


module.exports=Timedifference;
