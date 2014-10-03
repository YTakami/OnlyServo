// KPR Script file
var pwmFrequency = 20;
//pulsewidth
//it will stop on 1.3(1300ms)
var pulse1 = 1.1;
var pulse2 = 2.0;
var repeat = pwmFrequency - pulseWidth;

/*
require: "name of .js"
pis:{
	variable'name in .js: {pin: number },
}
*/
application.invoke(new MessageWithObject("pins:configure", { 
	motor:{
		require: "servo",
        pins:{
        	motorPWM: {pin: 4},
        	motor2: {pin: 6}
		}
	}
}));

var servostate = false;
var rotate = false;

/*
class
one container needs to have one class(behavior) 
*/
var Panel = function () {
}
Panel.prototype = Object.create(Object.prototype, {
	//to use onTouchBegan, container must be active = true
	onTouchBegan: {
		value: function(p) {
			if(!servostate){
				servostate = true;
                //p.interval = pwmFrequency - pulseWidth;
                p.interval = 3000;//the interval to call onTimeChanged function
                p.start();
                rotate = true;
                p.first.string = "rotating";
                //100*20ms = 2000ms
				//change it according to interval
                for(var x=0;x<100;x++){
            		application.invoke(new MessageWithObject("pins:/motor/pulse1", pulse1));
            		application.invoke(new MessageWithObject("pins:/motor/pulse2", pulse2));
            	}
            }
            else{
                servostate = false;
                rotate = false;
                p.stop();
                p.first.string = "stop";
                for(var x=0;x<50;x++){
            		application.invoke(new MessageWithObject("pins:/motor/pulse1", 1.3));
            		application.invoke(new MessageWithObject("pins:/motor/pulse2", 1.3));
            	}
            }
		}
	},
	onTimeChanged:{
		value: function(p){
			rotate = !rotate;
            if(rotate) {
            	p.first.string = "rotating";
            	//application.invoke(new MessageWithObject("pins:/motor/pulse"));
            	for(var x=0;x<50;x++){
            		//application.invoke(new MessageWithObject("pins:/motor/pulse221", pulseWidth));
            		//application.invoke(new MessageWithObject("pins:/motor/pulse222", pulse2));
            	}
            }
            else {
            	p.first.string = "pause";
            	
            	for(var x=0;x<50;x++){
            		//application.invoke(new MessageWithObject("pins:/motor/pulse221", 1.3));
            		//application.invoke(new MessageWithObject("pins:/motor/pulse222", 1.3));
            	}
            }         
		}
	},
});
var build = function(container) {
	container.skin = new Skin("blue");
	var p = new Container({left:80,top:80, bottom:80,right:80 },new Skin("red"));
	p.active = true;// to call onTouchBegan
	p.behavior = new Panel();
	var te = new Style("bold 50px", "green");
	var label = new Label(null, null, te, "rotate");
	p.add(label);
	container.add(p);
}

application.behavior = {
	onAdapt: function(application) {
		application.empty();
		build(application);
	},
	onLaunch: function(application) {
		build(application);
	},
}
