## Debug Log

1.  Error: ENOSPC: System limit for number of file watchers reached, watch '/home/andante-moss/Documents/datavisu/public'

to solve, `nano /etc/sysctl.conf` to configure max number of file watchers in vscode

```
fs.inotify.max_user_watches=524288
```


2. capitalisation / casing of items

Faced an error, where JavaScript compiler stated that the casing was wrong
![Screenshot from 2021-03-03 14-09-51.png](:/630771580df24edebd2357407621a69a)
Similarly, the vairable name "discolored" in vsCode, indicating that it was no longer used in the scope of the function.
## Learning Points

* * *
===
### React Specific

#### 1\. Importance of refactoring React Application

One way of refactoring is to split the codebase into multiple segments:

```
src
|
|--- App.js
|--- AxisBottom.js
|--- AxisLeft.js		

```

In each file eg. `AxisBottom.js` and `AxisLeft.js`

- Using the `export default` method
    
    - ```js
          export default(props,strokeWidth) => (
          	...
            );
        ```
    - However, this means there is no way to add multiple default exports in react
- Using the `export default` at the bottom. Good if there is only one export
    
    - ```js
        const BackgroundColor = (props,strokeWidth) => (
            ...
          );
        export default BackgroundColor;
        ```
- Using the `export` keyword at the front
    
    - ```js
          export const BackgroundColor = (props,strokeWidth) => (
          	...
            );
        ```

Another way is to keep legacy code / other functionality in another folder

```
src
|
|--- App.js
|--- AxisBottom.js
|--- AxisLeft.js	
|--- Old_Version
|	   |
|	   |-- Blah_oldfile.js
```

Also take note that each `return` function in a export can only export one "element". To export multiple items in a return, use the following `JSX` syntax.
```js
  export const BackgroundColor = (props,strokeWidth) =>(
	return (
	  <>
	  	<Feature1/>
	  	<Feature2/>
	  </>
  	));
```


#### 2\. [Using React Properties to access elements](https://reactjs.org/docs/components-and-props.html)


#### 3\. [Using react keys](https://reactjs.org/docs/lists-and-keys.html)
> Keys help React identify which items have changed, are added, or are removed.
- Basically elements should have unique identifier, if there are many of them; such as in a list

#### 4. `scaleLinear()` and `scaleBand()`

- scaleLinear creates a function which can be used to scale values into visual elements

- scaleBand creates a function which can be used to converts a list of items into a numerical range.
	- eg. ["Very Poor","Poor","Neutral","Good","Excellent"] -> [10,20,30,40,50] 

#### 5. Unary Plus Operator

- evaluates the "operand" into a number if it is not already

#### 6. React `maps()`
This is similar to python's functional programming feature - map
```js
const halvedNumbers = numbers.map(num => {   
    return (num * 2);   
});  
```
You can also create static functions in react 
```js
const yValue = d => d.sepal_width;
```

#### 7. Transform (or translate) SVGs using group elements
jsx code group elements
```jsx
<g transform={`translate(${variable1},${variable2})`}>
	<element/>
</g>
```

===
### General Tips regarding visualisation


#### Natural ordering of attributes

- 3 main ways of organizing 
	- categorical (distinct categories)
	- ordinal (have an inherent order/spectrum) 
	- quantitative (continuous distribution)
- ![Screenshot from 2021-03-02 15-35-39.png](:/8e21196f870741f2948f82b785d7fddc)
    - this does not make sense as year is a ordered attribute, but the colors make it look like a categorical attribute
    - makes more sense to mark year by luminance
- "get it right in black and white"
- areas to represent multiple things (cumulative chart differentiated by color) --> evolved to steam graph for better visualisation