'use strict';
const ibra = {username:"Zlatan Ibrahamovic",
    password: 1111,
    transaction : [200,500,1000,-600,400,-300,700,-200]
    }
const memphis = {username:"Memphis Depay",
    password: 2222,
    transaction : [2110,5120,7000,-2600,400,-3400,1700,-1200]
    }
    const james = {username:"Daniel James",
    password: 3333,
    transaction : [3600,400,10000,-7850,4006,-120,720,-2078]
    }
    const salah = {username:"Mohammad Salah",
    password: 4444,
    transaction : [300,1500,900,-800,7400,-3000,7008,-2004]
    }

let currentuser;
let arr = [ibra,memphis,james,salah];
let maincont = document.querySelector(".main");
let recordtablerow = document.querySelector(".recordTable");
let clonerow = document.querySelector(".recordTable").cloneNode(true);
let loginbtn = document.querySelector(".loginbtn");
let welcomebox = document.querySelector("header h2");
let userenteredname = document.querySelector(".username");
let userenteredpassword = document.querySelector(".pwd");
let transfersum = document.querySelector(".transferamt");
let deposit = document.querySelector(".depositamt");
let withdraw = document.querySelector(".withdrawamt");
let transferto = document.querySelector(".transferuser");
let stattable = document.querySelector(".stattable");
let loginerror = document.querySelector(".alert-danger");
let heading = document.querySelector(".jumbotron");
let depbtn = document.querySelector(".depbtn");
let witbtn = document.querySelector(".witbtn");
let trbtn = document.querySelector(".trabtn");
let logoutbtn = document.querySelector(".logoutbtn");
let logsection = document.querySelector(".loginsection");
let welcomesection = document.querySelector(".welcometext");
let balanddate = document.querySelector(".dateandbal");
let alertbox = document.querySelector(".alertbox");
let confirmbox = document.querySelector(".confirmbox");




 function showname(acc){
     welcomebox.querySelector(".nameplace").textContent = `Welcome ${acc.username.split(' ')[0]}`;
     let date = new Date();
     welcomebox.querySelector(".dateandbal").textContent = `Available Balance ${calculatesum(acc)} ${date}`;

 }

 //settiing login name to initials of first and last name.

function setusername(accounts){
    accounts.forEach((currentaccount) => {
           let uname = currentaccount.username.toLowerCase().split(' ').map(named => named[0]);
           currentaccount.loginname = uname.join("");})
  
    }
setusername(arr);

// Checking User Credentials and returning the current user.
let identifyuser = function(){
    let curr  = arr.find(acc => acc.loginname === userenteredname.value.toLocaleLowerCase() && acc.password === Number(userenteredpassword.value));
    userenteredname.value = "";
    userenteredpassword.value = "";

    currentuser = curr;
    return curr;
}


// Updating the records table in website.

let records = function(user){
    stattable.innerHTML = "";
    stattable.insertAdjacentElement("afterbegin", clonerow);
    let recordtablerow = document.querySelector(".recordTable");
    user.transaction.forEach((item,index) => {
        let trans = ( item > 0) ? "Deposit" : "Withdrawal";
        let sty = ( trans === "Deposit") ? "Deposited" : "withdrawn";
        let elem = `<tr>
        <td>${index+1}</td>
        <td class="${sty}">${trans}</td>
        <td>${item}</td>`;
        recordtablerow.insertAdjacentHTML("afterend",elem);

    });
    if(stattable.rows.length > 10){
        document.querySelector(".main div:first-child").classList.add("scrollit");
    }

    
    balanddate.textContent = `Available Balance is ${calculatesum(currentuser)} as of ${(new Date()).getDate()}/${(new Date()).getMonth() + 1}/${(new Date()).getFullYear()}`;

}

//Calculating Totalsum
let calculatesum = function(user){
    return user.transaction.reduce((acc,curr) => acc + curr,0);
}

let welcomemessage = function(){
    let current = identifyuser();
    if(current !== undefined){
    loginerror.style.display = "none";
    let sumtotal = calculatesum(current);
    records(current);
    logsection.style.display = "none";
    welcomesection.style.display = "flex";
    logoutbtn.style.display = "block";
    maincont.style.display = "flex";
    welcomebox.textContent = `Hello, ${current.username.split(' ')[0]}`;
    }
    else if (current === undefined){
        loginerror.style.display = "block";
        loginerror.textContent = "Username or Password is Incorrect Please try again";
        maincont.style.display = "none";
        
    }
    
}
//Handling actionable inputs

