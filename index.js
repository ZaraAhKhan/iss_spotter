// const { fetchMyIP, fetchCoordsByIP,fetchISSFlyOverTimes} = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP('72.137.62.99',(error,data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("The coords are", data);
// });

// fetchISSFlyOverTimes({ latitude:43.783 , longitude: -79.4122 },(error,data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log(data);
// });

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (let time of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);

  }
});