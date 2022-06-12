var numToCoord = {
	1: "a",
	2: "b",
	3: "c",
	4: "d",
	5: "e",
	6: "f",
	7: "g",
	8: "h",
	9: "i",
	10: "j",
	a: 1,
	b: 2,
	c: 3,
	d: 4,
	e: 5,
	f: 6,
	g: 7,
	h: 8,
	i: 9,
	j: 10
};

var place = {
	
};

let available = "Yes";

var Player1Blocked = [];

var PlayerTaken = {
	Player1: {},
	Player2: {}
};

var PlayerGuessed = {
	Player1: {},
	Player2: {}
};

var PlayerHit = {
	Player1: {},
	Player2: {}
};

var PlayerSunk = {
	Player1: {},
	Player2: {}
};

var AvailableShips = {
	Player1: {
		length4: 1,
		length3: 2,
		length2: 3,
		length1: 4
	},
	Player2: {
		length4: 1,
		length3: 2,
		length2: 3,
		length1: 4
	}
};

let lenght = 4;
let orientation = 4;
var playing = 1;
var erase = false;
var ShipNumericId = 0;
var NoShips = 0;
var LayingShips = 1;
var Guessing = false;

function AvailableCheck(boardrow, boardcol) {
	boardrow = boardrow - 1;
	boardcol = boardcol - 1;
	
	for (let b = 0; b < 9; b++){
		let boardrowb = boardrow + (b-b%3)/3;
		let boardcolb = boardcol + b%3;
		
		if (boardrowb < 1 || boardrowb > 10 || boardcolb < 1 || boardcolb > 10) {
				//Ne dogadja se nista, ta polja ne postoje
			}
		else {
			boardrowb = numToCoord[boardrowb];
			boardcolb = boardcolb.toString();
			let idb = boardrowb + boardcolb;
			let CurrentPlayerName = "Player"+playing.toString();
			if (idb in PlayerTaken[CurrentPlayerName] == true) {
				available = "No"; //Ako bi brod bio susedan drugom brodu
			}
			else{
				//Nista se ne dogadja
			}
		}
	}
}

function ChooseShip(a) {
	erase = false;
	lenght = a;
}

function RotateShip() {
	orientation = orientation % 4 + 1;
}

function RemoveShip() {
	erase = true;
	lenght = 0;
}

function Continue() {
	playing = playing%2 + 1;
	NoShips = 0;
	
	let DirtyTiles = Array.from(document.getElementsByClassName("brod"));
		
		DirtyTiles.forEach(DirtyTile => {
				DirtyTile.classList.remove(DirtyTile.classList.item(2));
				DirtyTile.classList.remove("brod");
		});
	
	if (LayingShips < 2) {
		
		document.getElementById("Ship1Selector").classList.remove("grayedOut");
		document.getElementById("Ship1Selector").onclick(ChooseShip("1"));
		document.getElementById("Ship2Selector").classList.remove("grayedOut");
		document.getElementById("Ship2Selector").onclick(ChooseShip("2"));
		document.getElementById("Ship3Selector").classList.remove("grayedOut");
		document.getElementById("Ship3Selector").onclick(ChooseShip("3"));
		document.getElementById("Ship4Selector").classList.remove("grayedOut");
		document.getElementById("Ship4Selector").onclick(ChooseShip("4"));
		
		document.getElementById("Ship1").classList.add("invisible");
		setTimeout(() => document.getElementById("Ship1").innerHTML = "4", 200);
		setTimeout(() => document.getElementById("Ship1").classList.remove("invisible"), 200);
		
		document.getElementById("Ship2").classList.add("invisible");
		setTimeout(() => document.getElementById("Ship2").innerHTML = "3", 200);
		setTimeout(() => document.getElementById("Ship2").classList.remove("invisible"), 200);
		
		document.getElementById("Ship3").classList.add("invisible");
		setTimeout(() => document.getElementById("Ship3").innerHTML = "2", 200);
		setTimeout(() => document.getElementById("Ship3").classList.remove("invisible"), 200);
		
		document.getElementById("Ship4").classList.add("invisible");
		setTimeout(() => document.getElementById("Ship4").innerHTML = "1", 200);
		setTimeout(() => document.getElementById("Ship4").classList.remove("invisible"), 200);
		
		LayingShips = LayingShips + 1;
	}
	else {
		document.getElementById("subCard").classList.add("offScreen");
		Guessing = true;
	}
	
	document.getElementById("ContinueButton").classList.add("offScreen");
}

