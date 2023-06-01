<!-- 
I am Kato isa creater of simplify.js
Adress: Uganda, Kampala, Sseguku/Fort.
webste: https://katoisa256.ga.
google: katoisa256.
whatsApp: +256705207718.
I mainly use whatsApp, coz its easy for me to comunicate with people.
If you wanna become a contributer or wnna work on sme other.
Project contact methrough whatsApp ....
 -->

# How to use Simplify.js? and how it works?
Imagine of simplify.js as a big object that has functions for properties, each fucntion has its own task,
more like shortening thie javascript syntax.

What is simplify.js? | how it came to be?
Well I was tired of thie JavaScript Syntax and how it looked, coz I have spent 5 years writing in thie same syntax, I kind of got bored by seeing one long function being repeated every time.
So I decided to tweak the syntax a little bit, I came up with simplify.js a JavaScript library that not only changes the syntax but simplifies it instead of writing a long JavaScript function to add an event listener why not use a short function that takes in three parameters.
Well simplify.js takes care of the boring stuff for you and helps u create organized code.
For example: in normal JavaScript we would write:
```js  
1. Document.querySelector(‘body’).addEventListener(‘load’, () => {
2. 
3. Alert(‘this is hell’);
4. 
5. });
```
What the heck, imagine having 100 or more blocks of code like that flooding your code, it’s a pain right.
simplify.js code Example: instead of writing all of that simplify breaks down thie block

```js
1. _.Event(‘body’, ‘load’, ()=>{
2. 
3. Alert(‘simplify.js is heaven’);
4. 
5. });
```
# A number of functions u can use are all listed bellow ...

  ## The Select function: substitute to document.querySelector. <!-- document.querySelector('body') -->
     its simple as writing ABC;
     you can sate it to a vraible or use it just thie way it is.

     It has two parameters, thie |element| and |MultiElements|

     |element| --- thie selscted html element.
     |MultiElements| --- Selector for multi elements.

     Simplify.js looks through your code and checks each parameter.
     For the first parameter.
     |element| simplify.js will chake the last parameter which is 
     a boolean to see if it has been initialised and has been sae to true
     then it will iterate through all elements in thie DOM that are in thie simmilar to
     thie one sate in thie first parameter
     
     
   ### ways of Implementing it.
```js
   0. //for single elements
   1. _.Select('body'); // u can do that
   2. let eleemnt = _.Select('body') // or store it in a variable 
   3. 
   4. // For iterating through elements 
   5. let body = _.Select('body');
   6. _.Select(body, true); // you must sate it to true if iyou want to select mutiple elements -->
```
  ## The Each function: substitute to forEach <!-- document.querySelector('span').forEach(f =>{ ... }) -->
     It has three parameters, thie |element| and |AssignedName| and |Type|

    |element| --- thie selscted html element.
    |AssignedName| --- type of data in the element parameter.
    |Type| --- type of data type stored in |element| parameter.
     Simplify.js expects to find two data Types a string or variable 
     so it checks to see if or weather the parameter is a string or variable.

     Javascript will through an error if the parameter is not
     a string.
     In order to stop this error u need to let simplify.js know
     that the first parameter is not a string.
     By sating thie last parameter |MultiElements| to true.
     Look down for code examples.

    # ways of Implementing it
  ```js
      1. _.Each('span', f =>{
      2.    ....
      3. });
      4. // same as last function it contains a boolean which must be sate to true if the lement is not a string-->
      5. _.Each(el, f =>{
      6.    ....
      7. }, true);
  ```
  ## The Print function: substitute for console.log
     Why not have a little fun with thie new console.log() substitute
     It besically simple as used in python thie only defference wiyth python 
     is that u have add (_.) simplifies's main object core to it,
     its not much buh its cool
    # ways of Implementing it
  ```js
    1. // its this simple --> 
    2. _.Print(value);
    3. // simple right? -->
  ```
  ## Event function: substuting eventListener
    Its kinda tricky buh easy when u get ur head around thie booleans
    I mean thie True and false that appear at thie end of thie function

    It has four parameters, /element/ /EventType/, /Task/, /Type/
    /element/ --- HTML element selected.
    /EventType/ -- type of event ('click', 'load', 'scroll' etc ...);
    /Task/ -- well this main function were all ur code goes.
    /Type/ -- boolean, with an intial value(False).
    
    type of data type stored in /element/ parameter.
     Simplify.js expects to find two data Types a string or variable 
     so it checks to see if or wether the parameter is a string or variable.

     Javascript will through an error if the parameter is not
     a string.
     In order to stop this error u need to let simplify.js know
     that the first parameter is not a string in order for simplify
     to stop thie error thrown by javascript.

     By sating thie last parameter /type/ to true.
     Look down for code examples.
   # ways of implimate it.
   ```js
     0. //- here we sate the last parameter to true -->
     1. _.Event(htmlElement, 'Event type(click..etc)', ()=>{
     2.   code goes here .....
     3.  }, true); 
     4.   //-here we dont initialize thie parameter, you can sate it to false or just leave it-->
     5. _.Event('htmlElement', 'Event type(click..etc)', ()=>{
     6.  // code goes here .....
     7.  });
  ``` 
  ## The EventAll function: substitute of event listener iteration
     Its not defferent from its sibbling, Event thie only defference is
     that it iterates through HTML elements.

     If u dint get that: It selects multi HTML elements
     As Event javascript also throuws an error if the element 
     parameter is not a string.

     at thie end of thie function we add a boolean(True) in
     order for Simplify.js to enable javascript to read thie 
     data thie varaible stores.

  # ways of implimating it
    ```js
      0. <!-- here we sate the last parameter to true -->
      1. _.EventAll(htmlElement, 'Event type(click..etc)', ()=>{
      2.   code goes here .....
      3.  }, true); 
      4.   <!--here we dont initialize thie parameter, you can sate it to false or just leave it-->
      5. _.EventAll('htmlElement', 'Event type(click..etc)', ()=>{
      6.   code goes here .....
      7.  });
    ```