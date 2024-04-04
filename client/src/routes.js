import { CABINET_ROUTE, COURSE_ROUTE, LESSON_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, TASK_ROUTE } from "./utils/consts";
import Cabinet from "./pages/Cabinet";
import Registration from "./pages/Registration";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import CourseLessons from "./pages/CourseLessons";
import Task from "./pages/Task";

export const authRoutes = [
	{
		path: CABINET_ROUTE,
		Component: Cabinet
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Registration
	},
	{
		path: COURSE_ROUTE,
		Component: Courses
	},
	{
		path: LESSON_ROUTE,
		Component: CourseLessons
	},
	{
		path: TASK_ROUTE,
		Component: Task
	}
]

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		Component: Login
	}
]
