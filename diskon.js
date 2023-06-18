<script type="text/javascript">
    function setNextDiskonSchedule(stringDate, stringTime) {
        var dateComponents = stringDate.split("-");
        var isoDate = dateComponents[2] + "-" + dateComponents[1] + "-" + dateComponents[0] + "T" + stringTime + ":00";
    
        $('#next-match').html(stringDate + " " + stringTime);
        $('.countdown').countdown({
            date: isoDate
        }, function() {
            $('.countdown').text('NANTIKAN DISKON HARI INI');
        });
    }
    

    function getNextDiskonDate(nextDate, nextHourMinute) {
        var today;
        if (nextDate == "") {
            today = new Date();
        } else {
            console.log("next is not empty!")
            today = new Date(nextDate)
        }
    
        console.log("today = ", today)
    
        var nextHour = nextHourMinute.split(":")[0]
        var nextMinute = nextHourMinute.split(":")[1]
    
        console.log("nextHour = ", nextHour)
        console.log("nextMinute = ", nextMinute)
    
        var currentHour = today.getHours()
        var currentMinute = today.getMinutes()
    
        console.log("currentHour = ", currentHour)
        console.log("currentMinute = ", currentMinute)
    
        if ((currentHour > nextHour) || (currentHour == nextHour && currentMinute > nextMinute)) {
            today.setDate(today.getDate() + 1);
        }
    
        var year = today.getFullYear()
        var month = today.getMonth() + 1
        var day = today.getDate()
    
        if (month < 10) {
            month = "0" + month;
        }
    
        if (day < 10) {
            day = "0" + day;
        }
    
        var dmy = day + "-" + month + "-" + year;
        return dmy;
    }

    function getNextDiskonTime(stringTime) {
        splitTime = stringTime.split(":");
        if (splitTime.length > 1) {
            return stringTime
        }
        return stringTime + ":00"
    }

    jQuery(document).ready(function() {
        // ambil dari views.py
        var stringNextSchedule = ""
        var stringHourMinute = "21:00"
    
        var stringDate = ""
    
        if (stringNextSchedule !== "") {
            var splitString = stringNextSchedule.split(" ");
            stringDate = splitString[0]
            if (splitString.length > 1) {
                stringHourMinute = splitString[1];
            }
        }
        console.log("stringDate: ", stringDate)
        console.log("stringHourMinute: ", stringHourMinute)
    
        var NextDiskonTime = getNextDiskonTime(stringHourMinute)
        console.log("NextDiskonTime: ", NextDiskonTime)
    
        //ambil String Date dari views.py kalau kosong default besok
        var NextDiskonDate = getNextDiskonDate(stringDate, NextDiskonTime)
        console.log("NextDiskonDate: ", NextDiskonDate)
    
        setNextDiskonSchedule(NextDiskonDate, NextDiskonTime)
    }); 
