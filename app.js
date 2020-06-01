
 
(function(){
    "use strict";
    window.service =  { 
        onInputFunction: onInputFunction,
        onBlurFunction: onBlurFunction,
        clickDropdownOption: clickDropdownOption,
        apiCall: apiCall
    }  

    function apiCall(){
        var ele =  document.querySelector('.bar');
        // ele.style.transition = 'width 1s' 
        var startTime = 0;
        var timeInterval = setInterval(function(){
            ele.style.width = startTime + "%"; 
            if(startTime == 100 ){
                clearInterval(timeInterval);
            }
            startTime = startTime + 1; 
        }, 10) 
    }

    function getDropdownoptions(){ 
        return  [{ 
                value: "I am one",
                id: 1
            },{ 
                value: "I am two",
                id: 1
            },{ 
                value: "I am three",
                id: 1
            },{ 
                value: "I am four",
                id: 1
            },{ 
                value: "I am five",
                id: 1
            }]
    }
    
    function getDropdownElm(){
        return document.querySelector('.display-on-focus');
    }

    function clickDropdownOption(elm){
        setSelectedValueInputText(elm) ;
    }

    function setSelectedValueInputText(elm){
        var inputbox =  document.getElementsByClassName("select-box");
        inputbox[0].value = elm.innerText; 
        onBlurFunction();
    }

    function getInputCurrentValue(){
        var inputbox =  document.getElementsByClassName("select-box");
        return inputbox[0].value; 
    }

    function onInputFunction(){
        var dropdownElm = getDropdownElm(); 
        dropdownElm.innerHTML = '';
        var ul = document.createElement('ul');
        ul.setAttribute('class','ul-list'); 
        var options = getDropdownoptions();
        for(var i=0; i< options.length ;i++){
            var li = document.createElement('li');
            li.innerText = options[i].value;
            li.setAttribute('onclick',"service.clickDropdownOption(this)"); 
             
            if(getInputCurrentValue() === options[i].value){
                li.setAttribute('class', 'active');
            } 
            ul.appendChild(li);
        }
        dropdownElm.appendChild(ul);
        console.error("dropdownElm", dropdownElm);
        dropdownElm.style.display = "block"; 
    } 

    function onBlurFunction(){
        var dropdownElm = getDropdownElm();
        dropdownElm.style.display = "none"; 
    }


    var init = function(){
        // if(!getInputCurrentValue()){
             
        // }
    }();

})();