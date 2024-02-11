const form = document.querySelector("form");
let year = document.getElementById("year");
let month = document.getElementById("month");
let day = document.getElementById("day");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const obj = Object.fromEntries(fd);
  if(obj.day === '' || obj.month === '' || obj.year === ''){
   let msg =  document.querySelectorAll('span')
   for(let m of msg){
    m.innerHTML = "This field is required";
   }
  }
   
  
  // convert numbers into date && check if a valid or not
  convertAndCheck();
  // if converAndCheck return TRUE execute the following 
  if( convertAndCheck() !== false){
     AgeClaculater();
  }
 
});

function convertAndCheck() {
  const fd = new FormData(form);
  const obj = Object.fromEntries(fd);
  var day = parseInt(obj.day);
  var month = parseInt(obj.month) - 1;
  var year = parseInt(obj.year);
  //convert
  const date = new Date(year, month, day);
  const currentDate = new Date();
  //check
  if (
    (date.getDate() === day &&
      date.getMonth() === month &&
      date.getFullYear() === year) === false
  ) {
    const inp = document.querySelectorAll("input");
    const label = document.querySelectorAll("label")
    for (let i of inp ) {
      i.style.border = "1px solid red";
    }
    for (let i of label ) {
      i.style.color = " red";
    }
   
  }

  if ((date.getDate() === day) === false) {
    document.getElementById("day_erro_msg").innerText = "Must be a valid day";
    return false ;
  }
  else if ((date.getMonth() === month) === false) {
    document.getElementById("month_erro_msg").innerText =
      "Must be a valid month";
      return false ;
  }
  if (date > currentDate) {
    document.getElementById("year_erro_msg").innerText = "Must be in the past";
    return false;
  }

  
}


function AgeClaculater() {
  const fd = new FormData(form);
  const obj = Object.fromEntries(fd);
  let birthDay = parseInt(obj.day);
  let birthMonth = parseInt(obj.month) - 1;
  let birthYear = parseInt(obj.year);
let today = new Date() ;
let d2  = today.getDate();
let m2 = today.getMonth()  ;
let y2 = today.getFullYear();

let m3 ,d3 ,y3 ;
y3 =y2 - birthYear ;
if(m2 >= birthMonth){
  m3 = m2 - birthMonth;
}else{
  y3--;
  m3 = 12 +m2 -birthMonth;
}
if(d2 >= birthDay){
d3 = d2 - birthDay;
}else{
m3--;
d3 = getDaysInMounth(birthYear,birthMonth) + d2 - birthDay;
}
if(m3 < 0){
  m3 =11 ;
  y3--;
}
year.innerHTML = y3;
month.innerHTML =m3 ;
day.innerHTML = d3 ;
}
function getDaysInMounth(year , month){
return new Date(year , month , 0).getDate();
}

