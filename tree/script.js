var graph = { //вершины и линии графа
    nodes: [],
    links: []
};

var nodeActionClick = "saveNode";

var text = document.querySelector(".text"); //текстовое поле
var arr; //массив с поля ТЕКСТ

var matrix = []; //матрица смежности

//код обработки
function clear_graph() {
    graph.links = []; //очистка JSON
    graph.nodes = [];

    arr = (text.value.replace(/(\r\n|\n|\r)/gm, "").split(";")).filter(Boolean);
    arr = arr.map(function (array) {
        return array.trim();
    }); //считывание и очистка текста
}

//код заполнения JSON
function make_json() {

    clear_graph(); //очистка графа

    var lin; //вершины к которым идут
    var num; //вершины от которых идут связи
    var arr_of_nodes = []; //масив всех уникальных вершин

    for (i = 0; i < arr.length; i++) {

        num = arr[i].split(":")[0];
        lin = arr[i].split(":")[1].split(",");

        arr_of_nodes.push(num);
        if (lin == "") continue;
        for (k = 0; k < lin.length; k++) { //добавление связей
            var lines = {
                "source": num,
                "target": lin[k]
            };
            graph.links.push(lines);
            arr_of_nodes.push(lin[k]);
        }
    }

    arr_of_nodes = arr_of_nodes.filter(function (elem, index, self) {
        return index == self.indexOf(elem) && elem != undefined;
    }) //фильтр всех вершин(удаление повторов)

    for (f = 0; f < arr_of_nodes.length; f++) { //добавление вершин
        var nodes = {
            "id": arr_of_nodes[f]
        }
        graph.nodes.push(nodes);
    }

    matrix_build(); //матрица смежности
    //start();
    if (check_matrix()) { //проверка матрицы смежности на условия
        text.classList.remove("red");
        start();
    } else {
        text.className += " red";
    }
}

function matrix_build() {
    arr = [];
    var matrix_text = document.querySelector(".matrix"); //поле для матрицы
    var size = graph.nodes.length;

    function create_matrix() {
        for (var i = 1; i <= size; i++) {
            arr[i] = [];
            for (var j = 1; j <= size; j++) {
                arr[i][j] = 0;
            }
        }
    }

    function fill_matrix() {
        for (var key in graph.links) {
            arr[graph.links[key].source][graph.links[key].target] = 1;
            console.log(graph.links[key].source + " " + graph.links[key].target);
        }
    }

    function write_matrix() {
        matrix_text.innerHTML = "";
        for (var i = 1; i <= size; i++) {
            for (var j = 1; j <= size; j++) {
                matrix_text.innerHTML += (arr[i][j] + " ");
            }
            matrix_text.innerHTML += "\n";
        }
    }

    create_matrix();
    fill_matrix();
    write_matrix();
}

function check_matrix() {
    var bool_cols = true;
    var ctrl_cols = 0;
    var size = graph.nodes.length;

    for (i = 1; i <= size; i++) { // проверка колонок на окончания
        var check = 0;
        for (j = 1; j <= size; j++) {
            if (arr[j][i] == 0) check++;
            ctrl_cols += (check == size ? 1 : 0);
            bool_cols = (ctrl_cols > 1 ? false : true);
        }
    }
    return bool_cols;
}

//----------------------------
//===

var radioCheck = document.querySelectorAll(".radioCheck");
for (var rad in radioCheck) {
    radioCheck[rad].onclick = function () {
        nodeActionClick = this.value;
        console.log(nodeActionClick);
    }
}
//===
function deleteNode() { //удаление вершин по клику правой кнопкой
    clk = document.querySelectorAll(".node");
    lineDel = document.querySelectorAll("line");
    var deleteArr = [];
    for (var ob in clk) {
        clk[ob].oncontextmenu = function (e) {
            e.preventDefault();
            var nodeNumber = this.lastChild.innerHTML;

            if (nodeActionClick == "delNode") {
                if (nodeNumber != 1) {
                    findDeleteNodes(nodeNumber);
                    reCountNodes();
                } else {
                    document.querySelector("svg").innerHTML = " ";
                }
            } else {
                delWithSave(nodeNumber);
            }

        }
    }

    function findDeleteNodes(nodeNumber) {
        deleteArr.push(nodeNumber);
        for (var i = 0; i < graph.links.length; i++) {
            if (graph.links[i].source.id == nodeNumber) {
                deleteArr.push(graph.links[i].target.id);
                findDeleteNodes(graph.links[i].target.id);
            }
        }
        deleteArr = deleteArr.filter(function (elem, index, self) {
            return index == self.indexOf(elem) && elem != undefined;
        }); //фильтр всех вершин(удаление повторов)
        console.log(deleteArr);
        deleteNodes(deleteArr);
    }


    function deleteNodes(deleteArr) {
        for (var i = 0; i < clk.length; i++) {
            if (deleteArr.includes(clk[i].lastChild.innerHTML)) {
                lineDel[i - 1].style.display = "none";
                clk[i].setAttribute("data-dis", "none");
                clk[i].style.display = "none";
            }
        }
    }

    function reCountNodes() {
        var count = 1;
        for (var p = 0; p < clk.length; p++) {

            if (clk[p].getAttribute("data-dis") != "none") {
                clk[p].lastChild.innerHTML = count;
                count++;
            }
        }
    }

    function delWithSave(nodeNumber) {
        var textLinks = "";
        var sourseArr = [];
        var parentNode;
        for (var i = 0; i < graph.links.length; i++) {
            if (graph.links[i].target.id == nodeNumber) {
                parentNode = graph.links[i].source.id;
                parentNodeIndex = graph.links[i].source.index;
                graph.links.splice(i, 1);
            }
        }
        for (var i = 0; i < graph.links.length; i++) {
            if (graph.links[i].source.id == nodeNumber) {
                graph.links[i].source.id = parentNode;
                graph.links[i].source.index = parentNodeIndex;
            }
        }
        graph.nodes.splice(nodeNumber - 1, 1);

        for (var i = 0; i < graph.links.length; i++) {
            graph.links[i].target.id = String(i + 1);
        }
        for (var i = 0; i < graph.links.length; i++) {
            if (graph.links[i].source.id != parentNode) {
                graph.links[i].source.id = String(i + 1);
            }

        }

        for (var i = 0; i < graph.nodes.length; i++) {
            graph.nodes[i].id = String(i + 1);
        }

        function buildText() {
            for (var i = 0; i < graph.links.length; i++) {
                sourseArr.push(graph.links[i].source.id);
            }
            sourseArr = sourseArr.filter(function (elem, index, self) {
                return index == self.indexOf(elem) && elem != undefined;
            })
            console.log(sourseArr);
            for(var i=0;i<sourseArr.length;i++){
                textLinks+=sourseArr[i]+":";
                for(var j=0;j<graph.links.length;j++){
                    if(graph.links[j].source.id==sourseArr[i]){
                        textLinks+=graph.links[j].target.id+",";
                    }
                }
                textLinks=textLinks.slice(0, -1);
                textLinks+=";\n";
            }
            text.innerHTML=textLinks;
        }
        buildText();
    }

};
