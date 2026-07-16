// =====================================================
// KRUSHI GUJARAT
// SCRIPT.JS PART 1
// User Authentication + Profile + Theme
// =====================================================



// ================= SIGNUP SYSTEM =================


function signupUser(){



    let user = {


        name:
        document.getElementById("signupName")?.value,


        phone:
        document.getElementById("signupPhone")?.value,


        email:
        document.getElementById("signupEmail")?.value,


        age:
        document.getElementById("signupAge")?.value,


        district:
        document.getElementById("signupDistrict")?.value,


        password:
        document.getElementById("signupPassword")?.value,


        village:
        "",


        farmArea:
        "",


        crop:
        ""



    };







    let confirmPass =

    document.getElementById("confirmPassword")?.value;







    if(

        !user.name ||
        !user.email ||
        !user.password

    ){


        alert(
            "Please fill all required details"
        );


        return;


    }








    if(user.password !== confirmPass){


        alert(
            "Password not matching"
        );


        return;


    }







    localStorage.setItem(

        "krushiUser",

        JSON.stringify(user)

    );






    localStorage.setItem(

        "isLoggedIn",

        "true"

    );





    alert(

        "Account Created Successfully 🌱"

    );





    window.location.href="dashboard.html";



}









// ================= LOGIN SYSTEM =================



function loginUser(){



    let email =

    document.getElementById("loginEmail")?.value;





    let password =

    document.getElementById("loginPassword")?.value;







    let user =

    JSON.parse(

        localStorage.getItem("krushiUser")

    );








    if(!user){


        alert(
            "Account not found. Please signup first."
        );


        return;


    }







    if(

        email===user.email &&

        password===user.password

    ){



        localStorage.setItem(

            "isLoggedIn",

            "true"

        );



        alert(

            "Login Successful 🌾"

        );



        window.location.href="dashboard.html";



    }

    else{



        alert(

            "Invalid Email or Password"

        );


    }



}









// ================= CHECK LOGIN =================



function checkLogin(){



    let status =

    localStorage.getItem(

        "isLoggedIn"

    );





    if(status!=="true"){


        window.location.href="login.html";


    }



}









// ================= LOGOUT =================



function logoutUser(){



    localStorage.removeItem(

        "isLoggedIn"

    );



    alert(

        "Logged Out Successfully"

    );



    window.location.href="login.html";



}









// ================= PASSWORD SHOW/HIDE =================



function togglePassword(id){



    let input =

    document.getElementById(id);





    if(input.type==="password"){



        input.type="text";


    }

    else{


        input.type="password";


    }



}









// ================= THEME SYSTEM =================



function toggleTheme(){



    document.body.classList.toggle(

        "dark-mode"

    );





    let mode =

    document.body.classList.contains(

        "dark-mode"

    )

    ?

    "dark"

    :

    "light";






    localStorage.setItem(

        "theme",

        mode

    );



}









function loadTheme(){



    let theme =

    localStorage.getItem(

        "theme"

    );





    if(theme==="dark"){



        document.body.classList.add(

            "dark-mode"

        );


    }



}









// ================= USER DISPLAY =================



function showUser(){



    let user =

    JSON.parse(

        localStorage.getItem(

            "krushiUser"

        )

    );





    let nameBox =

    document.getElementById(

        "welcomeUser"

    );





    if(user && nameBox){



        nameBox.innerHTML =

        user.name;



    }



}








document.addEventListener(

"DOMContentLoaded",

function(){


    loadTheme();


    showUser();


}

);


// =====================================================
// KRUSHI GUJARAT
// SCRIPT.JS PART 2
// Soil Analysis + Crop Recommendation
// =====================================================




// ================= GUJARAT FARM DATA =================


// =====================================================
// KRUSHI GUJARAT
// SCRIPT.JS PART 2 UPDATED
// 33 Gujarat District Farming Database
// =====================================================



