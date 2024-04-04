export const LOGIN_ROUTE = '/login'
export const REGISTRATION_ROUTE = '/registration'
export const COURSE_ROUTE = '/courses'
export const CABINET_ROUTE = '/cabinet'
export const LESSON_ROUTE = `${COURSE_ROUTE}/:courseId/lessons`
export const TASK_ROUTE = `${LESSON_ROUTE}/:lessonId/tasks`
export const YOUTUBE_API_KEY = 'AIzaSyCjIsQL5QlnQTJIAtfpizelWFrKqgxGVp4'