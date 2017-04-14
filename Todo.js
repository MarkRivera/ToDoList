(function(){
	var inputs = { "taskers": []}
	var count = 0;
	var chores = [];
	//cache the DOM
	var $name = $('#name_box'), 
		$chore = $('#chore_box'),
		$dynamicID = $('#chore'+count+''),
		$taskButton = $('#add_task'),
		$subBtn = $('#submit_button'),
		$remove = $(".removal_btn"),
		$taskBox = $(".task_box"),
		$taskHead = $('.task_header')
		$taskBar = $('#task-bars'),
		$tasksDiv = $('#added_tasks'),
		$template = $('#task_box_template').html();

	//bind events
	$subBtn.on('click', function(event){
		event.preventDefault();
		firstMerge(chores);
		saveDynamicInput();
		combineValues(inputs, chores);
		console.log(inputs);
		render();
		clearChoreInput();
		chores.length = 0;
		$name.val('');
		$chore.val('');
		inputs = { "taskers": []};
		});

	$taskButton.on('click', function(event){
		event.preventDefault();
		if (count < 9){
			createChoreInput(count);
			//count++;
		}
		else {
			alert ('Maximum Charge!');
		}
	});

	$taskBar.on('click', 'button', function(event){
		event.preventDefault();
		$(this).closest("div").empty();
	});

	// $('#user-interface').mousemove(function(){
	// 	var dynamicBoo = true;
	// 	if ($('#user-interface').has('.dynamic_Class').length){
	// 			if ($('.dynamic_Class').val().toString().length < 2){
	// 				dynamicBoo = false;
	// 			}
	// 			else {
	// 				dynamicBoo = true;
	// 			}
	// 		}

	// 	if ($name.val().toString().length < 3 || $chore.val().toString().length < 2 || dynamicBoo == false){
			
	// 	}
	// 	else{
	// 		$subBtn.removeAttr("disabled");
	// 	}
	// });

	//Combining Arrays for taskers
	function firstMerge(array){
		array.push($chore.val());
	}

	//TaskBar functions

	function render(){
		$taskBar.append(Mustache.render($template, inputs));
	}

	function combineValues(object, array){
		object["taskers"].push(createTasker($name.val(), array));
	}

	function createTasker(named, chre){
		
		return {name: named, chore: chre};
	}

	// Chore Bar functions
	function createChoreInput(num){
		$tasksDiv.append('<div class="form-group"><label>Chore: <input type="text" name ="dynamic_chore" id="chore'+ num +'" class = "form-control dynamic_Class"></input></label></div>')
	}
	
	function saveDynamicInput(){
		var choreArr = $('.dynamic_Class').map(function(index, elem){
						return $(elem).val();
						});
		 mergeChores(choreArr);
	}

	function mergeChores(arr){
		$.merge(chores, arr);
	}

	function clearChoreInput(){
		$tasksDiv.empty();
	}

	//FORM VALIDATION

	function inputCheck (arg) {
		var closestDiv = $(arg).closest('div'),
		 	nameString = '<span id="helpBlock2" class="help-block">'+
'Please use 3 or more characters for the name.</span>',
			choreString = '<span id="helpBlock3" class="help-block">'+
'Please use more than 2 characters for chores.</span>';


		switch($(arg).attr('id')) {
			case "name_box":
				if ($(arg).val().toString().length < 3){
					if (!closestDiv.hasClass('has-error')) {
						
						closestDiv.addClass('has-error');
					}

					// A check to see if the HTML above already exists in the DOM
					if (!closestDiv.has($('.help-block')).length) {
						closestDiv.append(nameString);
					}
				}
				else {
					closestDiv.removeClass('has-error');
					$('.help-block').remove();
				}
				break;
			case "chore_box":
				if ($(arg).val().toString().length < 2) {
					if (!closestDiv.hasClass('has-error')) {
						
						closestDiv.addClass('has-error');
					}

					// A check to see if the HTML above already exists in the DOM
					if (!closestDiv.has($('.help-block')).length) {
						closestDiv.append(choreString);
					}
				}
				else {
					closestDiv.removeClass('has-error');
					$('.help-block').remove();
				}
				break;
			case "chore0":
				if ($(arg).val().toString().length < 2) {
					if (!closestDiv.hasClass('has-error')) {
						
						closestDiv.addClass('has-error');
					}

					// A check to see if the HTML above already exists in the DOM
					if (!closestDiv.has($('.help-block')).length) {
						closestDiv.append(choreString);
					}
				}
				else {
					closestDiv.removeClass('has-error');
					$('.help-block').remove();
				}
				break;
		}
	}

	$("form").on("blur", "input", function(){
		inputCheck((this));
	});

	//USER INTERFACE MOUSE ENTER EVENT HANDLER
	//end of local scope
})()

