(function(){
'use strict;'

    window._dateService = {
        initializeWeekTable : initializeWeekTable,
        todayCal: todayCal,
        prevCal: prevCal,
        nextCal: nextCal,
        deleteOtherPopup: deleteOtherPopup,
        deletePopup: deletePopup,
        stopPropogation: stopPropogation
    }
    var _getNextSevenDaysDate = [], previousPopupId = '';
    var eventsList = [{
        user_id :  '12', 
        id: '1', 
        events: 'Standup Tech - About 3MS' ,
        date : '25-May-2020', 
        timeStart:  '2 PM',
        timeEnd: '4 PM', 
        type : 'reminder',
        description: 'I am description of events1'
    },{
        user_id :  '13', 
        id: '2', 
        events: 'Salary discussion' ,
        date : '30-May-2020', 
        timeStart:  '2 PM',
        timeEnd: '3 PM', 
        type : 'personal',
        description: 'I am description of events2'
    },
    {
        user_id :  '14', 
        id: '2', 
        events: 'Salary discussion' ,
        date : '31-May-2020', 
        timeStart:  '1 AM',
        timeEnd: '2 AM', 
        type : 'personal',
        description: 'I am description of events3'
    }]

    const TIME_SLOTS = ["--", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", '12 PM',
                        "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"];

    function todayCal(elm){
        console.log("todayCal", elm);
    }

    function prevCal(elm){
        console.log("prevCal", elm);
    }

    function nextCal(elm){
        console.log("nextCal", elm);
    } 

    function getCalenderEle(){
       return document.querySelector('.calander'); 
    }

    function dateToYMD(date) {
        var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        date = new Date(date);
        var d = date.getDate();
        var m = strArray[date.getMonth()];
        var y = date.getFullYear();
        return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
    }

    function getNextSevenDaysDate(day){
        var list = []; 
        for(var i =0; i< 7; i++){
            var nextDay = new Date();
            list.push(dateToYMD(nextDay.setDate(new Date().getDate()+i)));
        } 
        list.unshift('--')
        return list;
    }

    function deleteOtherPopup(){ 
        if(previousPopupId){
            var boxElm = document.getElementById(previousPopupId);
            boxElm.innerHTML = '';  
        }
       
    } 

    function deletePopup(event){
        event.stopPropagation(); 
        deleteOtherPopup();
    }

    function stopPropogation(event){
        event.stopPropagation();
    }

    function clickSpecificCell(time, day){
        deleteOtherPopup();
        previousPopupId = time + ';' + day;
        var popup = document.createElement('div');
            popup.setAttribute("class", "popup");
            popup.setAttribute("id", time + ';' + day);
            popup.setAttribute('onclick', 'onclick="_dateService.stopPropogation(event)"');
            popup.innerHTML  = `<div class="current-data">${day} T ${time}</div> 
                                <div class="main">
                                        <div class="container">
                                            <h3>Description</h3>
                                            <textarea placeholder="Enter some text !" onclick="_dateService.stopPropogation(event)" class="text-area"> </textarea>
                                        </div>
                                </div>
                                <div class="footer"><button class="btn cancel" onclick=_dateService.deletePopup(event)> Cancel </button>  <button class="btn save"> Save </button> </div>
                                `;  
        var boxElm = document.getElementById(previousPopupId);
        boxElm.appendChild(popup);
    }

    function getBox(r, c, days, type){
        var box = document.createElement('div') ;
        box.setAttribute('class', 'box');
        if(r!=0 && c!=0){ 
            box.setAttribute('id', TIME_SLOTS[r] + ';' + days[c]);  
            box.addEventListener("click", function() {
                clickSpecificCell(TIME_SLOTS[r], days[c]);
            }, false);
        }else{
            if(r == 0 && c >0) {
                box.innerText =   days[c];   
            }
            else if(r >0 && c ==0){
                box.innerText =  TIME_SLOTS[r]   
            }
        }  
        return box;
    }

    function getCalanderEle(){
        return document.querySelector('.calander');
    }
 

    function initializeWeekTable(){ 
        var calanderEle = getCalanderEle();
        calanderEle.innerHTML = '';   
        for(var row=0; row<TIME_SLOTS.length; row++){
            for(var col=0 ;col<_getNextSevenDaysDate.length; col++){ 
                calanderEle.appendChild(getBox(row, col, _getNextSevenDaysDate));
            }
            var br = document.createElement('br') 
            calanderEle.appendChild(br);
        } 
    } 

    // window.onload = initializeWeekTable;
    var init = function(){   
        _getNextSevenDaysDate = getNextSevenDaysDate();
        initializeWeekTable(); 
    }();    
})();