const gujaratFarms = {



"Ahmedabad":{
soil:"Alluvial Soil",
ph:"6.5-8",
crops:["Wheat","Cotton","Vegetables"],
fertilizer:"Organic Compost + NPK",
water:"Medium Irrigation",
health:"Good"
},



"Amreli":{
soil:"Black Soil",
ph:"6.5-7.5",
crops:["Groundnut","Cotton","Wheat"],
fertilizer:"NPK 20:20:20",
water:"Drip Irrigation",
health:"Good"
},



"Anand":{
soil:"Alluvial Soil",
ph:"6.5-8",
crops:["Tobacco","Rice","Wheat"],
fertilizer:"Organic Fertilizer",
water:"Good",
health:"Excellent"
},



"Aravalli":{
soil:"Loamy Soil",
ph:"6-7.5",
crops:["Maize","Wheat","Vegetables"],
fertilizer:"NPK Fertilizer",
water:"Medium",
health:"Good"
},



"Banaskantha":{
soil:"Alluvial Soil",
ph:"6.5-8",
crops:["Potato","Groundnut","Wheat"],
fertilizer:"NPK + Micronutrients",
water:"Medium",
health:"Good"
},



"Bharuch":{
soil:"Alluvial Soil",
ph:"6.5-8",
crops:["Cotton","Sugarcane","Rice"],
fertilizer:"Organic + NPK",
water:"High",
health:"Excellent"
},



"Bhavnagar":{
soil:"Black Soil",
ph:"6.5-7.5",
crops:["Groundnut","Cotton","Bajra"],
fertilizer:"NPK Mix",
water:"Medium",
health:"Good"
},



"Botad":{
soil:"Black Soil",
ph:"6.5-7.5",
crops:["Cotton","Groundnut"],
fertilizer:"NPK Fertilizer",
water:"Medium",
health:"Good"
},



"Chhota Udaipur":{
soil:"Red Soil",
ph:"5.5-7",
crops:["Maize","Pulses","Vegetables"],
fertilizer:"Organic Compost",
water:"Medium",
health:"Good"
},



"Dahod":{
soil:"Black Soil",
ph:"6-7.5",
crops:["Maize","Wheat","Pulses"],
fertilizer:"Organic Fertilizer",
water:"Medium",
health:"Good"
},



"Dang":{
soil:"Red Soil",
ph:"5.5-7",
crops:["Rice","Vegetables","Fruits"],
fertilizer:"Organic Compost",
water:"High",
health:"Excellent"
},



"Devbhumi Dwarka":{
soil:"Sandy Soil",
ph:"6-7.5",
crops:["Cumin","Groundnut","Bajra"],
fertilizer:"Organic Fertilizer",
water:"Low",
health:"Medium"
},



"Gandhinagar":{
soil:"Alluvial Soil",
ph:"6.5-8",
crops:["Wheat","Vegetables"],
fertilizer:"NPK",
water:"Medium",
health:"Good"
},



"Gir Somnath":{
soil:"Black Soil",
ph:"6.5-7.5",
crops:["Groundnut","Cotton","Mango"],
fertilizer:"Organic + NPK",
water:"Good",
health:"Excellent"
},



"Jamnagar":{
soil:"Sandy Soil",
ph:"6-7.5",
crops:["Groundnut","Cumin","Bajra"],
fertilizer:"Organic",
water:"Medium",
health:"Good"
},



"Junagadh":{
soil:"Black Soil",
ph:"6.5-7.5",
crops:["Groundnut","Cotton","Wheat"],
fertilizer:"NPK 10:26:26",
water:"Good",
health:"Excellent"
},



"Kheda":{
soil:"Alluvial Soil",
ph:"6.5-8",
crops:["Rice","Wheat","Tobacco"],
fertilizer:"Organic + NPK",
water:"Good",
health:"Excellent"
},



"Kutch":{
soil:"Sandy Soil",
ph:"6-7",
crops:["Bajra","Cumin","Castor"],
fertilizer:"Organic Fertilizer",
water:"Low",
health:"Medium"
},



"Mahisagar":{
soil:"Loamy Soil",
ph:"6-7.5",
crops:["Maize","Wheat"],
fertilizer:"NPK",
water:"Medium",
health:"Good"
},



"Mehsana":{
soil:"Alluvial Soil",
ph:"6.5-8",
crops:["Potato","Wheat","Cumin"],
fertilizer:"NPK + Zinc",
water:"Medium",
health:"Good"
},



"Morbi":{
soil:"Black Soil",
ph:"6.5-7.5",
crops:["Cotton","Groundnut"],
fertilizer:"NPK",
water:"Medium",
health:"Good"
},



"Narmada":{
soil:"Alluvial Soil",
ph:"6-8",
crops:["Banana","Sugarcane","Rice"],
fertilizer:"Organic",
water:"High",
health:"Excellent"
},



"Navsari":{
soil:"Alluvial Soil",
ph:"6-8",
crops:["Rice","Sugarcane","Mango"],
fertilizer:"Organic + NPK",
water:"High",
health:"Excellent"
},



"Panchmahal":{
soil:"Black Soil",
ph:"6-7.5",
crops:["Maize","Wheat","Cotton"],
fertilizer:"NPK",
water:"Medium",
health:"Good"
},



"Patan":{
soil:"Alluvial Soil",
ph:"6.5-8",
crops:["Cumin","Wheat","Bajra"],
fertilizer:"Micronutrients",
water:"Low",
health:"Good"
},



"Porbandar":{
soil:"Sandy Soil",
ph:"6-7",
crops:["Groundnut","Cumin"],
fertilizer:"Organic",
water:"Medium",
health:"Good"
},



"Rajkot":{
soil:"Black Soil",
ph:"6.5-7.5",
crops:["Cotton","Groundnut","Bajra"],
fertilizer:"NPK",
water:"Medium",
health:"Good"
},



"Sabarkantha":{
soil:"Loamy Soil",
ph:"6-7.5",
crops:["Maize","Wheat","Vegetables"],
fertilizer:"Organic Compost",
water:"Medium",
health:"Good"
},



"Surat":{
soil:"Alluvial Soil",
ph:"6.5-8",
crops:["Sugarcane","Rice","Vegetables"],
fertilizer:"Organic + NPK",
water:"High",
health:"Excellent"
},



"Surendranagar":{
soil:"Black Soil",
ph:"6.5-7.5",
crops:["Cotton","Groundnut"],
fertilizer:"NPK",
water:"Medium",
health:"Good"
},



"Tapi":{
soil:"Black Soil",
ph:"6-7.5",
crops:["Sugarcane","Rice","Banana"],
fertilizer:"Organic",
water:"High",
health:"Excellent"
},



"Vadodara":{
soil:"Black Soil",
ph:"6.5-7.5",
crops:["Cotton","Wheat","Tobacco"],
fertilizer:"NPK 20:20:20",
water:"Good",
health:"Good"
},



"Valsad":{
soil:"Alluvial Soil",
ph:"6-8",
crops:["Rice","Mango","Sugarcane"],
fertilizer:"Organic",
water:"High",
health:"Excellent"
}

};




