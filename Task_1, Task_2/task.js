// ֆունկցիա, որը վերադարձնում է մեկ պատահական ամբողջ թիվ [0,100]միջակայքում

function randomnumber(){
    return (Math.random()*100).toFixed(1)
}
randomnumber();

// Գրեք ֆունկցիա, որը կգտնի արդյո՞ք կետը ընկած է շրջանից ներս թե դուրս

function in_circle(x_center,y_center,r,x,y){
    return Math.pow((x-x_center),2) + Math.pow((y-y_center),2) < Math.pow(r,2)
}