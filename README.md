# slideshow
Slideshow i made to use on websites. I'll maintain it as i use it, feel free to commit if you like. I'll probably add more features as i need them, feel free to make a suggestion for features and i'll happily add.

To use the slideshow you need to:

Create the following code in your html file.
```
<div class="slideShow">
  <div class="slide">
    <!-- all of your slide content goes here-->
  </div>
  <div class="slideSelector"></div>
</div>
```
To invoke the slideshow you need to call the init function with certain parameters and pass in a javascript object.
```
<script>
	slideShow.init({
		'startingSlide':0,
		'auto' : false,
		'timer' : 10000,
		'controls' : true
		});
</script>
  ```
startingSlide (int) is which slide, in array format, you want the slideshow to start on.

auto (boolean) is whether or not the slideshow will automatically scroll.

timer (int) only has an effect if the auto option is set to true.

controls (boolean) is whether or not you want control buttons to be generated, so the user can navigate slides manually.
