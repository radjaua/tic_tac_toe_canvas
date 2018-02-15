;
window.onload = startScript();

function startScript () {
    document.getElementById('beginId').addEventListener('click', start);
    document.getElementById('butt1').addEventListener('click', start);
};

function Grid () {
    this.method = 1; // 1 - крестики, 0 - нолики
    this.canvas = document.getElementById("c1");
    this.ctx = this.canvas.getContext('2d');
    this.isEmpty = [[2, 2, 2], [2, 2, 2], [2, 2, 2]]; // 0 - нолики, 1 - крестики, 2 - пустая клетка
    this.turnCount = 0;
};

Grid.prototype.getCell = function (x, y) {
    return this.isEmpty[x][y];
};

Grid.prototype.displayTurn = function (x, y) {
    var xCoord, yCoord,
        currentThis = this;
    if (x == 0) xCoord = 0;
    if (x == 1) xCoord = 151;
    if (x == 2) xCoord = 301;
    if (y == 0) yCoord = 0;
    if (y == 1) yCoord = 151;
    if (y == 2) yCoord = 301;
    var makeX = function (xCoord, yCoord) {
        currentThis.ctx.beginPath();
        currentThis.ctx.moveTo(xCoord + 20, yCoord + 20);
        currentThis.ctx.lineTo(xCoord + 130, yCoord + 130);
        currentThis.ctx.moveTo(xCoord + 20, yCoord + 130);
        currentThis.ctx.lineTo(xCoord + 130, yCoord + 20);
        currentThis.ctx.stroke();
        currentThis.ctx.closePath();
    };
    var make0 = function (xCoord, yCoord) {
        currentThis.ctx.beginPath();
        currentThis.ctx.arc(xCoord + 75, yCoord + 75, 55, 0, Math.PI * 2);
        currentThis.ctx.stroke();
        currentThis.ctx.closePath();
    };
    if (this.method == 1) {
        makeX (xCoord, yCoord);
    } else {
        make0 (xCoord, yCoord);
    };
};

Grid.prototype.create = function() {
    this.canvas.style.display = 'block';
    document.getElementById('beginId').style.display = "none";
    this.ctx.fillStyle = "#eee";
    this.ctx.beginPath();
    this.ctx.moveTo(0, 150);
    this.ctx.lineTo(450, 150);
    this.ctx.moveTo(0, 300);
    this.ctx.lineTo(450, 300);
    this.ctx.moveTo(150, 0);
    this.ctx.lineTo(150, 450);
    this.ctx.moveTo(300, 0);
    this.ctx.lineTo(300, 450);
    this.ctx.stroke();
    this.ctx.closePath();
};
Grid.prototype.clearCells = function() {
    if (this.isEmpty[0][0] == 2) this.ctx.clearRect(0, 0, 149, 149);
    if (this.isEmpty[1][0] == 2) this.ctx.clearRect(151, 0, 148, 149);
    if (this.isEmpty[2][0] == 2) this.ctx.clearRect(301, 0, 148, 149);
    if (this.isEmpty[0][1] == 2) this.ctx.clearRect(0, 151, 149, 148);
    if (this.isEmpty[1][1] == 2) this.ctx.clearRect(151, 151, 148, 148);
    if (this.isEmpty[2][1] == 2) this.ctx.clearRect(301, 151, 148, 148);
    if (this.isEmpty[0][2] == 2) this.ctx.clearRect(0, 301, 149, 148);
    if (this.isEmpty[1][2] == 2) this.ctx.clearRect(151, 301, 148, 148);
    if (this.isEmpty[2][2] == 2) this.ctx.clearRect(301, 301, 148, 148);
};

