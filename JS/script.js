
const dropList = document.querySelectorAll(".drop_list select");
const getButton = document.querySelector(".get_btn");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const fromImgTag = document.querySelector('.form img'); 
const toImgTag = document.querySelector('.to img');
const selectBox = document.querySelector('select-box');
const imgTag = document.createElement('img');
const icon = document.querySelector("i");

for(let i = 0; i < dropList.length; i++){
    for(currency_code in countryCodes){

        // selecting USD by default as from currency and NPR as to currency
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }
        if(i == 1){
            selected = currency_code == "NPR" ? "selected" : "";
        }
        // creating option tag with passing currency code
        let optionTag = `<option value = "${ currency_code }" ${selected}>${ currency_code }</option>`;

        //Insert optiongtag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e=>{
        loadFlag(e);
    })
};
function loadFlag(e){
    const select = e.target;
    const countryCode = e.target.value;
    const selectFrom = document.querySelector("#fromimg");
    const selectTo = document.querySelector("#toimg");
       for(code in countryCodes){
            if(countryCode == code){
                 const flagCode =  countryCodes[code];
                 if(select == selectFrom){
                                 let imgTag = document.querySelector("#from_img");
                                  getFlag(flagCode, imgTag);
                 }else if(select == selectTo){
                                let imgTag = document.querySelector("#to_img");
                                getFlag(flagCode, imgTag);

                 }
                
             }
        }
}

function getFlag(flagCode, imgTag){
    const Img = imgTag.setAttribute(`src`,`https://flagsapi.com/${flagCode}/flat/64.png`);
}

icon.addEventListener("click", (event)=>{
    event.preventDefault();
    getExchangeRate();
})
getButton.addEventListener("click", (event)=>{
      event.preventDefault();
      getExchangeRate();
});

function getExchangeRate(){
    console.log("called");
     const amount = document.querySelector(".amount  input");
     const exchangeRateTxt = document.querySelector(".exchange_rate");

     let amountVal = amount.value;
 
     // If user dont enter any value or enter 0 then we'll put 1 value by default in the input filed

     if(amountVal == "" || amountVal == "0"){
          amount.value = "1";
          amountVal =  1;
     }

     
     const apiKey = `cur_live_Kr3hjGytakeHcEE1rfNHID1C82zu53dnNDqHmlNL`;

     let url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&currencies=${toCurrency.value}&base_currency=${fromCurrency.value}`
     
     fetch(url).then( async (response)=>{
         await response.json().then((res)=>{
            const countryCurrency = res.data;
            if(countryCurrency[toCurrency.value]!== undefined){
                let exchangeRate = countryCurrency[toCurrency.value]['value'];
                let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
                exchangeRateTxt.innerText = "Getting exchange rate...";
                exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;

                // console.log(totalExchangeRate);
            } else {
                console.log(`Value for ${fromCurrency.value} is undefined.`);
              }
         })
     }).catch((err)=>{
        console.log(err);
     })

     
};