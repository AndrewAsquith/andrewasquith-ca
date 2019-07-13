const { DateTime } = require("luxon");

module.exports = function (dateObj) {
    // February 2, 2019
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toLocaleString(DateTime.DATE_FULL);
};