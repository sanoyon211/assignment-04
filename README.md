1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

   Ans: getElementById – Selects a single element by its ID. Fastest method.
        getElementsByClassName – Selects all elements by class name. Returns a live HTML Collection(auto-updates when DOM changes).
        querySelector – Accepts any CSS selector, returns the first matching element.
        querySelectorAll – Accepts any CSS selector, returns all matching elements as a static NodeList (does not auto-update).


        getElementById only select id and return Single element.
        getElementsByClassName select class only and return Live HTMLCollection.
        querySelector select any css and return single element.
        querySelectorAll select any css and return staticNodeList.


2. How do you create and insert a new element into the DOM?


   Ans: Creating and Inserting a New Element into the DOM
   
        Step 1 – Create the element
                 const div = document.createElement('div');
   
        Step 2 – Add content
                 div.textContent = 'Hello World';
                 div.className = 'card';
                 div.id = 'myDiv';

        Step 3 – Insert it into the DOM
                 const parent = document.getElementById('container');

                 parent.appendChild(div);


3. What is Event Bubbling? And how does it work?

  
   Ans:  When an event is triggered on an element, it first runs on that element, then bubbles up to its parent, grandparent, and so on — all the way up to the document.
        
        How it works:
        Suppose we have this structure:
        Grandparent > Parent > Button
        When the Button is clicked, the event fires in this order:
        
        Button
        Parent
        Grandparent
        
        So the event travels upward from the clicked element to the top.
        
        Stopping Bubbling:
        We can stop the event from bubbling up using stopPropagation().
        jsbtn.addEventListener('click', (e) => {
          e.stopPropagation();
        });


       Bubbling            --->      Event travels from child -> parent -> document
       stopPropagation()   --->      Stops the bubbling
       e.target            --->      The element that was originally clicked



4. What is Event Delegation in JavaScript? Why is it useful?

  Ans: Event Delegation in JavaScript---
       Event Delegation is a technique where instead of adding event listeners to each child element individually, we add a single event listener to the parent. When a child is               clicked, the event bubbles up to the parent and is handled there.

      Why is it Useful?
          1. Works for dynamically added elements:
          If new buttons are added to the DOM later, the parent listener will still catch their events — no need to add new listeners.
          2. Better performance:
          One listener on the parent is much more efficient than hundreds of listeners on each child.
          3. Less memory usage:
          Fewer event listeners mean less memory consumption.




5. What is the difference between preventDefault() and stopPropagation() methods?

  Ans:
     preventDefault() vs stopPropagation()

      preventDefault():
      Stops the default behavior of the browser for that element. It does NOT stop the event from bubbling up.
      Common examples:
      
      Prevents a form from submitting
      Prevents a link from navigating to another page
      Prevents a checkbox from being checked
      
      So basically, whatever the browser would normally do when you interact with an element — preventDefault() stops that action.
      
      stopPropagation():
      Stops the event from bubbling up to parent elements. It does NOT stop the default behavior.
      For example, if you click a button inside a div, normally the click event would fire on the button first, then bubble up to the div. Using stopPropagation() on the button will         prevent the event from reaching the div.
      
      Key Difference:
      These two methods solve completely different problems. preventDefault() is about stopping the browser's action, while stopPropagation() is about stopping the event's journey           through the DOM.
      You can also use both together when you want to stop both the default behavior and the bubbling at the same time.
