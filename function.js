const items = document.querySelectorAll(".accordion a");
 
function toggleAccordion(){
  this.classList.toggle('active');
  this.nextElementSibling.classList.toggle('active');
}
 
items.forEach(item => item.addEventListener('click', toggleAccordion));




const i = document.querySelectorAll('div.mm-dropdown .textfirst');
 
function toggleAccordion(){
  this.classList.toggle('active');
  this.nextElementSibling.classList.toggle('active');
}
 
items.forEach(item => item.addEventListener('click', toggleAccordion));



    $(function(){
      var main = $('div.mm-dropdown .textfirst')
      var li = $('div.mm-dropdown > ul > li.input-option')
      var inputOption = $("div.mm-dropdown .option")
      var default_text = 'Select<img src="images/2.png" width= "10px" height="10px" class="down" /> alt=""';
    
    
//  Animaton  
      main.click(function(){
        main.html(default_text);
        li.toggle('fast');
      });

      li.click(function(){

        li.toggle('fast');
        var livalue = $(this).data('value');
        var lihtml = $(this).html();
        main.html(lihtml);
        inputOption.val(livalue);
      });

 });


