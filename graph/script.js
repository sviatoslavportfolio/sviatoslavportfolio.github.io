var graph = { //вершины и линии графа
    nodes: [],
    links: []
};

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
    var bool_rows = true;
    var bool_cols = true;
    var ctrl_rows = 0;
    var ctrl_cols = 0;
    var size = graph.nodes.length;

    for (i = 1; i <= size; i++) { // проверка строк на окончания
        var check = 0;
        for (j = 1; j <= size; j++) {
            if (arr[i][j] == 0) check++;
            ctrl_rows += (check == size ? 1 : 0);
            bool_rows = (ctrl_rows > 1 ? false : true);
        }
    }

    for (i = 1; i <= size; i++) { // проверка колонок на окончания
        var check = 0;
        for (j = 1; j <= size; j++) {
            if (arr[j][i] == 0) check++;
            ctrl_cols += (check == size ? 1 : 0);
            bool_cols = (ctrl_cols > 1 ? false : true);
        }
    }

    if (bool_cols != true || bool_rows != true) {
        return false;
    }
    return true;
}
