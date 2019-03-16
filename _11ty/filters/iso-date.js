const { DateTime } = require("luxon");

module.exports = function (dateObj) {
    // 2019-02-06
    return DateTime.fromJSDate(dateObj).toISODate();
};