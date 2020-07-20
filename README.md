# Prompt
 Write a function in NodeJS which takes two arrays of variable length and 
 returns a single array of the unique objects across both arrays, sorted and 
 limited to the first X objects.
 Assume the object includes the following fields:
 
 ```
 {
  Id: number, // attribute to be used to confirm uniqueness
  rank: number // attribute to be used for sorting
 }
 ```
 ## Example:
 ```
 ArrayA:
 [
   { id: 1, rank: 1 }, 
   { id: 2, rank: 3 }, 
   { id: 3, rank: 5 }, 
   { id: 4, rank: 6 }, 
   { id: 5, rank: 9 }
 ]

 ArrayB: [
   { id: 2, rank: 2 },
   { id: 4, rank: 7 }, 
   { id: 6, rank: 4 }, 
   { id: 7, rank: 8 }, 
   { id: 8, rank: 10 }
 ]
```

 ### Assumptions
- ArrayB is new data and is used to update the rank if duplicated
- Array objects will have identical keys
- Array cannot be empty
- Object property values must be of type number
- No sort direction specified so made configurable along with sort key