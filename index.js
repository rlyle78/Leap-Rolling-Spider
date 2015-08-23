/**
 * cylon-rolling-spider example
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Chris Taylor
 * Licensed under the MIT License (MIT).
 */

'use strict';

var Cylon = require('cylon');
Cylon.robot({

	connections: {

		/*
		 * Remember to change the uuid to your own devices uuid
		 */
		
		/*'rolling-spider': {adaptor: 'rolling-spider', uuid: 'd2edda91562142e988ffcb4a595f8cd9'},*/
		
		'rolling-spider': {adaptor: 'rolling-spider', uuid: 'd2edda91562142e988ffcb4a595f8cd9' },
		'leap': { adaptor: 'leapmotion' }
	},

	devices: {
		drone: {driver: 'rolling-spider'},
		leapmotion: { driver: 'leapmotion' }
		
	},

	work: function (my) {
/*
		my.drone.wheelOn();
		my.drone.flatTrim();
		
		my.drone.wheelOn();

		my.drone.flatTrim();

		my.drone.takeOff();

		after(2500, function () {

			my.drone.land();

			after(1500, function () {

				Cylon.halt();

			});

		});
*/		
		
		my.leap.on('frame', function(frame){
			/*console.log('frame');*/
			if(frame.hands.length > 0){
				my.drone.takeOff();
				/*console.log('take off');*/
			} else {
				my.drone.land();
				/*console.log('land');*/
			}

			if(frame.valid && frame.gestures.length > 0){
				frame.gestures.forEach(function(g){
					if(g.type == 'swipe'){
						var currentPosition = g.position;
						var startPosition = g.startPosition;

						var xDirection = currentPosition[0] - startPosition[0];
						var yDirection = currentPosition[1] - startPosition[1];
						var zDirection = currentPosition[2] - startPosition[2];

						var xAxis = Math.abs(xDirection);
						var yAxis = Math.abs(yDirection);
						var zAxis = Math.abs(zDirection);

						var superiorPosition  = Math.max(xAxis, yAxis, zAxis);

						if(superiorPosition === xAxis){
							if(xDirection < 0){
								console.log('LEFT');
								my.drone.left({steps: 1});
							} else {
								my.drone.right({steps: 1});
								console.log('RIGHT');
							}
						}

						if(superiorPosition === zAxis){
							if(zDirection > 0){
								console.log('BACKWARDS');
								my.drone.backward({steps: 1});
							} else {
								console.log('FORWARD');
								my.drone.forward({steps: 1});
							}
						}

						if(superiorPosition === yAxis){
							if(yDirection > 0){
								console.log('UP');
								my.drone.up({steps: 1});
							} else {
								console.log('DOWN');
								my.drone.down({steps: 1});
							}
						}
					} else if(g.type === 'keyTap'){
						my.drone.backFlip();
						after((5).seconds(), function(){
							my.drone.land();
							console.log('land');
						})
					}
				})
			}
		})
	}

}).start();