// Soil Analysis Function
function analyzeSoil(){


let district=document.getElementById("farmDistrict").value;

let soil=document.getElementById("soilType").value;

let ph=Number(document.getElementById("soilPH").value);



let farm=gujaratFarms[district];


let score=50;



if(ph>=6 && ph<=7.5){

score+=30;

}
else{

score+=15;

}



if(farm && farm.soil.includes(soil)){

score+=20;

}



if(score>100){

score=100;

}




let result={


district:district,

soil:soil,

ph:ph,

score:score,

crop:farm.crops,

fertilizer:farm.fertilizer,

water:farm.water,

health:farm.health


};




localStorage.setItem(

"soilAnalysis",

JSON.stringify(result)

);



showSoilResult(result);

cropAdvisor();


}







function showSoilResult(data){


let box=document.getElementById("soilResult");


if(box){


box.innerHTML=`


<h3>🌱 Soil Analysis Report</h3>

<p>District: <b>${data.district}</b></p>

<p>Soil: <b>${data.soil}</b></p>

<p>pH: <b>${data.ph}</b></p>

<p>Health Score: <b>${data.score}%</b></p>

<p>Recommended Crops:
<b>${data.crop.join(", ")}</b>
</p>

<p>Fertilizer:
<b>${data.fertilizer}</b>
</p>

<p>Water:
<b>${data.water}</b>
</p>


`;

}


}





