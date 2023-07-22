//permite recibir y crear los contenedores de datos de la matriz
function ingresarMatrices() {
	// Obtenemos el número de filas y columnas ingresadas por el usuario
	const filas = parseInt(document.getElementById("filas").value);
	const columnas = parseInt(document.getElementById("columnas").value);
	// Creamos campos de entrada para las matrices A y B
	crearCamposDeEntrada("matrixA", filas, columnas);
	crearCamposDeEntrada("matrixB", filas, columnas);
	// Mostramos el contenedor de matrices
	document.getElementById("matricesContainer").style.display = "block";
}
	// Crea los campos de entrada para la matriz
function crearCamposDeEntrada(matrixId, filas, columnas) {
	// Obtenemos el elemento de la tabla de la matriz por su id
	const table = document.getElementById(matrixId);
	table.innerHTML = "";
	// Creamos los campos de entrada para cada celda de la matriz
	for (let i = 0; i < filas; i++) {
		const row = document.createElement("tr");

		for (let j = 0; j < columnas; j++) {
			const cell = document.createElement("td");
			const input = document.createElement("input");
			input.type = "number";
			cell.appendChild(input);
			row.appendChild(cell);
		}

		table.appendChild(row);
	}
}
// Función para sumar las matrices A y B
function sumarMatrices() {
	const matrixA = obtenerValoresMatriz("matrixA");
	const matrixB = obtenerValoresMatriz("matrixB");
	 // Verificamos que las matrices tengan las mismas dimensiones antes de sumarlas
	if (!validarDimensionesMatrices(matrixA, matrixB)) {
		alert("Las matrices deben tener las mismas dimensiones");
		return;
	}
	 // Realizamos la suma de las matrices y mostramos el resultado
	const resultado = sumar(matrixA, matrixB);
	mostrarResultado(resultado);
}
// Función para restar las matrices A y B
function restarMatrices() {
	const matrixA = obtenerValoresMatriz("matrixA");
	const matrixB = obtenerValoresMatriz("matrixB");
// Verificamos que las matrices tengan las mismas dimensiones antes de restarlas
	if (!validarDimensionesMatrices(matrixA, matrixB)) {
		alert("Las matrices deben tener las mismas dimensiones");
		return;
	}
	// Realizamos la resta de las matrices y mostramos el resultado
	const resultado = restar(matrixA, matrixB);
	mostrarResultado(resultado);
}
// Función para multiplicar las matrices A y B
function multiplicarMatrices() {
	const matrixA = obtenerValoresMatriz("matrixA");
	const matrixB = obtenerValoresMatriz("matrixB");
// Verificamos que las matrices cumplan la condición para multiplicarlas
	if (matrixA[0].length !== matrixB.length) {
		alert(
			"La cantidad de columnas de la matriz A debe ser igual a la cantidad de filas de la matriz B"
		);
		return;
	}
	// Realizamos la multiplicación de las matrices y mostramos el resultad
	const resultado = multiplicar(matrixA, matrixB);
	mostrarResultado(resultado);
}
// Función para calcular la matriz inversa de A
function calcularInversa() {
	const matrixA = obtenerValoresMatriz("matrixA");
	// Verificamos que la matriz A sea cuadrada para calcular su inv
	if (matrixA.length !== matrixA[0].length) {
		alert("La matriz debe ser cuadrada para calcular la inversa");
		return;
	}

	const inversa = invertirMatriz(matrixA);
	// Verificamos si la matriz tiene inversa y mostramos el resultado
	if (!inversa) {
		alert("La matriz no tiene inversa");
		return;
	}

	mostrarResultado(inversa);
}
// Función para calcular la matriz transpuesta de A
function calcularTranspuesta() {
	const matrixA = obtenerValoresMatriz("matrixA");
	// Calculamos la matriz transpuesta de A
	const transpuesta = transponerMatriz(matrixA);
	// Mostramos resultadp
	mostrarResultado(transpuesta);
}
// Función para obtener los valores de la matriz desde los campos de entrada
function obtenerValoresMatriz(matrixId) {
	const matrix = [];

	const table = document.getElementById(matrixId);
	const rows = table.getElementsByTagName("tr");
	  // Iteramos por cada fila de la matriz
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];
		const inputs = row.getElementsByTagName("input");
		const rowData = [];
		// Iteramos por cada columna de la fila
		for (let j = 0; j < inputs.length; j++) {
			 // Obtenemos el valor numérico de cada columna y lo agregamos a la fila
			const inputValue = parseFloat(inputs[j].value);
			rowData.push(inputValue);
		}
		 // Agregamos la fila a la matriz
		matrix.push(rowData);
	}
	// Retornamos la matriz con los valores ingresados
	return matrix;
}
// Función para validar que las matrices tengan las mismas dimensiones
function validarDimensionesMatrices(matrixA, matrixB) {
	if (
		matrixA.length !== matrixB.length ||
		matrixA[0].length !== matrixB[0].length
	) {
		return false;
	}

	return true;
}
// Funciones para realizar operaciones con matrices (suma, resta, multiplicación)

