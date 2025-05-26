// src/App.tsx
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Header from "./Components/Header/Header";
import OrganizationPage from "./routes/HUB/OrgPage/OrganizationPage";
import "./App.css";

const LazyAuthrozation = lazy(
	() => import("./routes/Auth/Authorization/Authorization"),
);
const LazyLogMe = lazy(() => import("./routes/Auth/Logme/Logme"));
const LazyRegMe = lazy(() => import("./routes/Auth/Regme/Regme"));
const LazyHub = lazy(() => import("./routes/HUB/Hub/ui"));

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
						<Suspense fallback={<div>Загрузка...</div>}>
							<Routes>
								<Route path="/isedo/hub/show" element={<LazyHub />} />
								<Route
									path="/isedo/hub/org/:id"
									element={<OrganizationPage />}
								/>
								<Route path="/" element={<LazyAuthrozation />}>
									<Route path="auth/regme" element={<LazyRegMe />} />
									<Route path="auth/logme" element={<LazyLogMe />} />
								</Route>
								<Route path="*" element={<LazyHub />} />
							</Routes>
						</Suspense>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
