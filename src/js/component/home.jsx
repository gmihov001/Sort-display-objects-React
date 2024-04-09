import React, { useEffect, useState } from "react";


const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	//store sorting function needed by toSorted() in state variable, to be updated depending on use selection of what to sort by 
	const [sortingAlgorithm, setSortingAlgorithm] = useState(() => (a, b) => 0);

	//sorting callback function for toSorted() (used below) to sort strings/text
	//toSorted() and sort() pass every two consecutive elements of an array as parameters a & b to the callback function
	const sortTitles = (a, b) => {
		let nameA = a.title.toUpperCase();
		let nameB = b.title.toUpperCase();

		//compares strings: 
		//if left string is 'ab' and right string is 'ac', left string is 'lesser' than right string; function returns -1
		if (nameA < nameB) return -1;

		//if left string is 'bcd' and right string is 'bcb', left string is 'greater'; functions returns 1
		if (nameA > nameB) return 1;
	}
	//if callback returns value < 0, toSorted() or sort() method will sort argument a before b: [a, b]
	//if callback returns value > 0, sorting method will sort argument b before a: [b, a] 
	//if callback returns 0, sorting method will leave elements in the original order, no change 


	//sorting callback for toSorted() to sort by boolean value
	const sortStatuses = (a, b) => {
		//if a.done is true and b.done is false, return -1 - method will sort all done tasks first, not-done tasks - second
		if (a.done && !b.done) return -1;

		//if a.done is false and b.done is true, sort b before a (same logic as above - done tasks first, not-done second)
		if (!a.done && b.done) return 1;

		//if both tasks have same status - both done or both not-done, no changes in the sorting order
		else return 0;
	}

	//sorting callback for toSorted() to sort numbers/date 
	const sortDates = (a, b) => a.dateCreated - b.dateCreated;
	//if a.dateCreated is earlier, return result ends up being < 0, hence a is sorted before b
	//if b.dateCreated is earlier, return result ends up being > 0, hence b is sorted before a
	//if they're equal, result is 0 - no change in sorting order



	const addTask = (e) => {
		let date = new Date();

		setTasks([...tasks, {
			id: Math.floor(Math.random() * 99999999),
			title: newTask,
			done: false,
			dateCreated: date,
			dateComplete: ""
		}]);
		setNewTask("");
	}

	const markDone = (id) => {
		let date = new Date();
		let updatedTasks = tasks.map((task) => {
			if (task.id == id) {
				if (!task.done) return { ...task, done: true, dateComplete: date };
				else if (task.done) return { ...task, done: false, dateComplete: "" };
				else return task;
			} else return task;
		});
		setTasks(updatedTasks);
	}

	const deleteTask = (id) => {
		let updatedTasks = tasks.filter((task) => task.id != id);
		setTasks(updatedTasks);
	}


	return (
		<div className="text-center">
			<h2 className="text-center mt-5">Sorting Tasks!</h2>
			<div className="d-flex">
				<div className="input-group mb-3">
					<input type="text" className="form-control"
						onChange={(e) => setNewTask(e.target.value)}
						onKeyUp={(e) => {
							if (e.key == "Enter") addTask(e);
						}}
						value={newTask}
						placeholder="create task..."
						aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
				</div>
				<div className="dropdown">
					<button className="btn btn-info dropdown-toggle px-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Sort by
					</button>
					<ul className="dropdown-menu">
						<li><a className="dropdown-item"
							//onClick assigns the sortingAlgorithm variable with the callback function which sorts by title (string) 
							onClick={() => setSortingAlgorithm(() => sortTitles)} href="#">By title</a></li>
						<li><a className="dropdown-item"
							//onClick assigns the sortingAlgorithm variable with the callback function which sorts by Date object 
							onClick={() => setSortingAlgorithm(() => sortDates)} href="#">By date</a></li>
						<li><a className="dropdown-item"
							//onClick assigns the sortingAlgorithm variable with the callback function which sorts by 'done' status (boolean)
							onClick={() => setSortingAlgorithm(() => sortStatuses)} href="#">By status</a></li>
					</ul>
				</div>

			</div>
			<div>
				{
					//toSorted() or sort() methods sort elements of an array with the help of a callback function
					//sortingAlgorithm here is a state variable which is assigned with the appropriate callback function depending on 
					//the user's selection to sort by title, by date or by 'done' status
					tasks.toSorted(sortingAlgorithm).map((task, ind) => (
						<div key={ind} className="alert alert-info shadow p-3 m-2 bg-body rounded d-flex justify-content-between" role="alert">
							<strong
								style={task.done ? { textDecoration: "line-through", color: "gray" } : { textDecoration: "none", color: "inherit" }}>
								{task.title}
							</strong>

							{
								task.done ? (
									<>
										<small
											style={{ textDecoration: "line-through", color: "gray" }}>
											{task.dateCreated.toString()}
										</small>
										<small
											style={{ textDecoration: "none", color: "inherit" }}>
											{task.dateComplete.toString()}
										</small>
									</>
								) : (
									<small
										style={{ textDecoration: "none", color: "inherit" }}>
										{task.dateCreated.toString()}
									</small>
								)
							}

							<div className="d-flex">
								<span
									onClick={() => markDone(task.id)}
									className="mx-2"
									style={{ color: task.done ? "gray" : "inherit" }}
								>
									{
										task.done ? <i className="far fa-check-square"></i> : <i className="far fa-square"></i>
									}
								</span>
								<span
									onClick={() => deleteTask(task.id)}
									className="mx-2"><i className="far fa-times-circle"></i></span>
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
};

export default Home;
