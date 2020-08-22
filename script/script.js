(function() {
    document.querySelector(".menu").addEventListener('click',function(){
        document.querySelector(".navigation").classList.toggle('open');
        document.querySelector(".overlay").classList.toggle('open');
        this.classList.toggle('open-bar')
    });
})();


var modelController = (function(){
    var  data = {
        balance : 0,
        type : "",
        curInvestmentplan:'red',
        minDeposit : {
            green : 1000,
            red : 50
        }
    }


    return{
        newBal : function(bal){
            data.balance = bal;
        },

        newType : function(type){
            data.type = type;
        },

        newData : function(){
            return data;
        },

        getInvestmentPlan : function(){
            return data.curInvestmentplan;
        },

        setInvestmentPlan : function(plan){
            data.curInvestmentplan = plan;
        }


    }
   

})();















var UIController = (function(){
    var domStrings = {
        selectInput : '.coin-select__input',
        coinBalance : '.coin-details__balance',
        amountType : '.amount-type',
        balance : '#coin-balance',
        coin_amount_deposit : '.min-dep',
        radioInput : 'input[name="package"]',
        warning_message:'.message'
    };

    return{

        getInput : function(){
            return document.querySelector(domStrings.selectInput).value;
        },
        
        setType : function (type){
            document.querySelector(domStrings.coinBalance).setAttribute('data-text',type);
            document.querySelector(domStrings.amountType).innerHTML = type;
            document.querySelector(domStrings.balance).setAttribute('data-text',type);
        },

        displayMinDep_Amt : function(plan){
            document.querySelector(domStrings.coin_amount_deposit).placeholder=plan; 
        },

        getAmountValue : function(){
            return parseInt(document.querySelector(domStrings.coin_amount_deposit).value);
        },

        getDomStrings : function () {
            return domStrings;
        },

        toggleWarning : function(boolean){
            var MESSAGE = document.querySelector(domStrings.warning_message);
            var INPUT_BOX = MESSAGE.previousElementSibling;
            var INPUT = MESSAGE.previousElementSibling.firstElementChild;


            
           

           !boolean ? MESSAGE.classList.add('warn') : MESSAGE.classList.remove   ('warn');

            !boolean ? INPUT_BOX.classList.add('warn') : INPUT_BOX.classList.remove('warn');

            if (INPUT.value === "") {
                MESSAGE.classList.remove('warn');
                INPUT_BOX.classList.remove('warn');
            }

          
        

        },

        changeWarnText : function(pckg,amt){

            var NEW_MESSAGE_TEXT = `minimum deposit for ${pckg} Package is ${amt}`;

            document.querySelector(domStrings.warning_message).textContent = NEW_MESSAGE_TEXT;
          
        }

    }

    

})();













var appController = (function (model,view) {

    var setupEventListeners = function(){
        var DOM = view.getDomStrings();
        var inputs = document.querySelectorAll(DOM.radioInput);
        var inputArr = Array.prototype.slice.call(inputs);



        ctrlChangeItem();
        document.querySelector(DOM.selectInput).addEventListener('change',ctrlChangeItem);
        document.querySelector(DOM.coin_amount_deposit).addEventListener('input',ctrlValidateInput);

           inputArr.forEach(function(cur){
               cur.addEventListener('change',function(){
                    // 1. set new investment plan
                        model.setInvestmentPlan(cur.id)

                    // 2. get new investment plan
                        var currentPlan = model.getInvestmentPlan();

                    // 3. change UI minimum deposit
                        ctrlChangeUIDeposit(currentPlan);

                    // 4. Allow package change
                        ctrlValidateInput();


               });
           });

    

    }


    var ctrlChangeItem = function(){

        var item;
        // 1. GET INPUT
        item = view.getInput();

        // 2.  SET MODEL TYPE
        model.newType(item);

        // 3. GET MODEL TYPE
        var newData = model.newData();

        // 4.  SET VIEW TYPE
        view.setType(newData.type);
    };

    var ctrlChangeUIDeposit = function(plan){
        var planValue = model.newData().minDeposit[plan];

        planValue = Math.abs(planValue);

        planValue = planValue.toFixed(2);

        planValue = 'Minimum deposit of $' + planValue;

        view.displayMinDep_Amt(planValue);

    };

    var ctrlValidateInput = function(){
        var type = model.getInvestmentPlan();
        var amt = model.newData().minDeposit[type];
        var  val = view.getAmountValue();

       view.toggleWarning(val > amt);
       view.changeWarnText(type, amt);
    };

    
    return{
        init:function() {
            console.log('App is running');
            setupEventListeners();
            ctrlChangeUIDeposit('red');
        }
    }
    
})(modelController,UIController);

appController.init();
 