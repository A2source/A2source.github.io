function formatDate(dateString)
{
    const Months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
    };

    const Suffix = {
    0: 'th',
    1: 'st',
    2: 'nd',
    3: 'rd',
    4: 'th',
    5: 'th',
    6: 'th',
    7: 'th',
    8: 'th',
    9: 'th'
    }

    var split = dateString.split('-');

    // year is just number
    var year = Number(split[0]);

    // grab month name from the enum
    var month = split[1];
    if (month.startsWith('0')) month = month.substring(1);
    month = Object.values(Months)[Number(month) - 1];

    // grab day number
    var day = split[2]
    if (day.startsWith('0')) day = day.substring(1);
    day = Number(day);

    // use day number to put correct suffix after number. mod 10 gets the last digit.
    var suffix = Object.values(Suffix)[day % 10];

    return `${month} ${day}${suffix}, ${year}`;
}