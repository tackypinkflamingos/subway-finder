var fs  = require('fs');

module.exports = {
  // agency: makeObjSync('gtfs/google_transit/agency.txt'),
  // calendar: makeObjSync('gtfs/google_transit/calendar.txt'),
  // calendar_dates: makeObjSync('gtfs/google_transit/calendar_dates.txt'),
  // routes: makeObjSync('gtfs/google_transit/routes.txt'),
  // shapes: makeObjSync('gtfs/google_transit/shapes.txt'),
  // stop_times: makeObjSync('gtfs/google_transit/stop_times.txt'),
  // transfers: makeObjSync('gtfs/google_transit/transfers.txt'),
  // trips: makeObjSync('gtfs/google_transit/trips.txt'),
  stops: makeObjSync('gtfs/google_transit/stops.txt')
}

function makeObjSync(fileName) {
  var retAry = [];
  var isHeader = true;
  var headers = [];
  fs.readFileSync(fileName).toString().split('\n').forEach(function (line) {
    if(line == "") return;  // if last line is blank
    line = line.trim(); // remove possible /r
    var lineData = line.split(',');
    if(isHeader) {
      headers = lineData;
      isHeader = false;
      return;
    }
    var obj = {};
    lineData.forEach(function(element, x) {
      obj[headers[x]] = element;
    });
    retAry.push(obj);
  });
  return retAry;
}

function makeObj(fileName) {
  var rl = require('readline').createInterface({
    input: require('fs').createReadStream(fileName)
  });
  var retAry = [];
  var isHeader = true;
  var headers = [];
  rl.on('line', function (line) {
    var lineData = line.split(',');
    if(isHeader) {
      headers = lineData;
      isHeader = false;
      return;
    }
    var obj = {};
    lineData.forEach(function(element, x) {
      obj[headers[x]] = element;
    });
    retAry.push(obj);
  });
  return retAry;
}