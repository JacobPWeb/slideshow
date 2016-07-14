	"use strict";
	
	var slideShow  = {
		totalSlides : 0,
		currentSlide : 0,
		slides: '',
		buttons: '',
		preventSlideChange: false,
		timer : 0,
		controlBtnCss: {width : "1em",height : "1em", borderRadius : "0.5em", float : "left", backgroundColor : "rgba(0,0,0,0.8)", margin : "0 0.2em", border: "black 1px solid", cursor : "pointer"},
		createControls : function(){
			
			var controls = document.createElement('div');
			controls.classList.add('controls');
			
			for(var i = 0, length = slideShow.totalSlides; i < length; i++){
				var btn = document.createElement('div');
				for(var css in slideShow.controlBtnCss){
					btn.style[css] = slideShow.controlBtnCss[css];
				}
				btn.setAttribute("data-jump-to-slide",i);
				btn.classList.add('controlBtn');
				controls.appendChild(btn);
			}
			
			document.getElementsByClassName("slideSelector")[0].appendChild(controls);
			},
		
		changeSlide: function(jumpToSlide){
			slideShow.slides[slideShow.currentSlide].classList.remove('active');
			if(!jumpToSlide){
				if(slideShow.slides[slideShow.currentSlide+1]){
					slideShow.slides[slideShow.currentSlide+1].classList.add('active');
					slideShow.currentSlide = slideShow.currentSlide+1;
					slideShow.setButtoncolor(slideShow.currentSlide);
				}else{
					slideShow.slides[0].classList.add('active');
					slideShow.setButtoncolor(0);
					slideShow.currentSlide = 0;
				}
			}else{
				slideShow.slides[jumpToSlide].classList.add('active');
				slideShow.currentSlide = parseInt(jumpToSlide);
				slideShow.setButtoncolor(parseInt(jumpToSlide));
				slideShow.preventSlideChange = true;
				setTimeout(function(){
					slideShow.preventSlideChange = false;
				},slideShow.timer);
			}
			
			},
		
		automate: function(timer){
			setTimeout(function(){
				if(!slideShow.preventSlideChange){
					slideShow.changeSlide();
					slideShow.automate(timer);
				}else{
					slideShow.automate(timer);
				}
			},timer);
			},
		setButtoncolor: function(noToSet){
			if(slideShow.buttons == ''){
				slideShow.buttons = document.getElementsByClassName('controlBtn');
			}
			var i;
			for(var i = 0, length = slideShow.buttons.length; i < length; i++){
				slideShow.buttons[i].style.backgroundColor = "#fff";
				slideShow.buttons[i].style.border = "black 1px solid";
			}
			for(var i = 0, length = slideShow.buttons.length; i < length; i++){	
				if(slideShow.buttons[i].getAttribute('data-jump-to-slide') == noToSet){
					slideShow.buttons[i].classList.add('btnActive');
					slideShow.buttons[i].style.backgroundColor = "rgba(0,0,0,0.4)";
					slideShow.buttons[i].style.border = "white 1px solid";
				}
			}
			},
		setEvents: function(){
			var controlBtn = document.getElementsByClassName('controlBtn');
			function changeSlideGetAttr(){
				for(var i = 0, length = controlBtn.length; i < length; i++){
					controlBtn[i].classList.remove('btnActive');
				}
				this.classList.add('btnActive');
				slideShow.changeSlide(this.getAttribute('data-jump-to-slide'));
			}
			for(var i = 0, length = controlBtn.length; i < length; i++){
				controlBtn[i].addEventListener('click',changeSlideGetAttr);
			}
			},
		init: function(options){
			slideShow.slides = document.getElementsByClassName('slide');
			slideShow.totalSlides = slideShow.slides.length;
			slideShow.currentSlide = options.startingSlide ? options.startingSlide : 0;
			window.console && console.log('Total Slides detected: '+slideShow.totalSlides, ' Starting Slide: '+slideShow.currentSlide);
			var userControls = document.getElementsByClassName('controls');
			if(options.controls && userControls.length == 0){
					slideShow.createControls();
			}
			slideShow.setButtoncolor(slideShow.currentSlide);
			slideShow.slides[slideShow.currentSlide].classList.add('active');
			if(options.auto){
				slideShow.timer = options.timer ? options.timer : 1000;
				slideShow.automate(slideShow.timer);
			}
			slideShow.setEvents();
			}
	};