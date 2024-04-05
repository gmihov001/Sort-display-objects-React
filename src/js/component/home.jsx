import React, { useEffect, useState } from "react";


const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [sortMe, setSortMe] = useState();

	useEffect(() => {
		setSortMe(() => (a, b) => 0);
	}, [])

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

	const sortDates = (a, b) => a.date - b.date;


	const addTask = (e) => {
		let date = new Date();
		setTasks([...tasks, {
			id: Math.floor(Math.random() * 99999999),
			title: newTask,
			done: false,
			date: date.toLocaleString()
		}]);
		setNewTask("");
	}

	const markDone = (id) => {
		let updatedTasks = tasks.map((task) => {
			if (task.id == id) return { ...task, done: !task.done };
			else return task;
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
						Sort
					</button>
					<ul className="dropdown-menu">
						<li><a className="dropdown-item" onClick={() => setSortMe(() => sortTitles)} href="#">By title</a></li>
						<li><a className="dropdown-item" onClick={() => setSortMe(() => sortDates)} href="#">By date</a></li>
						<li><a className="dropdown-item" onClick={() => setSortMe(() => sortStatuses)} href="#">By status</a></li>
					</ul>
				</div>

			</div>
			<div>
				{
					tasks.toSorted(sortMe).map((task, ind) => (
						<div key={ind} className="alert alert-info shadow p-3 m-2 bg-body rounded d-flex justify-content-between" role="alert">
							<strong style={task.done ? { textDecoration: "line-through", color: "gray" } : { textDecoration: "none", color: "inherit" }}>{task.title}</strong> <small>{task.date.toString()}</small>
							<div className="d-flex">
								<span
									onClick={() => markDone(task.id)}
									className="mx-2"
									style={{ color: task.done ? "gray" : "inherit" }}
								>
									<i className="far fa-check-square"></i>
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