function cropAdvisor(){


let data=JSON.parse(

localStorage.getItem("soilAnalysis")

);



let box=document.getElementById("cropAdvisor");



if(data && box){


box.innerHTML=`

<h3>🤖 Smart Crop Advisor</h3>

<h4>${data.crop.join(" 🌱 ")}</h4>

<p>Success Chance: ${data.score}%</p>

`;


}


}






// ================= SOIL ANALYSIS =================



function analyzeSoil(){



let district =

document.getElementById(
"farmDistrict"
)?.value;




let soil =

document.getElementById(
"soilType"
)?.value;




let ph =

Number(

document.getElementById(
"soilPH"
)?.value

);







if(

!district ||

!soil ||

!ph

){


alert(
"Please enter complete farm details"
);


return;


}







let score = 50;





// PH ANALYSIS


if(ph>=6 && ph<=7.5){


score +=30;


}

else{


score +=15;


}








// SOIL MATCH



if(

gujaratFarms[district]

&&

gujaratFarms[district].soil
.includes(soil)

){


score+=20;


}






if(score>100){

score=100;

}







let farm =

gujaratFarms[district];






let result = {


district:district,


soil:soil,


ph:ph,


score:score,


crop:

farm ?

farm.crops

:

[

"Vegetables"

],



fertilizer:

farm ?

farm.fertilizer

:

"Organic Fertilizer",



water:

farm ?

farm.water

:

"Normal Irrigation",



health:

farm ?

farm.health

:

"Good"



};







localStorage.setItem(

"soilAnalysis",

JSON.stringify(result)

);







showSoilResult(result);



}









// ================= SHOW RESULT =================



function showSoilResult(data){



let box =

document.getElementById(

"soilResult"

);





if(box){



box.innerHTML = `


<h3>
🌱 Soil Analysis Report
</h3>


<p>
District:
<b>${data.district}</b>
</p>


<p>
Soil:
<b>${data.soil}</b>
</p>



<p>
pH Level:
<b>${data.ph}</b>
</p>



<p>
Soil Health Score:
<b>${data.score}%</b>
</p>



<p>
Recommended Crops:
<b>
${data.crop.join(", ")}
</b>
</p>



<p>
Fertilizer:
<b>
${data.fertilizer}
</b>
</p>



<p>
Water:
<b>
${data.water}
</b>
</p>



`;



}



}









// ================= CROP ADVISOR =================



function cropAdvisor(){



let data =

JSON.parse(

localStorage.getItem(

"soilAnalysis"

)

);





let output =

document.getElementById(

"cropAdvisor"

);





if(data && output){



output.innerHTML = `


<h3>
🤖 Smart Crop Advisor
</h3>


<p>
Best Crops:
</p>


<h4>

${data.crop.join(" 🌱 ")}

</h4>


<p>

Success Chance:

${data.score}%

</p>


`;



}



}

// =====================================================
// KRUSHI GUJARAT
// SCRIPT.JS PART 3
// Profit + Report + Dashboard Analytics
// =====================================================





// ================= PROFIT CALCULATOR =================