let checkinput = function(){

    let val = Number(this.value);
    if(this === deposit){
        if(val === 0){
            this.nextElementSibling.textContent = "";
            this.nextElementSibling.nextElementSibling.disabled = true;
            
        }
        else if(val > 50000){
        this.nextElementSibling.textContent = "Maximum 50,000 Can be deposited";
        this.nextElementSibling.nextElementSibling.disabled = true;
        }
        else if( val < 0){
            this.nextElementSibling.textContent = "Kindly Enter Valid Amount to Deposit";
            this.nextElementSibling.nextElementSibling.disabled = true;
            
        }
        else{
            this.nextElementSibling.textContent = "";
            this.nextElementSibling.nextElementSibling.disabled = false;
        }

    }
    else if(this === withdraw){
        if(val === 0){
            this.nextElementSibling.textContent = "";
            this.nextElementSibling.nextElementSibling.disabled = true;  
        }
        else if(val > calculatesum(currentuser)){
            this.nextElementSibling.textContent = "Amount entered exceeds the current balance";
        this.nextElementSibling.nextElementSibling.disabled = true;
        }
       
        else if( val < 0){
            this.nextElementSibling.textContent = "Kindly Enter Valid Amount to withdraw";
            this.nextElementSibling.nextElementSibling.disabled = true;
        }
        else{
            this.nextElementSibling.textContent = " ";
            this.nextElementSibling.nextElementSibling.disabled = false;
        }
    }
    else if(this === transfersum){
        if(val === 0){
            this.nextElementSibling.textContent = "";
            this.nextElementSibling.nextElementSibling.disabled = true;
            
        }
        else if(val > calculatesum(currentuser)){
            this.nextElementSibling.textContent = "Amount entered exceeds the current balance";
        this.nextElementSibling.nextElementSibling.disabled = true;
        }
        else if( val < 0){
            this.nextElementSibling.textContent = "Kindly Enter Valid Amount to Transfer";
            this.nextElementSibling.nextElementSibling.disabled = true;
        }
        else{
            this.nextElementSibling.textContent = "";
            this.nextElementSibling.nextElementSibling.disabled = false;
        }
    }
    else if( this === transferto){
        let beneuser = arr.find((item) => item.loginname === transferto.value.toLocaleLowerCase());
        if(beneuser === undefined){
            this.nextElementSibling.textContent = "No Such User found";
        }
        else{
            this.nextElementSibling.textContent = "";
        }
    }
}
//Deposit Money

let depositmoney = function(){
    let trans = ( this.classList.contains("depbtn"))? "Deposit" : (this.classList.contains("witbtn"))? "Withdrawal":"";
    
    if(trans === "Deposit"){
        let val = Number(deposit.value);
        let elem = `<tr>
        <td>${currentuser.transaction.length +1}</td>
        <td class="Deposited">${trans}</td>
        <td>${val}</td>`;
        currentuser.transaction.push(val);
        records(currentuser);
        confirmbox.classList.add("active-bg");
        
    }
    else if (trans === "Withdrawal"){
       
        let val = Number(withdraw.value);
        let elem = `<tr>
        <td>${currentuser.transaction.length +1}</td>
        <td class="withdrawn">${trans}</td>
        <td>${-val}</td>`;
        currentuser.transaction.push(-val);
        records(currentuser);
      
        confirmbox.classList.add("active-bg");
        
      
        
    }  
}

//transfer money to different user
let transfermoney = function(){
   
    let tamt = Number(transfersum.value);
    let beneficiary = arr.find((item) => item.loginname === transferto.value.toLocaleLowerCase());
    currentuser.transaction.push(-tamt);
    beneficiary.transaction.push(tamt);
    records(currentuser);
    confirmbox.classList.add("active-bg");
    
}

document.querySelector(".loginbtn").addEventListener("click",welcomemessage);
document.querySelector(".depbtn").addEventListener("click",depositmoney);
document.querySelector(".witbtn").addEventListener("click",depositmoney);
document.querySelector(".trabtn").addEventListener("click",transfermoney);
deposit.addEventListener("input", checkinput);
withdraw.addEventListener("input", checkinput);
transfersum.addEventListener("input", checkinput);
transferto.addEventListener("blur", checkinput);

logoutbtn.addEventListener("click",function(){
    maincont.style.display = "none";
    logsection.style.display = "flex";
    logoutbtn.style.display = "none";
    welcomebox.textContent = `Bankist App`;
    welcomesection.style.display = "none";
})

document.querySelector(".alertbox a").addEventListener("click",function(){
    confirmbox.classList.remove("active-bg");
})
