<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<title>
		Sudoku Solver
	</title>

	<meta name="description" content="Sudoku Solver" />
	<meta name="keywords" content="sudoku, sudoku solver, solucionar sudoku, solucionador sudoku, sudokus" />
	<meta name="author" content="Llorenc" />
	<meta http-equiv="content-type" content="text/html;charset=iso-8859-1" />
	<link rel="stylesheet" href="css/normalize.css" type="text/css" media="screen">
	<link rel="stylesheet" href="css/grid.css" type="text/css" media="screen">
	<link rel="stylesheet" href="css/style.css" type="text/css" media="screen">
	<link rel="shortcut icon" type="text/css" href="imagenes/favicon.ico" />

	<script type="text/javascript" src="js/script.js"></script>
	<script type="text/javascript" src="js/jquery.js"></script>
</head>

<body>
	<div class="header">
		<div class="container">
			<h1>Sudoku Solver</h1>
		</div>
	</div>
	
<!-- Sudoku to solve -->

	<div class="container">
		<div class="grid_100 solve">
			<h1>Sudoku to solve</h1>
			<div class="table_sudoku">
				<?php
				echo "<table>";
					for($i = 0; $i < 9; $i++){
						echo "<tr>";
						for ($j = 0; $j < 9; $j++){
							echo "<td";
							if (($j == 3 or $j == 6) and ($i == 3 or $i == 6)){
								echo " class='solve_left solve_top'";
							}else if ($j == 3 or $j == 6){
								echo " class='solve_left'";
							}else if ($i == 3 or $i == 6){
								echo " class='solve_top'";
							}
							echo "><input type='text' name='number' id='". $i ."-" . $j . "' /></td>";
						}
						echo "</tr>";
					}
				echo "</table>";
				?>
			</div>
			<p>This Sudoku Solver tries to imitate what you do when you solve a Sudoku<p>
			<ul>
				<li><span>H</span> means the horizontal</li>
				<li><span>V</span> means the vertical</li>
				<li><span>I</span> means the interior</li>
				<li><span>Q</span> means the square</li>
			</ul>
		</div>
		
<!--- Buttons for actions -->
		
		<div class="grid_100 buttons">
			<input id="fill_button" type="button" name="Fill" value="Fill" onClick="omplir_capes(); escriure(); sum_color();" />
			<input id="h_button" type="button" name="H" value="H" onClick="omplir_capes(); suma_h(); escriure(); write_prova(); sum_color();" />
			<input type="button" name="V" value="V" onClick="omplir_capes(); suma_v(); escriure(); write_prova(); sum_color();" />
			<input type="button" name="I" value="I" onClick="omplir_capes(); suma_i(); escriure(); write_prova(); sum_color();" />
			<input type="button" name="Q" value="Q" onClick="omplir_capes(); suma_q(); escriure(); write_prova(); sum_color();" />
			<input id="solve_button" type="button" name="Solve" value="Solve" onClick="resoldre();" />
		</div>

<!--- Display all the matrixs of the cube -->

		<div class="sudoku_solving">
			<h2>Super Matrix</h2>
			<?php
			for ($k = 0; $k < 9; $k++){
				echo "<div class='grid_33'>";
				echo "<h3>Matrix ". ($k+1) . "</h3>";
				echo "<table>";
					for($i = 0; $i < 9; $i++){
						echo "<tr>";
						for ($j = 0; $j < 9; $j++){
							echo "<td";
							if (($j == 3 or $j == 6) and ($i == 3 or $i == 6)){
								echo " class='solve_left solve_top'";
							}else if ($j == 3 or $j == 6){
								echo " class='solve_left'";
							}else if ($i == 3 or $i == 6){
								echo " class='solve_top'";
							}
							echo "><input type='text' name='test_number' id='k" . $k . "-i". $i ."-j" . $j . "' /></td>";
						}
						echo "<td><input type='text' name='test_sum_h' class='sum' id='sum-k" . $k . "-i" . $i . "' /></td>";
						echo "</tr>";
					}
					for($l = 0; $l < 9; $l++) {
						echo "<td><input type='text' name='test_sum_v' class='sum' id='sum-k" . $k . "-j" . $l . "' /></td>";
					}
				echo "</table>";
				echo "</div>";
			}
			?>
		</div>
	</div>
	<script type="text/javascript">
		function sum_color(){
			for (var k = 0; k < 9; k++){
		    	for (var j = 0; j < 9; j++){
					var sum_v = 0;
					for (var i = 0; i < 9; i++){
						sum_v += capes[i][j][k];
					}
					if (sum_v == -1){
						$("#sum-k"+k+"-j"+j).addClass("sum--1");
					}else{
						$("#sum-k"+k+"-j"+j).removeClass("sum--1");
					}
				}
				for (var i = 0; i < 9; i++){
					var sum_h = 0;
					for (var j = 0; j < 9; j++){
						sum_h += capes[i][j][k];
					}
					if (sum_h == -1){
						$("#sum-k"+k+"-i"+i).addClass("sum--1");
					}else{
						$("#sum-k"+k+"-i"+i).removeClass("sum--1");
					}
				}
			}
		}
	</script>
</body>

</html>
