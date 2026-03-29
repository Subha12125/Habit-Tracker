const { model } = require("mongoose");

const streakCalculator = ( log ) => {
    if( !log || log.length === 0 ) return 0

    // Filterd completed logs and sort by date
    const completedDates = [...new Set(log
        .filter(log=> log.status === "completed")
        .map(log => new Date(log.date).setHours(0,0,0,0)) // Normalize to start of day
    )].sort((a,b) => b - a) // Sort in descending order

    let streak = 0;
    let checkDate = new Date().setHours(0,0,0,0) // Start from today

    for(let date of completedDates) {
        if ( date === checkDate ){
            streak++;
            checkDate -= 24 * 60 * 60 * 1000 // Move to previous day
        }
        else if ( date < checkDate ) {
            break;
        }
    }
    return streak;
}

module.exports = { streakCalculator }