function calculateProfit(){



let area = Number(

document.getElementById(
"farmArea"
)?.value

);



let crop =

document.getElementById(
"profitCrop"
)?.value;







if(!area || !crop){


alert(
"Enter farm area and crop"
);


return;


}







let cropData = {


"Groundnut":{

cost:25000,

income:65000

},


"Cotton":{

cost:30000,

income:75000

},


"Wheat":{

cost:20000,

income:55000

},


"Cumin":{

cost:35000,

income:90000

},


"Rice":{

cost:28000,

income:70000

}


};







let data =

cropData[crop] || {


cost:20000,

income:50000


};






let totalCost =

data.cost * area;





let totalIncome =

data.income * area;






let profit =

totalIncome-totalCost;







let result =

document.getElementById(

"profitResult"

);






if(result){



result.innerHTML = `


<h3>
💰 Profit Estimation
</h3>


<p>
Crop:
<b>${crop}</b>
</p>



<p>
Farm Area:
<b>${area} Acre</b>
</p>



<p>
Investment:
<b>₹${totalCost}</b>
</p>



<p>
Expected Income:
<b>₹${totalIncome}</b>
</p>



<h2>

Profit:
₹${profit}

</h2>



`;



}



}









// ================= FARM REPORT =================



function generateFarmReport(){



let user =

JSON.parse(

localStorage.getItem(

"krushiUser"

)

);




let soil =

JSON.parse(

localStorage.getItem(

"soilAnalysis"

)

);







let report = `



KRUSHI GUJARAT FARM REPORT



Farmer Name:

${user ? user.name : "User"}



District:

${soil ? soil.district : "Not Available"}



Soil Type:

${soil ? soil.soil : "Not Available"}



Soil pH:

${soil ? soil.ph : "Not Available"}



Soil Health Score:

${soil ? soil.score+"%" : "Not Available"}



Recommended Crop:

${soil ? soil.crop.join(", ") : "Not Available"}



Fertilizer:

${soil ? soil.fertilizer : "Not Available"}



Water:

${soil ? soil.water : "Not Available"}



`;






let file =

new Blob(

[report],

{

type:"text/plain"

}

);






let link =

document.createElement(

"a"

);



link.href =

URL.createObjectURL(file);



link.download =

"Krushi_Gujarat_Report.txt";



link.click();



}









// ================= DASHBOARD LOAD =================



function loadDashboard(){



let user =

JSON.parse(

localStorage.getItem(

"krushiUser"

)

);






let soil =

JSON.parse(

localStorage.getItem(

"soilAnalysis"

)

);






let name =

document.getElementById(

"dashboardName"

);






if(user && name){


name.innerHTML =

"Welcome "+user.name+" 🌱";


}







let score =

document.getElementById(

"soilScore"

);






if(score && soil){


score.innerHTML =

soil.score+"%";


}







let crop =

document.getElementById(

"recommendedCrop"

);






if(crop && soil){



crop.innerHTML =

soil.crop[0];


}



}









// ================= FARM HEALTH SCORE =================



function farmHealth(){



let soil =

JSON.parse(

localStorage.getItem(

"soilAnalysis"

)

);







let health =

document.getElementById(

"farmHealth"

);






if(health){



if(soil){



health.innerHTML = `


Farm Health:

${soil.score}% 🌱



`;



}

else{


health.innerHTML =

"Farm Analysis Pending";



}



}



}









// ================= AUTO LOAD DASHBOARD =================



document.addEventListener(

"DOMContentLoaded",

function(){


loadDashboard();


farmHealth();


}

);

// =====================================================
// KRUSHI GUJARAT
// SCRIPT.JS PART 4 FINAL
// Weather + Market + Alerts + Language
// =====================================================





// ================= WEATHER DEMO =================



const weatherData = {



"Junagadh":{

temp:"32°C",

humidity:"65%",

rain:"20%",

wind:"12 km/h"

},



"Rajkot":{

temp:"33°C",

humidity:"60%",

rain:"15%",

wind:"10 km/h"

},



"Ahmedabad":{

temp:"34°C",

humidity:"55%",

rain:"10%",

wind:"14 km/h"

},



"Surat":{

temp:"30°C",

humidity:"75%",

rain:"35%",

wind:"15 km/h"

},



"Kutch":{

temp:"36°C",

humidity:"40%",

rain:"5%",

wind:"20 km/h"

}



};