document.getElementById("board").addEventListener("click", function(event){
	
	let CurrentPlayerName = "Player"+playing.toString();
	
	if (Guessing == true) {
		let CurrentOpponentName = "Player" + (playing%2 + 1).toString();
		console.log(CurrentOpponentName);
		let GuessedTile = event.target.id;
		
		if (GuessedTile in PlayerGuessed[CurrentPlayerName] == true) {
		}
		
		else {
			if (GuessedTile in PlayerTaken[CurrentOpponentName] == true){
				document.getElementById(GuessedTile).classList.add("hit");
			}
			else {
				document.getElementById(GuessedTile).classList.add("miss");
			}
		}
	}
	
	else {
		if (erase == true) {
			let ClickedTile = event.target.id;
			let ClickedClass = document.getElementById(ClickedTile).classList[2];
			let ClickedClassTiles = Array.from(document.getElementsByClassName(ClickedClass));
			let ShipLength = ClickedClass.substring(7,14);
			let ShipLengthValue = ClickedClass.substring(13,14);
			let Ship = "Ship"+ShipLengthValue;
			
			ClickedClassTiles.forEach(ClickedClassTile => {
				delete PlayerTaken[CurrentPlayerName][ClickedClassTile.id];
				ClickedClassTile.classList.remove(ClickedClass);
				ClickedClassTile.classList.remove("brod");
			});
			
			if (AvailableShips[CurrentPlayerName][ShipLength] == 0) {
				let ShipSelector = Ship + "Selector";
				document.getElementById(ShipSelector).classList.remove("grayedOut");
				document.getElementById(ShipSelector).onclick(ChooseShip(ShipLengthValue));
				erase = true;
				lenght = 0;
				
				if (NoShips == 4) {
					document.getElementById("ContinueButton").classList.add("offScreen");
				}
				else {}
				NoShips = NoShips - 1;
			}
			
			AvailableShips[CurrentPlayerName][ShipLength] = AvailableShips[CurrentPlayerName][ShipLength] + 1;
			
			document.getElementById(Ship).classList.add("invisible");
			setTimeout(() => document.getElementById(Ship).innerHTML = AvailableShips[CurrentPlayerName][ShipLength], 200);
			setTimeout(() => document.getElementById(Ship).classList.remove("invisible"), 200);
		}
		
		else {
			let ShipLength = "length"+lenght.toString();
			let ShipNumber = "number" + ShipNumericId.toString();
			let ShipClass = CurrentPlayerName+ShipLength+ShipNumber;
			let SelectedTiles = document.getElementsByClassName("hover");
			let SelectedTile;
			
			ShipNumericId = ShipNumericId+1;
			
			if (SelectedTiles.length > 0) {
				let ShipLength = "length"+lenght.toString();
				AvailableShips[CurrentPlayerName][ShipLength] = AvailableShips[CurrentPlayerName][ShipLength] - 1;
				
				let Ship = "Ship"+lenght.toString();
				
				document.getElementById(Ship).classList.add("invisible");
				setTimeout(() => document.getElementById(Ship).innerHTML = AvailableShips[CurrentPlayerName][ShipLength], 200);
				setTimeout(() => document.getElementById(Ship).classList.remove("invisible"), 200);
				
				console.log(AvailableShips[CurrentPlayerName]);
				
				if (AvailableShips[CurrentPlayerName][ShipLength] == 0) {
					let ShipSelector = "Ship"+lenght.toString()+"Selector";
					document.getElementById(ShipSelector).classList.add("grayedOut");
					document.getElementById(ShipSelector).onclick("");
					console.log("Hello");
					NoShips = NoShips + 1;
					if (NoShips == 4) {
						document.getElementById("ContinueButton").classList.remove("offScreen");
					}
					else {}
				}
			}
			else {}
			
			for (let a = 0; a < lenght; a++) {
				SelectedTile = SelectedTiles[a].id;
				PlayerTaken[CurrentPlayerName][SelectedTile] = ShipClass;
				document.getElementById(SelectedTile).classList.add("brod");
				document.getElementById(SelectedTile).classList.add(ShipClass);
			}
			
			for (let a = 0; a < lenght; a++) {
				SelectedTile = SelectedTiles[0].id;
				document.getElementById(SelectedTile).classList.remove("hover");
			}
		}
	}
}, false);

