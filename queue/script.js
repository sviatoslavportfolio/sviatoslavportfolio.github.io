var x = [];
var y = [];
var z = [];
var action = "add";
var index = 0;
var quantity = 0;
$(".first_q").keyup(
    function () {
        x = ($(".first_q").val()).split("");
        console.log(x);
        $(".index").attr("max", x.length);
    });
$(".second_q").keyup(
    function () {
        y = ($(".second_q").val()).split("");
        console.log(y);
    });
$(function () {
    $(".add_subt").click(function () {
        action = (this.value);
        console.log(action);

    });
});
$(function () {
    $(".subt_num").click(function () {
        this.max = x.length;
        quantity = this.value;
        $(".index").attr("max", this.max - quantity);
        console.log(quantity);
    });
});
$(function () {
    $(".index").click(function () {
        index = this.value;
        console.log(index);
    });
});

$(".start").click(function () {
    if (action == "add" && index == "" || index == x.length) {

        for (i = 0; i < y.length; i++) {
            x.push(y[i]);
            $(".output").val($(".output").val() + "insert(x," + y[i] + ") " + x.join("") + "\n");
        }
    } else if (action == "add" && index != "") {
        var num = x.length;
        for (i = 0; i < index - 1; i++) {

            x.push(x.splice(0, 1));
            $(".output").val($(".output").val() + "!empty(x)?\nx1=remove(x)\ninsert(x,x1) " + x.join("") + "\n");
        }
        for (i = 0; i < y.length; i++) {
            x.push(y[i]);
            $(".output").val($(".output").val() + "insert(x," + y[i] + ") " + x.join("") + "\n");
        }
        for (i = 0; i < (num - (index - 1)); i++) {
            console.log(num);
            console.log(x.length - index - 1);
            x.push(x.splice(0, 1));
            $(".output").val($(".output").val() + "!empty(x)?\nx1=remove(x)\ninsert(x,x1) " + x.join("") + "\n");
        }


    } else if (action == "subt") {
        var len = (x.length) - Number(Number(quantity) + (index - 1));
        for (i = 0; i < index - 1; i++) {

            x.push(x.splice(0, 1));
            $(".output").val($(".output").val() + "!empty(x)?\n x1=remove(x)\ninsert(x,x1) " + x.join("") + "\n");
        }
        for (i = 0; i < quantity; i++) {
            x.splice(0, 1);
            $(".output").val($(".output").val() + "!empty(x)?\nremove(x) " + x.join("") + "\n");
        }

        for (i = 0; i < len; i++) {
            x.push(x.splice(0, 1));
            $(".output").val($(".output").val() + "!empty(x)?\nx1=remove(x)\ninsert(x,x1) " + x.join("") + "\n");
        }
    }

    $(".third_q").val(x.join("")); //вывод в z
});
$(".clear").click(function () { //очистка
    $('.output').val('');
    $("input").val("");
    x.length = 0;
    y.length = 0;
    z.length = 0;
    action = "add";
    index = 0;
    quantity = 0;
});


$("[type='number']").keypress(function (evt) {
    evt.preventDefault(); //отключение клавиатуры
});
