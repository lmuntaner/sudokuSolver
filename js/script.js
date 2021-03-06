
(function () {
  
  var Sudoku = window.Sudoku = window.Sudoku || {};
  
  var SGame = Sudoku.SGame = function (el) {
    this.$el = $(el);
    this.solverMatrix = [];
    this.sudokuMatrix = [];
    this.loadMatrix();
    this.$el.find("#test-sudoku").on("click", this.testSudoku.bind(this));
    this.$el.find("#fill-solver-matrix").on("click", this.fill.bind(this));
    this.$el.find("div.number-buttons").on("click", "input", this.solveNumber.bind(this));
    this.$el.find("#h-button").on("click", this.horizontals.bind(this));
    this.$el.find("#v-button").on("click", this.verticals.bind(this));
    this.$el.find("#d-button").on("click", this.deepLines.bind(this));
    this.$el.find("#q-button").on("click", this.squares.bind(this));
    this.$el.find("#solve").on("click", this.solve.bind(this));
  };
  
  SGame.prototype.fill = function () {
    this.fillSolverMatrix();
    this.write();
  };
  
  SGame.prototype.horizontals = function () {
    this.fillSolverMatrix();
    this.sumH(true);
    this.write();
  };
  
  SGame.prototype.verticals = function () {
    this.fillSolverMatrix();
    this.sumV(true);
    this.write();
  };
  
  SGame.prototype.deepLines = function () {
    this.fillSolverMatrix();
    this.sumD(true);
    this.write();
  };
  
  SGame.prototype.squares = function () {
    this.fillSolverMatrix();
    this.sumQ(true);
    this.write();
  };
  
  SGame.prototype.solveNumber = function (event) {
    this.fillSolverMatrix();
    var num = parseInt(event.currentTarget.value) - 1;
    this.sumVNumber(num, true);
    this.sumHNumber(num, true);
    // this.sumDNumber(num, true);
    this.sumQNumber(num, true);
    this.write();
  };
  
  // Creates empty matrix for sudoku and 3d Solver Matrix
  SGame.prototype.loadMatrix = function (){
  	for (var i = 0; i < 9; i++) {
  		this.solverMatrix[i] = [];
  		this.sudokuMatrix[i] = [];
  		for (var j = 0; j < 9; j++) {
  			this.solverMatrix[i][j] = [];
  			this.sudokuMatrix[i][j] = 0;
  			for (var k = 0; k < 9; k++) {
  				this.solverMatrix[i][j][k] = -1;
  			};
  		};
  	};
  };

  SGame.prototype.testSudoku = function () {
    var test = [['','','','','','', 1,'', 4],
                ['','','', 7,'', 1, 5,'', 2],
                ['', 1, 2, 8, 6,'','','',''],
                ['','','','', 1,'','','', 9],
                ['', 7,'','','','', 2,'', 8],
                [ 6,'', 9,'','', 2,'', 1, 3],
                ['', 9,'','','','','', 7, 6],
                [ 8,'','', 6,'','','','', 5],
                [ 7, 2,'','', 9,'', 8, 3,'']]
  	for (var i = 0; i < 9; i++) {
  		for (var j = 0; j < 9; j++) {
        var id = i + "-" + j;
        $('#' + id).val(test[i][j]);
  		};
  	};
		this.fillSolverMatrix();
		this.write();
  };
  
  // Fills the tables below the buttons on the html
  SGame.prototype.writeSolverMatrix = function(){
    for (var k = 0; k < 9; k++){
      for (var i = 0; i < 9; i++){
        var horizontalSum = 0;
        for (var j = 0; j < 9; j++){
          document.getElementById("k"+k+"-i"+i+"-j"+j).value = this.solverMatrix[i][j][k];
          horizontalSum += this.solverMatrix[i][j][k];
        }
        document.getElementById("sum-k"+k+"-i"+i).value = horizontalSum;
				if (horizontalSum === -1) {
					$('#sum-k' + k + "-i" + i).addClass("sum--1");
				} else {
					$('#sum-k' + k + "-i" + i).removeClass("sum--1");
				}
      }
      for (var j = 0; j < 9; j++){
        var verticalSum = 0;
        for (var i = 0; i < 9; i++){
          verticalSum += this.solverMatrix[i][j][k];
        }
        document.getElementById("sum-k"+k+"-j"+j).value = verticalSum;
				if (verticalSum === -1) {
					$('#sum-k' + k + "-j" + j).addClass("sum--1");
				} else {
					$('#sum-k' + k + "-j" + j).removeClass("sum--1");
				}
      }
    }
  };

  // Returns the number in that input cell
  SGame.prototype.getNumber = function (id) {
    var i = id[0];
    var j = id[2];
    this.sudokuMatrix[i][j] = document.getElementById(id).value;
    parseInt(this.sudokuMatrix[i][j]);
  };

  // Helper function. Fills the horizontals of solverMatrix with 0
  SGame.prototype.cerosH = function (i, k){
    for (var l = 0; l < 9; l++){
      if(this.solverMatrix[i][l][k] == -1){
        this.solverMatrix[i][l][k] = 0;
      }
    }
  };

  // Helper function. Fills the verticals of solverMatrix with 0
  SGame.prototype.cerosV = function (j, k){
    for (var l = 0; l < 9; l++){
      if(this.solverMatrix[l][j][k] == -1){
        this.solverMatrix[l][j][k] = 0;
      }
    }
  };

  // Helper function. Fills the deep lines of solverMatrix with 0
  SGame.prototype.cerosD = function(i, j){
    for (var l = 0; l < 9; l++){
      if(this.solverMatrix[i][j][l] == -1){
        this.solverMatrix[i][j][l] = 0;
      }
    }
  };

  // Helper function. Fills the square of solverMatrix with 0
  SGame.prototype.cerosQ = function (i, j, k){
    var row = (Math.floor(i/3))*3;
    var col = (Math.floor(j/3))*3;
    for (var l = 0; l < 3; l++){
      for (var h = 0; h < 3; h++){
        if(this.solverMatrix[row+l][col+h][k] == -1){
          this.solverMatrix[row+l][col+h][k] = 0;
        }
      }
    }
  };
  
  //----Omplir les capes amb 0s 1s i -1s------
  SGame.prototype.fillSolverMatrix = function (){					
  	for (var i = 0; i < 9; i++){
  		for (var j = 0; j < 9; j++){
  			var id = i+"-"+j
  			this.getNumber(id);
        $("#" + id).removeClass();
  			if(this.sudokuMatrix[i][j] > 0){
  				var k = this.sudokuMatrix[i][j] - 1;
  				this.solverMatrix[i][j][k] = 1;
  				this.cerosH(i, k);
  				this.cerosV(j, k);
  				this.cerosD(i, j);
  				this.cerosQ(i, j, k);
  			}
  		}
  	}
  };

  // Helper function that takes a row col and value and sets class
  function setClass (i, j, value) {
    var id = "#" + i + "-" + j;
    if(value == -1){
      $(id).addClass("to-set");
    } else {
      $(id).addClass("collateral");
    }
  };
  
  // Looks for the -1 in the horizontals, sets it to 1 and then runs
  // the previous helper functions to set the correspondent 0s
  SGame.prototype.searchSetH = function (i, k, solve){
  	for (var j = 0; j < 9; j++){
      setClass(i, j, this.solverMatrix[i][j][k]);
      if(this.solverMatrix[i][j][k] == -1){
        if (solve) {
          this.solverMatrix[i][j][k] = 1;
          this.cerosH(i, k);
          this.cerosV(j, k);
          this.cerosD(i, j);
          this.cerosQ(i, j, k);
        }
      }
  	}
  };

  // Looks for horizontal lines with sum = -1
  // When finds them, calls searchSetH
  SGame.prototype.sumH = function (solve){
  	for (var i = 0; i < 9; i++){
  		for ( var k = 0; k < 9; k++){
    		var suma = 0;
    		for (var j = 0; j < 9; j++){
    			suma += this.solverMatrix[i][j][k];
    			if(j == 8 && suma == -1){
            this.searchSetH(i, k, solve);
    			}
    		}
  		}
  	}
  };
  
  SGame.prototype.sumHNumber = function (k, solve) {
    for (var i = 0; i < 9; i++){
  		var suma = 0;
  		for (var j = 0; j < 9; j++){
  			suma += this.solverMatrix[i][j][k];
  			if(j == 8 && suma == -1){
          this.searchSetH(i, k, solve);
  			}
  		}
    }
  };

  // Looks for the -1 in the verticals, sets it to 1 and then runs
  // the helper functions to set the correspondent 0s
  SGame.prototype.searchSetV = function (j, k, solve){
  	for (var i = 0; i < 9; i++){
      setClass(i, j, this.solverMatrix[i][j][k]);
      if(this.solverMatrix[i][j][k] == -1){
        if (solve) {
          this.solverMatrix[i][j][k] = 1;
          this.cerosH(i, k);
          this.cerosV(j, k);
          this.cerosD(i, j);
          this.cerosQ(i, j, k);
        }
      }
  	}
  };

  // Looks for vertical lines with sum = -1
  // When finds them, calls searchSetV
  SGame.prototype.sumV = function (solve){
  	for (var j = 0; j < 9; j++){
  		for ( var k = 0; k < 9; k++){
  			var suma = 0;
  			for (var i = 0; i < 9; i++){
  				suma += this.solverMatrix[i][j][k];
  				if(i == 8 && suma == -1){
  					this.searchSetV(j, k, solve);
  				}
  			}
  		}
  	}
  };
  
  SGame.prototype.sumVNumber = function(k, solve) {
  	for (var j = 0; j < 9; j++){
			var suma = 0;
			for (var i = 0; i < 9; i++){
				suma += this.solverMatrix[i][j][k];
				if(i == 8 && suma == -1){
					this.searchSetV(j, k, solve);
				}
			}
  	}
  };

  // Looks for the -1 in the deep lines, sets it to 1 and then runs
  // the helper functions to set the correspondent 0s
  SGame.prototype.searchSetD = function (i, j, solve) {
    setClass(i, j, -1);
  	for (var k = 0; k < 9; k++){
      if (solve) {
    		if(this.solverMatrix[i][j][k] == -1){
    			this.solverMatrix[i][j][k] = 1;
    			this.cerosH(i, k);
    			this.cerosV(j, k);
    			this.cerosD(i, j);
    			this.cerosQ(i, j, k);
    		}
      }
  	}
  };

  // Looks for deep lines with sum = -1
  // When finds them, calls searchSetD
  SGame.prototype.sumD = function (solve) {
  	for (var i = 0; i < 9; i++){
  		for ( var j = 0; j < 9; j++){
  			var suma = 0;
  			for (var k = 0; k < 9; k++){
  				suma += this.solverMatrix[i][j][k];
  				if(k == 8 && suma == -1){
  					this.searchSetD(i, j, solve);
  				}
  			}
  		}
  	}
  };
  
  SGame.prototype.sumDNumber = function (k, solve) {
  	for (var i = 0; i < 9; i++){
  		for ( var j = 0; j < 9; j++){
  			var suma = 0;
  			for (var k = 0; k < 9; k++){
  				suma += this.solverMatrix[i][j][k];
  				if(k == 8 && suma == -1){
  					this.searchSetD(i, j, solve);
  				}
  			}
  		}
  	}
  };

  // Looks for the -1 in the squares, sets it to 1 and then runs
  // the helper functions to set the correspondent 0s
  SGame.prototype.searchSetQ = function (l, h, k, solve){
  	for (var i = l; i < l + 3; i++){
  		for (var j = h; j < h + 3; j++){
        setClass(i, j, this.solverMatrix[i][j][k]);
  			if(this.solverMatrix[i][j][k] == -1){
          if (solve) {
            this.solverMatrix[i][j][k] = 1;
            this.cerosH(i, k);
            this.cerosV(j, k);
            this.cerosD(i, j);
            this.cerosQ(i, j, k);
          }
  			}
  		}
  	}
  };

  // Looks for cells in the square with sum = -1
  // When finds them, calls searchSetQ
  SGame.prototype.sumQ = function (solve) {
  	for (var k = 0; k < 9; k++){
  		for (var l = 0; l < 9; l += 3){
  			for (var h = 0; h < 9; h += 3){
  				var suma = 0;
  				for ( var i = l; i < l + 3; i++){
  					for (var j = h; j < h + 3; j++){
  						suma += this.solverMatrix[i][j][k];
  						if(i == l + 2 && j == h + 2 && suma == -1){
  							this.searchSetQ(l, h, k, solve);
  						}
  					}
  				}	
  			}
  		}
  	}
  };
  
  SGame.prototype.sumQNumber = function (k, solve) {
		for (var l = 0; l < 9; l += 3){
			for (var h = 0; h < 9; h += 3){
				var suma = 0;
				for ( var i = l; i < l + 3; i++){
					for (var j = h; j < h + 3; j++){
						suma += this.solverMatrix[i][j][k];
						if(i == l + 2 && j == h + 2 && suma == -1){
							this.searchSetQ(l, h, k, solve);
						}
					}
				}	
			}
		}
  };

  // Sums the cells value in the solverMatrix
  SGame.prototype.contador = function (){
  	var suma = 0;
  	for (var i = 0; i < 9; i++) {
  		for (var j = 0; j < 9; j++) {
  			for (var k = 0; k < 9; k++) {
  				suma += this.solverMatrix[i][j][k];
  			};
  		};
  	};
  	return suma;
  };

  // Solves the sudoku by checking if there are any horizontals, vertical,
  // deep line or square cell that sum -1. Keeps track a track of the count
  // in order to check if there is any change in each loop.
  // When the count === 81. It means that the sudoku is solved.
  // When there is no change in the count it means that it can't solve
  // the sudoku with these tools.
  SGame.prototype.solve = function (){
  	this.fillSolverMatrix();
  	var count = this.contador();
  	var prevCount = this.contador();
  	do{
  		this.sumH(true);
  		prevCount = count;
  		count = this.contador();
  		if(prevCount == count && count < 81){
  			this.sumV(true);
  			prevCount = count;
  			count = this.contador();
  			if(prevCount == count && count < 81){
  				this.sumD(true);
  				prevCount = count;
  				count = this.contador();
  				if(prevCount == count && count < 81){
  					this.sumQ(true);
  					prevCount = count;
  					count = this.contador();
  				};
  			};
  		};
  	 }while(count != prevCount && count < 81);
	 
  	 if(count == 81){
  		 this.write();
  	 }else{
  		 alert("No s'ha pogut resoldre...");
  		 this.write();
  	 }
  };
	
	// Adds class to the sums that match -1

  // Writes the sudokuMatrix in the sudoku table in the html
  SGame.prototype.write = function (){
    this.writeSolverMatrix();
  	for (var i = 0; i < 9; i++) {
  		for (var j = 0; j < 9; j++) {
  			for (var k = 0; k < 9; k++) {
  				if(this.solverMatrix[i][j][k] == 1){
  					this.sudokuMatrix[i][j] = k + 1;
  				}
  			};
  		document.getElementById(i+"-"+j).value = this.sudokuMatrix[i][j];
  		};
  	};
  };
  
})();