document.getElementById("board").addEventListener("mouseover", function(event) {
	
	if (Guessing == true) {
		let id = event.target.id;
		document.getElementById(id).classList.add("aiming");
	}
	
	else {
		if (erase == true) {
		}
		
		else { //Ako se ne brise nego dodaje
			let CurrentPlayerName = "Player"+playing.toString();
			let ShipLength = "length"+lenght.toString();
			
			if (AvailableShips[CurrentPlayerName][ShipLength] > 0) {
				let id = event.target.id;
				let row = id.substr(0, 1);
				let col = id.substr(1, 3);
				col = parseInt(col, 10);
				row = numToCoord[row];
			
				available = "Yes"
			
				if (orientation == 1) {
					for (let a = 0; a < lenght; a++) {
						col_a = col - a;
						row_a = row;
					
						AvailableCheck(row_a, col_a);
					}
					for (let a = 0; a < lenght; a++) {
						col_a = col - a;
						row_a = row;
						row_a = numToCoord[row_a];
						id_a = row_a + col_a;
					
						if (available == "No" || col - lenght < 0){
							document.getElementById(id_a).classList.add("hoverred");	
						}
						else {
							document.getElementById(id_a).classList.add("hover");
						}
					}
				}
			
				else if (orientation == 2) {
					for (let a = 0; a < lenght; a++) {
						col_a = col;
						row_a = row + a;
					
						AvailableCheck(row_a, col_a);
					}
					for (let a = 0; a < lenght; a++) {
						col_a = col;
						row_a = row + a;
						row_a = numToCoord[row_a];
						id_a = row_a + col_a;
					
						if (available == "No" || row + lenght > 11){
							document.getElementById(id_a).classList.add("hoverred");	
						}
						else {
							document.getElementById(id_a).classList.add("hover");
						}
					}
				}
		
				else if (orientation == 3) {
					for (let a = 0; a < lenght; a++) {
						col_a = col + a;
						row_a = row;
					
						AvailableCheck(row_a, col_a);
					}
					for (let a = 0; a < lenght; a++) {
						col_a = col + a;
						row_a = row;
						row_a = numToCoord[row_a];
						id_a = row_a + col_a;
					
						if (available == "No" || col + lenght > 11){
							document.getElementById(id_a).classList.add("hoverred");	
						}
						else {
							document.getElementById(id_a).classList.add("hover");
						}
					}
				}
			
				else {
					for (let a = 0; a < lenght; a++) {
						col_a = col;
						row_a = row - a;
						
						AvailableCheck(row_a, col_a);
					}
					for (let a = 0; a < lenght; a++) {
						col_a = col;
						row_a = row - a;
						row_a = numToCoord[row_a];
						id_a = row_a + col_a;
					
						if (available == "No" || row - lenght < 0){
							document.getElementById(id_a).classList.add("hoverred");	
						}
						else {
							document.getElementById(id_a).classList.add("hover");
						}
					}
				}
			}
			else{}
		}
	}
}, false);

document.getElementById("board").addEventListener("mouseout", function(event) {
	
	if (Guessing == true) {
		let id = event.target.id;
		document.getElementById(id).classList.remove("aiming");
	}
	
	else {
		if (erase == true) {
		}
		
		else { //Ako se ne brise nego dodaje
			let CurrentPlayerName = "Player"+playing.toString();
			let ShipLength = "length"+lenght.toString(); 
			
			if (AvailableShips[CurrentPlayerName][ShipLength] > 0) {
				let id = event.target.id;
				let row = id.substr(0, 1);
				let col = id.substr(1, 3);
				col = parseInt(col, 10);
				row = numToCoord[row];
				
				available = "Yes"
				
				if (orientation == 1) {
					for (let a = 0; a < lenght; a++) {
						col_a = col - a;
						row_a = row;
						
						AvailableCheck(row_a, col_a);
					}
					for (let a = 0; a < lenght; a++) {
						col_a = col - a;
						row_a = row;
						row_a = numToCoord[row_a];
						id_a = row_a + col_a;
					
						if (available == "No" || col - lenght < 0){
							document.getElementById(id_a).classList.remove("hoverred");	
						}
						else {
							document.getElementById(id_a).classList.remove("hover");
						}
					}
				}
			
				else if (orientation == 2) {
					for (let a = 0; a < lenght; a++) {
						col_a = col;
						row_a = row + a;
						
						AvailableCheck(row_a, col_a);
					}
					for (let a = 0; a < lenght; a++) {
						col_a = col;
						row_a = row + a;
						row_a = numToCoord[row_a];
						id_a = row_a + col_a;
						
						if (available == "No" || row + lenght > 11){
							document.getElementById(id_a).classList.remove("hoverred");	
						}
						else {
							document.getElementById(id_a).classList.remove("hover");
						}
					}
				}
		
				else if (orientation == 3) {
					for (let a = 0; a < lenght; a++) {
						col_a = col + a;
						row_a = row;
						
						AvailableCheck(row_a, col_a);
					}
					for (let a = 0; a < lenght; a++) {
						col_a = col + a;
						row_a = row;
						row_a = numToCoord[row_a];
						id_a = row_a + col_a;
						
						if (available == "No" || col + lenght > 11){
							document.getElementById(id_a).classList.remove("hoverred");	
						}
						else {
							document.getElementById(id_a).classList.remove("hover");
						}
					}
				}
			
				else {
					for (let a = 0; a < lenght; a++) {
						col_a = col;
						row_a = row - a;
						
						AvailableCheck(row_a, col_a);
					}
					for (let a = 0; a < lenght; a++) {
						col_a = col;
						row_a = row - a;
						row_a = numToCoord[row_a];
						id_a = row_a + col_a;
						
						if (available == "No" || row - lenght < 0){
							document.getElementById(id_a).classList.remove("hoverred");	
						}
						else {
							document.getElementById(id_a).classList.remove("hover");
						}
					}
				}
			}
			else {}
		}
	}
}, false);