function sumar(matrixA, matrixB) {
	const resultado = [];

	for (let i = 0; i < matrixA.length; i++) {
		const row = [];

		for (let j = 0; j < matrixA[i].length; j++) {
			const sum = matrixA[i][j] + matrixB[i][j];
			row.push(sum);
		}

		resultado.push(row);
	}

	return resultado;
}

function restar(matrixA, matrixB) {
	const resultado = [];

	for (let i = 0; i < matrixA.length; i++) {
		const row = [];

		for (let j = 0; j < matrixA[i].length; j++) {
			const difference = matrixA[i][j] - matrixB[i][j];
			row.push(difference);
		}

		resultado.push(row);
	}

	return resultado;
}

function multiplicar(matrixA, matrixB) {
	const resultado = [];

	for (let i = 0; i < matrixA.length; i++) {
		const row = [];

		for (let j = 0; j < matrixB[0].length; j++) {
			let sum = 0;

			for (let k = 0; k < matrixA[0].length; k++) {
				sum += matrixA[i][k] * matrixB[k][j];
			}

			row.push(sum);
		}

		resultado.push(row);
	}

	return resultado;
}
//gauss 
function invertirMatriz(matriz) {
	const n = matriz.length; // Obtenemos la dimensión de la matriz
	const matrizAumentada = new Array(n); // Creamos una nueva matriz con n filas
	for (let i = 0; i < n; i++) {
	
	  matrizAumentada[i] = matriz[i].concat(new Array(n).fill(0)); // Concatenamos una fila de ceros a la derecha de cada fila de la matriz original
	  matrizAumentada[i][n + i] = 1; // Agregamos un 1 en la posición diagonal correspondiente a la fila i
	}
  
	for (let i = 0; i < n; i++) {
	  // Iteramos por cada fila de la matriz 
	  const pivot = matrizAumentada[i][i]; // Obtenemos el pivote (el elemento diagonal correspondiente a la fila i)
	  if (pivot === 0) {
		return null; // Si el pivote es cero, la matriz no es invertible y retornamos null
	  }
	  	// Iteramos por cada columna de la matriz aumentada
	  for (let j = 0; j < 2 * n; j++) {
	
		matrizAumentada[i][j] /= pivot; // Dividimos todos los elementos de la fila i por el pivote
	  }
  
	  for (let j = 0; j < n; j++) {
		// Iteramos por cada fila de la matriz aumentada, excepto la fila i
		if (j === i) continue; // Saltamos la iteración si estamos en la fila i
		const scale = matrizAumentada[j][i]; // Obtenemos el factor de escala
		for (let k = 0; k < 2 * n; k++) {
		  // Iteramos por cada columna de la matriz aumentada
		  matrizAumentada[j][k] -= scale * matrizAumentada[i][k]; // Restamos la fila i multiplicada por el factor de escala a la fila j
		}
	  }
	}
  // Extraemos la matriz inversa de la matriz aumentada
  const matrizInversa = new Array(n);
  for (let i = 0; i < n; i++) {
    matrizInversa[i] = matrizAumentada[i].slice(n);
  }
  return matrizInversa; // Retornamos la matriz inversa
}

