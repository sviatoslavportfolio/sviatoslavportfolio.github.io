var x = [];
var xx = [];
var y = [];
var z = [];
var action = "add";
var index = 0;
var quantity = 0;
var direction_first = "right";
var direction_second = "right";
var direction_third = "right";

var first = document.getElementsByClassName("first_s")[0];
first.oninput = function () {
    x = ($(".first_s").val()).split("");
    console.log(x);
};

var second = document.getElementsByClassName("second_s")[0];
second.oninput = function () {
    y = ($(".second_s").val()).split("");
    console.log(y);
};

var get_index = document.getElementsByClassName("index")[0];
get_index.oninput = function () {
    index = get_index.value;
    console.log(index);
}

var get_quantity = document.getElementsByClassName("subt_num")[0];
get_quantity.oninput = function () {
    quantity = get_quantity.value;
    console.log(quantity);
}

$(".first_ctrl").click(function () {
    if (direction_first != this.value) {
        x.reverse();
        $(".first_s").val(x.join(""))
    }
    direction_first = this.value;
    console.log(direction_first);
});


$(".second_ctrl").click(function () {
    if (direction_second != this.value) {
        y.reverse();
        $(".second_s").val(y.join(""))
    }
    direction_second = this.value;
    console.log(direction_second);
});

$(".third_ctrl").click(function () {
    direction_third = this.value;
    console.log(direction_third);
});

$(function () {
    $(".add_subt").click(function () {
        action = (this.value);
        console.log(action);

    });
});

$(".start").click(function () {
    if (action == "add") {
        if ((direction_first == direction_second) & (direction_first == direction_third)) { //r+r=r l+l=l
            while (y.length > 0) {
                z.push(y.pop());
            }
            while (x.length > index) {
                xx.push(x.pop());
                console.log(xx);
            }
            while (z.length > 0) {
                x.push(z.pop());
            }
            while (xx.length > 0) {
                x.push(xx.pop());
            }
            $(".third_s").val(x.join(""));
        } else if ((direction_first == direction_second) & (direction_first != direction_third)) { //r+r=l l+l=r
            while (y.length > 0) {
                z.push(y.pop());
            }
            while (x.length > index) {
                xx.push(x.pop());
                console.log(xx);
            }
            while (z.length > 0) {
                x.push(z.pop());
            }
            while (xx.length > 0) {
                x.push(xx.pop());
            }
            while (x.length > 0) {
                z.push(x.pop());
            }
            $(".third_s").val(z.join(""));
        } else if ((direction_first != direction_second) & (direction_first == direction_third)) { //r+l=r l+r=l
            while (x.length > index) {
                xx.push(x.pop());
                console.log(xx);
            }
            while (y.length > 0) {
                x.push(y.pop());
            }
            while (xx.length > 0) {
                x.push(xx.pop());
            }
            $(".third_s").val(x.join(""));
        } else if ((direction_first != direction_second) & (direction_first != direction_third)) { //r+l=l l+r=r
            while (x.length > index) {
                xx.push(x.pop());
                console.log(xx);
            }
            while (y.length > 0) {
                x.push(y.pop());
            }
            while (xx.length > 0) {
                x.push(xx.pop());
            }
            while (x.length > 0) {
                z.push(x.pop());
            }
            $(".third_s").val(z.join(""));
        }
    } //add end
    else if (action == "subt") {
        if (direction_first == direction_third) {
            while (x.length > index) {
                xx.push(x.pop());
                console.log(xx);
            }
            while (Number(quantity) > 0) {
                xx.pop();
                quantity--;
                console.log(quantity);
            }
            while (xx.length > 0) {
                x.push(xx.pop());
            }
            $(".third_s").val(x.join(""));
        } else if (direction_first != direction_third) {
            while (x.length > index) {
                xx.push(x.pop());
                console.log(xx);
            }
            while (Number(quantity) > 0) {
                xx.pop();
                quantity--;
                console.log(quantity);
            }
            while (xx.length > 0) {
                x.push(xx.pop());
            }
            while(x.length>0){
                z.push(x.pop());
            }
            $(".third_s").val(z.join(""));
        }
    }



});
