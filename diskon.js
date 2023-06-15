function setNextDiskonSchedule(stringDate) {

            $('#next-match').html(stringDate);
            $('.countdown').countdown({
                date: stringDate
            }, function() {
                $('.countdown').text('NANTIKAN DISKON HARI INI');
            });
        }

        function getNextDiskonDate(nextDate, nextHourMinute) {

            if (nextDate == "") {
                today = new Date();
            } else {
                console.log("next is not empty!")
                today = new Date(nextDate)
            }

            console.log("today = ", today)

            nextHour = nextHourMinute.split(":")[0]
            nextMinute = nextHourMinute.split(":")[1]

            console.log("nextHour = ", nextHour)
            console.log("nextMinute = ", nextMinute)

            currentHour = today.getHours()
            currentMinute = today.getMinutes()

            console.log("currentHour = ", currentHour)
            console.log("currentMinute = ", currentMinute)

            if ((currentHour > nextHour) || (currentHour == nextHour && currentMinute > nextMinute)) {
                today.setDate(today.getDate() + 1);
            }

            year = today.getFullYear()
            month = today.getMonth() + 1
            day = today.getDate()

            if (month < 11) {
                month = "0" + month;
            }

            if (day < 11) {
                day = "0" + day;
            }

            ymd = year + "-" + month + "-" + day
            return ymd
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
            stringNextSchedule = ""
            stringHourMinute = "18:00"

            stringDate = ""

            if (stringNextSchedule !== "") {
                splitString = stringNextSchedule.split(" ");
                stringDate = splitString[0]
                if (splitString.length > 1) {
                    stringHourMinute = splitString[1];
                }
            }
            console.log("stringDate: ", stringDate)
            console.log("stringHourMinute: ", stringHourMinute)

            NextDiskonTime = getNextDiskonTime(stringHourMinute)
            console.log("NextDiskonTime: ", NextDiskonTime)

            //ambil String Date dari views.py kalau kosong default besok
            NextDiskonDate = getNextDiskonDate(stringDate, NextDiskonTime)
            console.log("NextDiskonDate: ", NextDiskonDate)

            NextDiskonSchedule = NextDiskonDate + " " + NextDiskonTime
            setNextDiskonSchedule(NextDiskonSchedule)

        }); 