// Función para transponer una matriz
function transponerMatriz(matrix) {
	// Creamos un array vacío para almacenar la matriz transpuesta
	const transpuesta = [];
  
	// Bucle externo para recorrer las columnas de la matriz original
	for (let i = 0; i < matrix[0].length; i++) {
	  // Creamos un array vacío para almacenar una fila de la matriz transpuesta
	  const row = [];
  
	  // Bucle para recorrer las filas de la matriz original
	  for (let j = 0; j < matrix.length; j++) {

		// Intercambiamos los índices i y j para realizar la transposición
		const elementoTranspuesto = matrix[j][i];
  
		// Agregamos el elemento a la fila de la matriz transpuesta
		row.push(elementoTranspuesto);
	  }
  
	  // Agregamos la fila completa a la matriz transpuesta, completando así una columna
	  transpuesta.push(row);
	}
  
	// Retornamos la matriz transpuesta
	return transpuesta;
  }
  
// Función para mostrar el resultado de las operaciones en la tabla resultado
function mostrarResultado(resultado) {
	const table = document.getElementById("resultado");
	table.innerHTML = "";
	 // Iteramos por cada fila del resultado
	for (let i = 0; i < resultado.length; i++) {
		const row = document.createElement("tr");
		// Iteramos por cada columna de la fila
		for (let j = 0; j < resultado[i].length; j++) {
			const cell = document.createElement("td");
			 // Asignamos el valor de cada columna a la tabla de resultado
			cell.textContent = resultado[i][j];
			row.appendChild(cell);
		}
		 // Agregamos la fila a la tabla de resultado
		table.appendChild(row);
	}

	function resolverIntegral() {
		const integralInput = document.getElementById("integral").value;

		try {
			// Utilizamos la función eval() para evaluar la expresión ingresada
			const resultado = eval(integralInput);
			document.getElementById(
				"resultadoIntegral"
			).textContent = `La integral de ${integralInput} es: ${resultado}`;
		} catch (error) {
			document.getElementById("resultadoIntegral").textContent =
				"Error al resolver la integral";
		}
	}
}



//funcion integral (trapecios)
function calcularIntegral() {
	//obtener el valor del html 
	const funcionString = document.getElementById("funcion").value
	.replace(/\s+/g, "") //quitar espacios
	.replace(/(\d+)([a-zA-Z])/g, "$1*$2") //funcion que permita si hay 5x convertirlo en 5*x
	.replace(/([a-zA-Z]+)(\d)/g, "$1*$2") //funcion que permita si hay x5 convertirlo en x*5
	.replace(/([a-zA-Z])([a-zA-Z])/g, "$1*$2") //funcion que permita multiplicar x*x cuando se de xx
	.replace(/([a-zA-Z])([a-zA-Z])/g, "$1*$2") //funcion que repite el proceso ya que toma solo dos variabls (xxx sin esta funcion seria x*xx)
	.replace(/([a-zA-Z])/g, "x") //reemplazar cualquier valor no numerico de la A a la Z a "x"
	.replace(/(\w+)\^(\d+)/g, (match, variable, exponente) => { //funcion que permita obtener cualquier ocurrencia de una o mas letras o numeros seguidos de "^" y elevarlos al valor del siguiente digito numerico
	  let resultado = variable;
	  for (let i = 1; i < exponente; i++) {
		resultado += "*" + variable;
	  }
	  return resultado;
	})
	.replace(/([a-zA-Z])/g, "x"); //reemplazar cualquier valor no numerico de la A a la Z a "x"
  
	//obtener las variables del html
	const ix = parseFloat(document.getElementById("ix").value); //limite inferior
	const sx = parseFloat(document.getElementById("sx").value); //limite superior
	const n = parseFloat(document.getElementById("n").value); //numero de trapecios a utilizar
	const divIntegral = document.getElementById("resultadoIntegral");
	const funcion = new Function("x", "return " + funcionString); //funcion para obtener la una funcion f(x) dada por el usuario
	divIntegral.innerHTML = ""; //refrezcar el hrml del div integral para ser reutilizado
	document.getElementById("resultadoIntegralDiv").innerHTML = ""; //refrezcar el hrml del div del resultado de la integral para ser reutilizado
  
	try {
	  const resultado = integral(funcion, ix, sx, n); //intenta realizar la operacion de la integral
	  divIntegral.innerHTML = resultado.toFixed(6); //convierte el resultado para 6 decimales
	} catch (error) {
	  err(error); //si no se obtiene la integral da error
	}
	//imprimir el resultado
	const funcionObtenida = document.createElement("p"); 
	funcionObtenida.textContent = `Como el sistema ve la funcion: ${funcionString}`;
	divIntegral.appendChild(funcionObtenida);
  }
  