Grid.prototype.humanMove = function() {
    var currentThis = this;
    document.getElementById('message').style.display = 'block';
    document.getElementById('message').innerHTML = 'Ваш ход!';
    this.canvas.onmouseout = function() {
        currentThis.clearCells();
    };
    this.canvas.onmousemove = function(event) {
        var x = event.offsetX;
        var y = event.offsetY;
        currentThis.clearCells();
        if ((x>0) && (y>0) && (x<150) && (y<150) && (currentThis.isEmpty[0][0] == 2)) currentThis.ctx.fillRect(0, 0, 149, 149);
        if ((x>151) && (y>0) && (x<299) && (y<150) && (currentThis.isEmpty[1][0] == 2)) currentThis.ctx.fillRect(151, 0, 148, 149);
        if ((x>301) && (y>0) && (x<450) && (y<150) && (currentThis.isEmpty[2][0] == 2)) currentThis.ctx.fillRect(301, 0, 148, 149);
        if ((x>0) && (y>151) && (x<150) && (y<299) && (currentThis.isEmpty[0][1] == 2)) currentThis.ctx.fillRect(0, 151, 149, 148);
        if ((x>151) && (y>151) && (x<299) && (y<299) && (currentThis.isEmpty[1][1] == 2)) currentThis.ctx.fillRect(151, 151, 148, 148);
        if ((x>301) && (y>151) && (x<450) && (y<299) && (currentThis.isEmpty[2][1] == 2)) currentThis.ctx.fillRect(301, 151, 148, 148);
        if ((x>0) && (y>301) && (x<150) && (y<450) && (currentThis.isEmpty[0][2] == 2)) currentThis.ctx.fillRect(0, 301, 149, 148);
        if ((x>151) && (y>301) && (x<299) && (y<450) && (currentThis.isEmpty[1][2] == 2)) currentThis.ctx.fillRect(151, 301, 148, 148);
        if ((x>301) && (y>301) && (x<450) && (y<450) && (currentThis.isEmpty[2][2] == 2)) currentThis.ctx.fillRect(301, 301, 148, 148);
    };
    this.canvas.onmousedown = function(event) {
        var x = event.offsetX,
            y = event.offsetY;
        currentThis.clearCells()
        if ((x>0) && (y>0) && (x<150) && (y<150) && (currentThis.isEmpty[0][0] == 2)) {
            currentThis.isEmpty[0][0] = currentThis.method;
            currentThis.displayTurn (0, 0);
        } else
        if ((x>150) && (x<300) && (y>0) && (y<150) && (currentThis.isEmpty[1][0] == 2)) {
            currentThis.isEmpty[1][0] = currentThis.method;
            currentThis.displayTurn (1, 0);
        } else
        if ((x>300) && (x<450) && (y>0) && (y<150) && (currentThis.isEmpty[2][0] == 2)) {
            currentThis.isEmpty[2][0] = currentThis.method;
            currentThis.displayTurn (2, 0);
        } else
        //
        if ((x>0) && (y>150) && (x<150) && (y<300) && (currentThis.isEmpty[0][1] == 2)) {
            currentThis.isEmpty[0][1] = currentThis.method;
            currentThis.displayTurn (0, 1);
        } else
        if ((x>150) && (x<300) && (y>150) && (y<300) && (currentThis.isEmpty[1][1] == 2)) {
            currentThis.isEmpty[1][1] = currentThis.method;
            currentThis.displayTurn (1, 1);
        } else
        if ((x>300) && (x<450) && (y>150) && (y<300) && (currentThis.isEmpty[2][1] == 2)) {
            currentThis.isEmpty[2][1] = currentThis.method;
            currentThis.displayTurn (2, 1);
        } else
        //
        if ((x>0) && (y>300) && (x<150) && (y<450) && (currentThis.isEmpty[0][2] == 2)) {
            currentThis.isEmpty[0][2] = currentThis.method;
            currentThis.displayTurn (0, 2);
        } else
        if ((x>150) && (x<300) && (y>300) && (y<450) && (currentThis.isEmpty[1][2] == 2)) {
            currentThis.isEmpty[1][2] = currentThis.method;
            currentThis.displayTurn (1, 2);
        } else
        if ((x>300) && (x<450) && (y>300) && (y<450) && (currentThis.isEmpty[2][2] == 2)) {
            currentThis.isEmpty[2][2] = currentThis.method;
            currentThis.displayTurn (2, 2);
        } else return false;
        currentThis.canvas.onmousemove = null;
        currentThis.canvas.onmousedown = null;
        document.getElementById('message').style.display = 'none';
        currentThis.turnCount++;
        var winner = currentThis.isWin();
        if (winner == 2) {
            currentThis.method = (currentThis.method == 1) ? 0 : 1;
            currentThis.computerMove ();
        } else currentThis.showTheEnd(winner);
    };
};

