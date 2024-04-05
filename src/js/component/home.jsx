import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [sortMe, setSortMe] = useState();

	useEffect(() => {
		setSortMe(() => (a, b) => 0);
	}, [])


	const addTask = (e) => {
		let date = new Date();
		setTasks([...tasks, { title: newTask, done: false, date: date.toLocaleString() }, { title: "Clean", done: true, date: date.toLocaleString() }]);
		setNewTask("");
	}

	const sortTitles = (a, b) => {
		let nameA = a.title.toUpperCase();
		let nameB = b.title.toUpperCase();
		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
	}

	const sortStatuses = (a, b) => {
		if (a.done && !b.done) return -1;
		if (!a.done && b.done) return 1;
		else return 0;
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
					<button className="btn btn-outline-info dropdown-toggle px-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Sort
					</button>
					<ul className="dropdown-menu">
						<li><a className="dropdown-item" onClick={() => setSortMe(() => sortTitles)} href="#">By title</a></li>
						<li><a className="dropdown-item" onClick={() => setSortMe(() => sortStatuses)} href="#">By date</a></li>
						<li><a className="dropdown-item" href="#">By status</a></li>
					</ul>
				</div>
			</div>
			<div>
				{
					tasks.toSorted(sortMe).map((task, ind) => (
						<div key={ind} className="alert alert-info shadow p-3 m-2 bg-body rounded d-flex justify-content-between" role="alert">
							<strong>{task.title}</strong> <small>{task.date.toString()}</small>
						</div>
					))
				}
			</div>
		</div>
	);
};

export default Home;
