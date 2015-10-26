var k_proxSensorCheck_ms = 100;

var proxSensor = {
    lastState: false,
    stateChangeCb: null,
    enable: function(stateChangeCb) {
    	if (navigator.proximity == null)
    	{
            console.log("DEBUG: Sensor unavailable");
    		console.dir(navigator);
    		return;
    	}
    	navigator.proximity.enableSensor();
    	navigator.proximity.getProximityState(null);
    	this.stateChangeCb = stateChangeCb;
    	setInterval(navigator.proximity.getProximityState(this.getStateCb), k_proxSensorCheck_ms);
    	console.log("DEBUG: Proximity on");
    },
    getStateCb: function(state) {
    	if (state != this.lastState) 
    	{
    		console.log("DEBUG: Proximity change: " + state);
    		if (this.lastState == 0)
                invokeFunc(this.stateChangeCb);
    	}
    	this.lastState = state;    	
    },
    disable: function() {
    	navigator.proximity.disableSensor();
        this.stateChangeCb = null;
    	console.log("DEBUG: Proximity off");
    }
};

