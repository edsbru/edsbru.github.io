let game_data;
		
let current_room = 0;
let items_picked = [];

function game (data)
{

game_data = data;

inventario = []

document.getElementById("terminal").innerHTML = "<p><strong>¡Bienvenidos a ENTIerrame!</strong> Best juego de terror</p>";
document.getElementById("terminal").innerHTML += "<p>Te encuentras en "+game_data.rooms[current_room].name+". ¿Que quieres hacer? </p>";
}

function terminal_out (info){
	let terminal = document.getElementById("terminal");
	terminal.innerHTML += info;
	terminal.scrollTop = terminal.scrollHeight;
}

function mostrarItem(item){
	terminal_out(`<p>Nombre: ${item.name}</p>`);
	terminal_out(`<p>Descripcion: ${item.name}</p>`);
}

function parseInstruction (instruction){
	switch (instruction[0]){
	case "ver":
		
	break;
	
	case "ir":
		
		let connections = game_data.rooms[current_room].connection_door_room;
		let doors = game_data.rooms[current_room].doors;
		if(!doors.includes(instruction[1])){
			terminal_out(`<p>Puerta errónea</p>`);
		}else {
			let doorIndex = doors.indexOf(instruction[1]);
			let roomDestinationId = connections[doorIndex];
			let destinationIndex = game_data.rooms.map((r)=>{return r.id}).indexOf(roomDestinationId);
			let destination = game_data.rooms[destinationIndex];
			current_room = destinationIndex;
			console.log(destinationIndex)
			terminal_out(`<p>Entrando en ${destination.name}</p>`);
			terminal_out(`<p>${destination.description}</p>`);
		}
		
	break;

	case "inventario":
		
		if(instruction.length == 1){
			terminal_out(`<p>Contenido del inventario:</p>`);
			if(inventario.length == 0){
				terminal_out(`<p>Inventario vacío.</p>`);
	
			}else {
				for (const item of inventario) {
					mostrarItem(item);
					terminal_out(`<p>-----</p>`);

				}
	
			}
			
		}else {
			for (const item of inventario) {
				if(item.id == instruction[1]){
					mostrarItem(item);
					break;
				}
			}
		}


	break;
	
	case "coger":
		let currentRoom = game_data.rooms[current_room];
		let selectedItem = instruction[1];
		
		if(currentRoom.items.includes(selectedItem)){
			let selectedIndex = game_data.items.map((r)=>{return r.id}).indexOf(selectedItem);
			let item = game_data.items[selectedIndex];
			
			if(item.pickable){
				inventario.push(item);
				terminal_out(`<p>${item.name} añadido al inventario.</p>`);
				terminal_out(`<p>Descripcion: ${item.description}</p>`);
			}else {
				terminal_out(`<p>Parece que este item no se puede agarrar.</p>`);
			}

		}else {
			terminal_out(`<p>No existe ese item en esta sala.</p>`);
		}



	break;
	
	default:
		terminal_out("<p><strong>ERROR</strong>:")
	}
}

function getRoomNumberById(roomId){
	for (let i = 0; i < game_data.rooms.length; i++){
		if (game_data.rooms[i].id == roomId){
			return i;
		}
	}

	return -1;
}

function getRoomNumber (room){
	for (let i = 0; i < game_data.rooms.length; i++){
		if (game_data.rooms[i].id == room){
			return i;
		}
	}

	return -1;
}

function getDoorNumber (door){
	for (let i = 0; i < game_data.rooms[current_room].doors.length; i++){
		if (game_data.rooms[current_room].doors[i].id == door){
			return i;
		}
	}

	return -1;
}


function readAction(){
	let instruction = document.getElementById("commands").value;
	let instruction_trim = instruction.trim();
	
	let data = instruction_trim.split(" ");

	if (data.length == 0 || instruction_trim == ""){
		document.getElementById("terminal").innerHTML += "<p><strong>ERROR</strong>: escribe una instrucción</p>";
		return;
	}
	// if (data.length == 1){
	// 	parseCommand(data[0]);
	// }
	// else{
	// }
	parseInstruction(data);
}

fetch("https://edsbru.github.io/game.json")
.then(response => response.json())
.then(data => game (data));