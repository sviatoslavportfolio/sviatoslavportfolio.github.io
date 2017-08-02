var rad = document.getElementById('r1');
document.getElementById('r1').oninput = cssGeneratorAll;
var tlr = document.getElementById('tlr');
document.getElementById('tlr').oninput = cssGenerator;
var trr = document.getElementById('trr');
document.getElementById('trr').oninput = cssGenerator;
var blr = document.getElementById('blr');
document.getElementById('blr').oninput = cssGenerator;
var brr = document.getElementById('brr');
document.getElementById('brr').oninput = cssGenerator;

var out = document.getElementById('out');
out.onclick = function () {
    var text = document.getElementById('out').value;
    if (text.length == 0) {} else
        document.getElementsByClassName('tooltip')[0].innerHTML = "Copied!";
}

function cssGenerator() {
    var div = document.getElementById('main');
    var tooltip = document.getElementById('tooltip-block');
    tooltip.style.display = "block";

    //console.log(this.value);




    div.style.borderTopLeftRadius = tlr.value + 'px';
    div.style.borderTopRightRadius = trr.value + 'px';
    div.style.borderBottomLeftRadius = blr.value + 'px';
    div.style.borderBottomRightRadius = brr.value + 'px';



    out.innerHTML = '-webkit-border-radius: ' + tlr.value + 'px ' + trr.value + 'px ' + blr.value + 'px ' + brr.value + 'px;\n';
    out.innerHTML += 'border-radius: ' + tlr.value + 'px ' + trr.value + 'px ' + blr.value + 'px ' + brr.value + 'px;';
}

function cssGeneratorAll() {
    var div = document.getElementById('main');
    var tooltip = document.getElementById('tooltip-block');
    tooltip.style.display = "block";
    var out = document.getElementById('out');


    div.style.borderRadius = rad.value + 'px';

    out.innerHTML = '-webkit-border-radius: ' + this.value + 'px;\n';
    out.innerHTML += 'border-radius: ' + this.value + 'px;';
}
//copy 
$(function () {
    $('#out').click(function () {
        $('#out')[0].select();
        document.execCommand('copy');
        $('#out').append(' ');
        $('#out').val().slice(0, -1);
    });
});
