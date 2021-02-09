## NOTES

-----------
INSTRUCTIONS:
Use this markdown file to keep track of open questions/challenges from this week's assignment.
- What did you have trouble solving?
- What went easier than expected?
- What, if anything, is currently blocking you?

Sometimes it helps to formulate what you understood and where you got stuck in order to move forward. Feel free to include `code snippets`, `screenshots`, and `error message text` here as well.

If you find you're not able complete this week's assignment, reflecting on where you are getting stuck here will help you get full credit for this week's tutorial

------------

## Javascript notes
```
/* "A string" 'Also a string' `Another string`
*/ 

/* dates can be strings or its own data type Date()
*/ 

/* object {
    key1: "value1", 
    key2: 3, 
    key3: [1, 2, 3],
    key4: { name: "aucher", height:5.4}
}
*/ 

/* array [
    [1, 2, 3]

    ["one", "two", 3]

    [ {label: "one", value: 1},
{label:"two", value:2}]
]
*/

/* variables
const myVariable = 'this is my constant var'

let myVariable = 'this is my reassignable var'

var myVariable = 'this is old syntax'
*/ 

/* string interpolation, dynamic string

const myName = 'melissa' 

`hello, my name is ${myName}` 

backstrokes used instead */ 
```

/* function expression
function = myFunction(argument)

vs _ 

*/ 

activity = ['running', 'chasing', 'climbing', 'eating' 'foraging']

count = [730, 279, 658, 760, 1435]

// selects the first element
d3.select("#chart")

// selects all instances 
d3.selectAll("rect.bar")
    // map to all the data elements aka data join
    .data([1,2,3])
    // create rect for each data element
    .join('rect')
    //set class name
    .attr("class", "bar")
    .attr("y", d => d * 100)
    .attr("x", (d, i => i*100 + 50))
// i for index 
// array[0] returns first value in array 




    . chain action 



