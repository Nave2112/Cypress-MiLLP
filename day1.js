//variable
// var - can be reassigned and redeclared
var username = 'ben'
var username = 'gen' // can be redeclared
console.log(username) 
username = 'nav'      // can be reassigned
console.log(username)  

  // let - can be reassigned  but can't be redeclared , introduced in ES6
 let name = 'raju'
 console.log(name)
 name = 'bene'
 console.log(name)

 // const - can't be reassigned and redeclared , introduced in ES6
 //once identifier assigned to const variable we can't put it into another variable
 const naming =  'sathya'
 console.log(naming)
//   naming = 'raju'
//  console.log(naming)

//regular and arrow function
//regular function(function declaration are top og the containing scope)
//eg 1hoisting
some()    //declared to top
function some(){
    console.log('hey dude')
}

//eg2 
console.log(meme())
function meme(){
    return "hello im fine"
}

// arrow function -- concise syntax , shorthand way to write the code
//eg1  it will run because functon declared in bottom
  var meter = ()=>{
    console.log('jd the culprit')
  }
  meter()

  //eg2  it not run because functon declared in top of hoisting
 
//   meter1()
//   var meter1 = ()=>{
//     console.log('can"t be hoist')
//   }
  

  //escaping string

  var str = " hello, \n start as new line then nothingg \b to hide\tnn "
  console.log(str)
  var strr = " c: \\user\\program\\naveen"
  console.log(strr)

  //cariage return
 //
  var u = 'hello ram r u what \r okay'
  console.log(u)
  //okayo ram r u what

  //logical operator
var a = 5
var b = 4
console.log(a||b)
console.log(a==5||b==a)
console.log(a&&b)
console.log(a==5&&b==a)

result = "" && "foo"; // result is assigned "" (empty string)
console.log(result)
result0 = "foo" && ""; // result is assigned "" (empty string) bcause  start from left to right left is having string so true and right empty string so return empty string in &&
console.log(result0)
result1 = 2 && 0; // result is assigned 0
console.log(result1)
result2= "foo" && 4; // result is assigned 4 // result is assigned 4  here left having string so true then right having number true so return last one
console.log(result2)
result3=   4 && "foo"; // result is assigned 4  here left having number so true then right having string true so return last one
console.log(result3)

//not !
var x = 5
console.log(!x)
var a = 3;
var b = -2;

console.log(!(a > 0 || b > 0));   // (!true) == false
// Expected output: false

//ternary operator
var age = str => str>=18 ? "success u r eligible" : "need to abov 18"
console.log(age(18))