import { Route, Routes, useLocation } from "react-router";
import { lazy, Suspense, useEffect } from "react";
import { Loader } from "./UI/Loader/Loader";
import Header from "./Components/Header/Header";
import OrganizationPage from "./routes/HUB/OrgPage/OrganizationPage";
import "./App.css";
// import UserCard from "./UI/User Card/UserCard";
// import Usercard from "./routes/HR/HrSubmodules/UserCard/UserCard";
// import CreateWorker from "./routes/HR/Workers/Create/CreateWorker";

const LazyAuthrozation = lazy(
	() => import("./routes/Auth/Authorization/Authorization"),
);
const LazyLogMe = lazy(() => import("./routes/Auth/Logme/Logme"));
const LazyRegMe = lazy(() => import("./routes/Auth/Regme/Regme"));

const LazyModules = lazy(() => import("./routes/HR/Modules"));
const LazyPersonnelRecordsManagement = lazy(
	() =>
		import(
			"./routes/HR/Personnel Records Management/PersonnelRecordsManagement"
		),
);
const LazyCreatePersonnelRecordsManagement = lazy(
	() =>
		import(
			"./routes/HR/Personnel Records Management/Create/CreatePersonnelRecordsManagement"
		),
);
const LazyShowPersonnelRecordsManagement = lazy(
	() =>
		import(
			"./routes/HR/Personnel Records Management/Show/ShowPersonnelRecordsManagement"
		),
);

const LazyWorkingHours = lazy(
	() => import("./routes/HR/Working Hours/WorkingHours"),
);
const LazyCreateWorkingHours = lazy(
	() => import("./routes/HR/Working Hours/Create/CreateWorkingHours"),
);
const LazyShowWorkingHours = lazy(
	() => import("./routes/HR/Working Hours/Show/ShowWorkingHours"),
);

const LazyCreateContracts = lazy(
	() => import("./routes/HR/Contracts/Create/CreateContracts"),
);
const LazyShowContracts = lazy(
	() => import("./routes/HR/Contracts/Show/ShowContracts"),
);

const LazyHub = lazy(() => import("./routes/HUB/Hub/ui"));
// const LazyOrgcard = lazy(() => import("./routes/Orgcard/Orgcard"));
function App() {
	const location = useLocation();

	useEffect(() => {
		if (
			location.pathname === "/auth/logme" ||
			location.pathname === "/auth/regme"
		) {
			document.querySelector(".section-offset")?.classList.add("main-bg");
		} else {
			document.querySelector(".section-offset")?.classList.remove("main-bg");
		}
	}, [location.pathname]);
	return (
		<>
			<Header />
			<main className="section-offset">
				<div className="container">
					<div className="app__content">
						<Suspense fallback={<Loader />}>
							<Routes>
								<Route path="/modules" element={<LazyModules />} />
								{/* <Route
									path="/modules/hr/submodules"
									element={<LazyModules />}
								/> */}
								{/* Contracts */}
								<Route
									path="/modules/hr/submodules/personnel-records-management"
									element={<LazyPersonnelRecordsManagement />}
								/>
								<Route
									path="modules/hr/submodules/personnel-records-management/create"
									element={<LazyCreatePersonnelRecordsManagement />}
								/>
								<Route
									path="modules/hr/submodules/personnel-records-management/show/:id"
									element={<LazyShowPersonnelRecordsManagement />}
								/>
								<Route
									path="/modules/hr/submodules/working-hours"
									element={<LazyWorkingHours />}
								/>
								<Route
									path="modules/hr/submodules/working-hours/create"
									element={<LazyCreateWorkingHours />}
								/>
								<Route
									path="modules/hr/submodules/working-hours/show/:id"
									element={<LazyShowWorkingHours />}
								/>

								<Route path="/isedo/hub/show" element={<LazyHub />} />

								{/* create */}
								<Route
									path="/modules/hr/create"
									element={<LazyCreateContracts />}
								/>
								{/* show */}
								<Route
									path="hr/contracts/show/:id"
									element={<LazyShowContracts />}
								/>

								{/* orgPage */}
								<Route path="/isedo/hub/show" element={<LazyHub />} />
								<Route
									path="/isedo/hub/org/:id"
									element={<OrganizationPage />}
								/>

								{/* Main route */}
								<Route path="/" element={<LazyAuthrozation />} />
								{/* Authorization */}
								<Route path="/auth" element={<LazyAuthrozation />}>
									<Route path="regme" element={<LazyRegMe />} />
									<Route path="logme" element={<LazyLogMe />} />
								</Route>
								{/* Error page */}
								<Route path="*" element={<h2>Страница не существует</h2>} />
							</Routes>
						</Suspense>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
