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
        type : ""
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
        }
    }
   

})();

var UIController = (function(){
    var domStrings = {
        selectInput : '.coin-select__input',
        coinBalance : '.coin-details__balance',
        amountType : '.amount-type',
        balace : '#coin-balance',
        transactionBottom : '.bottom',
        depositLink : '.deposit-link',
        withdrawLink : '.withdraw-link'
    };

    return{

        getBottom : function(){
            return document.querySelector(domStrings.transactionBottom);
        },

        deposit : function(element){
        
            element.classList.add('deposit');

        },

        withdraw : function(element){
        
            element.classList.remove('deposit');

        },

        getInput : function(){
            return document.querySelector(domStrings.selectInput).value;
        },

        
        setType : function (type){
                 document.querySelector(domStrings.coinBalance).setAttribute('data-text',type);
                  document.querySelector(domStrings.amountType).innerHTML = type;
                   document.querySelector(domStrings.balace).setAttribute('data-text',type);
          },

        getDomStrings : function () {
            return domStrings;
        }
    }
    

})();

var appController = (function (model,view) {

    var setupEventListeners = function(){
        var DOM = view.getDomStrings();
        document.querySelector(DOM.selectInput).addEventListener('change',ctrlChangeItem);

        ctrlChangeItem();

        document.querySelector(DOM.depositLink).addEventListener('click',toggleTransaction.addDeposit);

        document.querySelector(DOM.withdrawLink).addEventListener('click',toggleTransaction.removeDeposit);

    }

    var toggleTransaction = function(){
        // GET ELEMENT BOTTOM
        var ele = view.getBottom();

       return {
           addDeposit :function(){
               view.deposit(ele);
           },

            removeDeposit :function(){
                view.withdraw(ele);
            }
       };

        
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

    
    return{
        init:function() {
            console.log('App is running');
            setupEventListeners();
        }
    }
    
})(modelController,UIController);

appController.init();
 