// KPR Script file

var pwmFrequency = 20;
var pulseWidth = 1.1;
var repeat = pwmFrequency - pulseWidth;


exports.pins = {
    motorPWM: {type: "Digital", direction: "output"},
    motor2: {type: "Digital", direction: "output"}    
};

exports.configure = function() {
    this.motorPWM.init();
    this.motor2.init();
}
/*
exports.pulse = function(){
	var pulse1 = 1.5;
	var pulse2 = 1.4;
	var inter = pulse1-pulse2;
	repeat = pwmFrequency - pulse1;
	
	for(var i = 0;i<50;i++){
    	this.motorPWM.write(1);
    	this.motor2.write(1);
    	sensorUtils.udelay(pulse2 * 1000);
    	
    	this.motor2.write(0);
    	sensorUtils.udelay(inter * 1000);
    	
    	this.motorPWM.write(0);
    	sensorUtils.udelay(repeat * 1000);    	
    }
	/* 
    this.motorPWM.write(1);
    sensorUtils.udelay(pulseWidth * 1000);
    this.motorPWM.write(0);
    
}
*/
exports.pulse221 = function(pw){

	pulseWidth = pw;
	repeat = pwmFrequency - pw;
	
    this.motorPWM.write(1);
    sensorUtils.udelay(pulseWidth * 1000);
    this.motorPWM.write(0);
    sensorUtils.udelay(repeat * 1000);
    
}
exports.pulse222 = function(pw){

	pulseWidth = pw;
	repeat = pwmFrequency - pw;
	
	this.motor2.write(1);
    sensorUtils.udelay(pulseWidth * 1000);
    this.motor2.write(0);
    sensorUtils.udelay(repeat * 1000);
}
/*
exports.pulse2 = function(pw){
	pulseWidth = pw;
	repeat = pwmFrequency - pw;
	for(var i = 0;i<50;i++){
    	this.motorPWM.write(1);
    	sensorUtils.udelay(pulseWidth * 1000);
    	this.motorPWM.write(0);
    	sensorUtils.udelay(repeat * 1000);
    }
}
exports.pulse22 = function(pw){
	pulseWidth = pw;
	repeat = pwmFrequency - pw;
	for(var i = 0;i<50;i++){
    	this.motor2.write(1);
    	sensorUtils.udelay(pulseWidth * 1000);
    	this.motor2.write(0);
    	sensorUtils.udelay(repeat * 1000);
    }
}
*/
exports.close = function() {
	this.motorPWM.close();
	this.motor2.close();
}