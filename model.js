



// -- Model



function Session () {
    
  this.inProgress = false;
  this.report = null;





  this.start = function (gps) {
    if (this.inProgress) { throw new Error('already started'); }

    this.inProgress = true;



  };


  this.sample = function (bouy, wind) {
    if (!this.inProgress) { throw new Error('not started'); }

    var w = wind.sample(),
        b = bouy.sample();

    return {"windSpeedMetersPerSec": w.speed_ms,
            "windDirectionDeg": w.direction_deg,
            "swellDirectionDeg": b.swell_direction_deg,
            "swellPeriodSec": b.swell_period_s,
            "swellMeters": b.swell_m};
  };

  this.setDetails(report) {
    this.report = report;
   
  }
  
  this.end = function () {
    if (!this.inProgress) { throw new Error('not started'); }

    this.inProgress = false;

  };

}

Session.all = function () {
  return [];
};


// --


function Bouy (gps) {
  this.gps = gps;

  this.sample = function () {
    return {"swell_direction_deg": 0.0, "swell_period_s": 5, "swell_m": 1};
  };
}

Bouy.at = function (gps) {
  return new Bouy(gps);
}

Bouy.all = function () {
  return [];
}

// --

function WindDirection (gps) {
  this.gps = gps;

  this.sample = function () {
    return {"direction_deg": 0.0,
            "speed_ms": 0.0};
  }
}


WindDirection.at = function (gps) {
  return new WindDirection(gps);
}
