let game_data;
		
		let current_room = 0;
		let items_picked = [];
		
		function game (data)
		{
		
		game_data = data;
				
		document.getElementById("terminal").innerHTML = "<p><strong>¡Bienvenidos a ENTIerrame!</strong> Best juego de terror</p>";
		document.getElementById("terminal").innerHTML += "<p>Te encuentras en "+game_data.rooms[current_room].name+". ¿Que quieres hacer? </p>";
		}
		
		function terminal_out (info){
			let terminal = document.getElementById("terminal");
			terminal.innerHTML += info;
			terminal.scrollTop = terminal.scrollHeight;
		}
		
		function parseCommand (command){
			console.log("El comando ", command);
			switch (command){
			case "ver":
				terminal_out("<p>"game_data.rooms[current_room].description"</p>");
				break;
				
			case "ir":
				let doors = "";
				let doors_num = game_data.rooms[current_room].doors.length;
				
				for (let i = 0; i < doors_num; i++){
				doors += game_data.rooms[current_room].doors[i]+" ":
				}
				terminal_out("<p>Puedes ir a: "+doors+"</p>");
				break;
					
			default:
				terminal_out("<p><strong>ERROR</strong>: "+command+" comando no encontrado</p>");
			}
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
		for (let i = 0; i < game_data.doors.length; i++){
		if (game_data.doors[i].id == door){
		return i;
				}
			}
		
		return -1;
		}
		
		function parseInstruction (instruction){
			console.log("La instrucción", instruction);
			
			switch (instruction[0]){
			case "ver":
				
			break;
			
			case "ir":
				
				let door_num = getDoorNumber(instruction[1]);
				if (door_num < 0) {
				console.log("Puerta errónea");
				return;
				}
				
				let room_num = getRoomNumber(game_data.doors[door_num].rooms[0]);
				if (room_num == current_room){
				current_room = getRoomNumber(game_data.doors[door_num].rooms[1]);
				}
				else{
				current_room= room_num;
				}
			break;
			
			case "coger":
			
			break;
			
			default:
			terminal_out("<p><strong>ERROR</strong>:")
			}
		}
		
		function readAction(){
		 let instruction = document.getElementById("commands").value;
		 let instruction_trim instrucción.trim();
		 
		 let data = instruction.trim.split(" ");
		
		 if (data.length == 0 || instruction_trim == ""){
		 document.getElementById("terminal").innerHTML += "<p><strong>ERROR</strong>: escribe una instrucción</p>";
		 return;
		 }
		 
		 if (data.length == 1){
		   parseCommand(data[0]);
		}
		else{
			parseInstruction(data);
		}
		
		fetch("https://edsbru.github.io/game.json")
		.then(response => response.json())
		.then(data => game (data));