//funcion que realiza los calculos
function integral(funcion, limitebajo, limitealto, n) {

	const h = (limitealto - limitebajo) / n; //longitud del intervalo
	let sum = 0;

	for (let i = 1; i < n; i++) { //se itera tantas veces como trapezoides hayan
		const x = limitebajo + i * h; //calculo del punto medio del trapecio actual
		sum += funcion(x); //sumatoria de todos los puntos medios de cada trapecio
	}
	return h * (0.5 * (funcion(limitebajo) + funcion(limitealto)) + sum); //calculo y retorno del area total bajo la curva
}

//funcion para manejo de errores
function err(x) {
	const resultadoIntegralDiv = document.getElementById("resultadoIntegralDiv");
	resultadoIntegralDiv.innerHTML = "";
	const titulo = document.createElement("h2");
	titulo.textContent = `Error al realizar la operacion >>> ${x}`;
	resultadoIntegralDiv.appendChild(titulo);
}

//método de newton-raphson

function calcularRaiz() {
	//declaracion de variables
	const valor_raiz = parseFloat(document.getElementById("raiz").value);
	const n = parseFloat(document.getElementById("nr").value);
	const tolerancia = parseFloat(document.getElementById("err").value);
	const iteraciones = parseFloat(document.getElementById("it").value);
	//calculamos resultado utilizando la funcion
	const resultado = raiz(valor_raiz, tolerancia, iteraciones, n);
	//escribimos el resultado en el html en caso de que no haya dado un error
	if (resultado !== null) {
	  document.getElementById("resultadoRaiz").innerHTML = resultado.toFixed(5);
	} else {
	  document.getElementById("resultadoRaiz").innerHTML = "Error";
	}
  }
  
  function raiz(numero, tolerancia, maxIteraciones, n) {
	const resultadoRaizDiv = document.getElementById("resultadoRaizDiv");
	resultadoRaizDiv.innerHTML = "";
	//mandar error si se usa un numero negativo
	if (numero < 0) {
	  errRaiz(1);
	  return null;
	}
	let x = 1, error = 1, it = 0;
  
	// iterar hasta alcanzar la tolerancia o el número máximo de iteraciones
	while (error > tolerancia && it < maxIteraciones) {
	  // calcular la siguiente aproximación de la raíz
	  let fx = potencia(x, n) - numero;
	  let dfx = n * potencia(x, n-1);
	  let xPrevio = x;
	  x = x - fx/dfx;
  
	  // calcular el error relativo
	  error = Math.abs((x - xPrevio) / x);
  
	  it++;
	}
  
	// si se alcanzó el número máximo de iteraciones sin encontrar la raíz, mostrar error
	if (it === maxIteraciones && error > tolerancia) {
	  errRaiz(2);
	  return x;
	}
  
	return x;
  }
  
  //funcion para obtener el exponente de un elemento
  function potencia(base, exponente) {
	let resultado = 1;
	for (let i = 0; i < exponente; i++) {
	  resultado *= base;
	}
	return resultado;
  }
  
  //funcion para tratamiento de errores
  function errRaiz(x) {
	const resultadoRaizDiv = document.getElementById("resultadoRaizDiv");
	const titulo = document.createElement("p");
  
	//error cuando la raiz tiene un valor negativo
	if (x === 1) {
	  titulo.textContent = "Error, no se pueden utilizar numeros negativos";
	  
	  //error cuando la raiz alcanzo el limite de iteraciones
	} else if (x === 2) {
	  titulo.textContent = "Error, no se ha podido obtener la raiz en el numero de iteraciones dadas";
	}
	resultadoRaizDiv.appendChild(titulo);
  }
  

  

export {
	ingresarMatrices, 
	sumarMatrices, 
	restarMatrices,
	multiplicarMatrices,
	calcularInversa,
	calcularTranspuesta,
	calcularIntegral,
	calcularRaiz,
}