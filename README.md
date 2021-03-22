![Screenshot from 2021-03-22 16-22-14](https://user-images.githubusercontent.com/47784720/111960644-e476c700-8ae7-11eb-96a9-d4f85e88b8f3.png)


## First Things First
- Important to scan through data first


## Debug Log
> Problems encountered while building website

__1.  Error: ENOSPC: System limit for number of file watchers reached__

Solution: In Linux, open the file `/etc/sysctl.conf` (using a file editor of choice) to configure max number of file watchers in vscode as follows: 

```
fs.inotify.max_user_watches=524288
```
See https://stackoverflow.com/questions/62206460/jest-watch-error-enospc-system-limit-for-number-of-file-watchers-reached for more info.

__2. capitalisation / casing of items__

Faced an error, where JavaScript compiler stated that the casing was wrong
![image](https://user-images.githubusercontent.com/47784720/110766088-ba521900-824c-11eb-8ee1-4d1ad7ae5229.png)

Solution: React JSX Components should be Capitalised.

__3. Inputs must be enclosed in {} within the ()__
__4. Dropdowns cannot be placed within svgs__
__5. Application Lagging when trying to calculate intersection between `d3.curve` and line__
	- There are no built in features to calculate intersection; see: https://stackoverflow.com/questions/15798566/d3-line-path-intersection
	- Adapted an solution to use binary search + react Memoization to find intersection, but performance still slow.  

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
          export default({props,strokeWidth}) => (
          	...
            );
        ```
    - However, this means there is no way to add multiple default exports in react
- Using the `export default` at the bottom. Good if there is only one export
    
    - ```js
        const BackgroundColor = ({props,strokeWidth}) => (
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
However, too much refactoring can mkae it difficult later on to change, eg. from Scatter to Bar chart as certain properties (eg. circle radius) are no longer relevant


Also take note that each `return` function in a export can only export one "element". To export multiple items in a return, use the following `JSX` syntax.
```js
  export const BackgroundColor = ({props,strokeWidth}) =>(
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

- "get it right in black and white"
- areas to represent multiple things (cumulative chart differentiated by color) --> evolved to steam graph for better visualisation