function showWeather(){



let district =

document.getElementById(

"weatherDistrict"

)?.value;





let box =

document.getElementById(

"weatherResult"

);






let data =

weatherData[district];






if(data && box){



box.innerHTML = `


<h3>
☁ ${district} Weather
</h3>


<h2>
${data.temp}
</h2>


<p>
💧 Humidity:
${data.humidity}
</p>


<p>
🌧 Rain Chance:
${data.rain}
</p>


<p>
💨 Wind:
${data.wind}
</p>


`;



}



}









// ================= MARKET PRICE =================



const marketData = {


"Groundnut":

"₹6500 / Quintal",


"Cotton":

"₹7200 / Quintal",


"Wheat":

"₹2400 / Quintal",


"Cumin":

"₹18000 / Quintal",


"Rice":

"₹3200 / Quintal"



};









function showMarketPrice(){



let crop =

document.getElementById(

"marketCrop"

)?.value;





let box =

document.getElementById(

"marketResult"

);





if(box){



box.innerHTML = `


<h3>
📈 Market Price
</h3>


<p>
Crop:
<b>${crop}</b>
</p>


<h2>

${marketData[crop] || "Data Available Soon"}

</h2>


<p>

Trend:
📈 Increasing

</p>


`;



}



}









// ================= FARM ALERT SYSTEM =================



function loadAlerts(){



let alerts = [



"⚠ Check soil moisture regularly",



"🌧 Rain possibility detected",



"🌱 Use organic fertilizer for better soil",



"💧 Save water with drip irrigation"



];






let box =

document.getElementById(

"farmAlerts"

);






if(box){



box.innerHTML="";





alerts.forEach(

alert=>{


box.innerHTML +=

`

<p>
${alert}
</p>

`;


}

);



}



}









// ================= DISTRICT SEARCH =================



function searchDistrict(){



let input =

document.getElementById(

"districtSearch"

)?.value.toLowerCase();





let cards =

document.querySelectorAll(

".district-card"

);







cards.forEach(

card=>{



let text =

card.innerText.toLowerCase();






if(text.includes(input)){



card.style.display="block";


}

else{


card.style.display="none";


}



}



);



}









// ================= LANGUAGE SWITCH =================



function changeLanguage(lang){



let english =

document.querySelectorAll(

".english"

);



let gujarati =

document.querySelectorAll(

".gujarati"

);



let hindi =

document.querySelectorAll(

".hindi"

);







if(lang==="gu"){



english.forEach(

e=>e.style.display="none"

);



gujarati.forEach(

e=>e.style.display="block"

);



}



else if(lang==="hi"){



english.forEach(

e=>e.style.display="none"

);



hindi.forEach(

e=>e.style.display="block"

);



}



else{



english.forEach(

e=>e.style.display="block"

);



gujarati.forEach(

e=>e.style.display="none"

);



hindi.forEach(

e=>e.style.display="none"

);



}



}









// ================= OPEN LINKS =================



function openWeather(){



alert(

"Live weather feature can be connected with API in future 🌦"

);



}






function openMarket(){



alert(

"Live mandi prices can be connected in future 📈"

);



}









// ================= FINAL PAGE LOAD =================



document.addEventListener(

"DOMContentLoaded",

function(){



loadAlerts();



}

);

function showCropAdvisor(data){


let box=document.getElementById("cropAdvisor");


if(box){


box.innerHTML=`

<h3>🤖 Smart Crop Advisor</h3>

<p>
Recommended Crops:
</p>


<h4>
🌱 ${data.crop.join(", ")}
</h4>


<p>
💧 Water Requirement:
<b>${data.water}</b>
</p>


<p>
🧪 Fertilizer:
<b>${data.fertilizer}</b>
</p>


<p>
🌱 Farm Health:
<b>${data.health}</b>
</p>


`;

}


}

