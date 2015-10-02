'use strict';

$(document).ready(init);
function init(){
  var currentVal = '';
  var runningVal = null;
  var $operand = null;
  $('.number').click(onNumber);
  $('.operand').click(grandMasterFunktion);
  $('#clear').click(clear);
  $('#clear').dblclick(totalClear)
  $('#negative').click(onNegative);
  $('#percentage').click(onPercentage);

  function onNumber(){
    if (currentVal.length < 13){
      if($operand === 'equals' || runningVal === 'error'){
        runningVal = null;
      }
      var $val = $(this).data('id');
      if ((currentVal.indexOf('.') !== -1) && ($val === '.')){
        return;
      }
      currentVal += $val.toString();
      changeDisplay(currentVal);
    }
  }

  function grandMasterFunktion(){
    if (currentVal !== ''){
      var cVal = parseFloat(currentVal);
      if (runningVal !== null){
        switch ($operand) {
          case 'divide':
          if (cVal){
            runningVal /= cVal;
          }
          else{
            runningVal = 'error';
            currentVal = ''
            $operand = null
          }
          break;
          case 'multiply':
          runningVal *= cVal;
          break;
          case 'subtract':
          runningVal -= cVal;
          break;
          case 'addition':
          runningVal += cVal;
          break;
        }
        changeDisplay(runningVal);
      }
      else{
        runningVal = cVal;
      }
    };
    $operand = $(this).data('id');
    currentVal = '';
  }

  function clear(){
    currentVal = '';
    changeDisplay('0');
  }

  function totalClear(){
    currentVal = "";
    runningVal = null
    $operand = null;
    changeDisplay('0')
  }

  function onNegative(){
    var negativeVal = parseFloat(getHolderVal())*(-1);
    if (currentVal !== ''){
      currentVal = negativeVal;
    }else {
      runningVal = negativeVal;
    }
    changeDisplay(negativeVal)
  }

  function onPercentage(){
    var percentageVal = parseFloat(getHolderVal())/100;
    if (currentVal !== ''){
      currentVal = percentageVal;
    }else {
      runningVal = percentageVal;
    }
    changeDisplay(percentageVal);
  }

  function getHolderVal(){
    return $('#currentVal').text()
  }

  function changeDisplay(value){
    $('#currentVal').text(value);
  }
};