Grid.prototype.isWin = function () {     // 0 - выиграли нолики, 1 - выиграли крестики, 2 - игра не закончена, 3 - ничья
    var i = 0,
        fl = 2;
    if (this.turnCount < 9) {
        if ((this.isEmpty[0][0] != 2) && (this.isEmpty[0][0] == this.isEmpty[1][1]) && (this.isEmpty[0][0] == this.isEmpty[2][2])) {
            fl = this.isEmpty[0][0];
        } else
        if ((this.isEmpty[0][2] != 2) && (this.isEmpty[0][2] == this.isEmpty[1][1]) && (this.isEmpty[0][2] == this.isEmpty[2][0])) {
            fl = this.isEmpty[0][2];
        };
        while ((fl == 2) && (i <= 2)) {
            if ((this.isEmpty[i][0] != 2) && (this.isEmpty[i][0] == this.isEmpty[i][1]) && (this.isEmpty[i][0] == this.isEmpty[i][2])) {
                fl = this.isEmpty[i][0];
            } else
            if ((this.isEmpty[0][i] != 2) && (this.isEmpty[0][i] == this.isEmpty[1][i]) && (this.isEmpty[0][i] == this.isEmpty[2][i])) {
                fl = this.isEmpty[0][i];
            };
            i++;
        };
    } else fl = 3;
    return fl;
};

Grid.prototype.showTheEnd = function (winner) {
    var mess = document.getElementById('message');
    mess.style.display = 'block';
    if (winner == 1) {
        mess.innerHTML = 'Выиграли крестики!';
    } else
        if (winner == 0){
            mess.innerHTML = 'Выиграли нолики!';
        } else mess.innerHTML = 'Ничья!';
    this.turnCount = 0;
    document.getElementById('butt1').style.display = 'block';
};

Grid.prototype.computerMove = function() {
    var i = 0,
        j = 0,
        fl = false,
        alreadyMadeTurn = false;
    // 1. Проверка на выигрыш
    while ((fl == false) && (i <= 2)) {
        j = 0;
        while ((fl == false) && (j <= 2)) {
            if (this.isEmpty[j][i] == 2) {    // Проверяем пустая ли клетка
                this.isEmpty[j][i] = this.method;
                if (this.isWin() == this.method) {
                    fl = true;
                    alreadyMadeTurn = true;
                    this.displayTurn(j, i);
                    console.log ('Сделан ход компьютером по стратегии 1');
                } else {
                    this.isEmpty[j][i] = 2;
                };
            };
            j++;
        };
        i++;
    };
    // 2. Проверка на выигрыш соперника
    if (alreadyMadeTurn == false) {
        var opponentMethod = (this.method == 1) ? 0 : 1;
        i = 0;
        while ((fl == false) && (i <= 2)) {
            j = 0;
            while ((fl == false) && (j <= 2)) {
                if (this.isEmpty[j][i] == 2) {
                    this.isEmpty[j][i] = opponentMethod;
                    if (this.isWin() == opponentMethod) {
                        this.isEmpty[j][i] = this.method;
                        fl = true;
                        alreadyMadeTurn = true;
                        this.displayTurn(j, i);
                        console.log ('Сделан ход компьютером по стратегии 2');
                    } else {
                        this.isEmpty[j][i] = 2;
                    };
                };
                j++;
            };
            i++;
        };
    };
    // 3. Ход в центр, углы или по бокам
    var currentThis = this;
    function tryPut (x, y) {
        if (currentThis.isEmpty[x][y] == 2) {
            currentThis.isEmpty[x][y] = currentThis.method;
            fl = true;
            alreadyMadeTurn = true;
            currentThis.displayTurn(x, y);
            console.log ('Сделан ход компьютером по стратегии 3');
            return false;
        } else return true;
    };
    if (alreadyMadeTurn == false) {
        var sequenceArr = [[1, 1], [0, 0] , [2, 0], [2, 2], [0, 2], [1, 0], [2, 1], [1, 2], [0, 1]],
            i = 0;
        while ((i < sequenceArr.length) && (tryPut(sequenceArr[i][0], sequenceArr[i][1]))) {
            i++;
        };
    };
    this.turnCount++;
    var winner = this.isWin();  // Исправить эту конструкцию
    if (winner == 2) {
        this.method = (this.method == 1) ? 0 : 1;
        this.humanMove();
    } else this.showTheEnd(winner);
};

function start () {
    var grid = new Grid;
    grid.create();
    grid.clearCells();
    document.getElementById('butt1').style.display = 'none';
    if (Math.floor(Math.random() * 2)) {  // 0 - computer, 1 - human
        grid.humanMove ();
    } else {
        grid.computerMove ();
    };
};