import { createRouter, createWebHistory } from 'vue-router'
import Form from '@/views/Instructor/Form.vue'
import TaskForm from '@/views/Instructor/TaskForm.vue'
import TaskPage from '@/views/Instructor/TaskPage.vue'
import Challenges from '@/views/Developer/Challenges.vue'
import Leaderboard from '@/views/Developer/Leaderboard.vue'
import Form1 from '@/views/Company/Form1.vue'
import Taskform1 from '@/views/Company/Taskform1.vue'
import TaskPage1 from '@/views/Company/TaskPage1.vue'
import Challenges1 from '@/views/Company/Challenges1.vue'
import Company1 from '@/views/Company/Company1.vue'
import ChallengeDetails1 from '@/views/Company/ChallengeDetails1.vue'

const routes = [
  {
    path: '/',
    redirect: '/landing'
  },{
    path: '/landing',
    name: 'Landing',
    component: () => import('../views/login/LandingPage.vue')
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/LoginPage.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('../views/login/ForgetView.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/login/SignUp.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/login/ContactUs.vue')
  },
  {
    path: '/verification/:email', // Add the parameter ":email"
    name: 'verification',
    props: true,
    component: () => import('../views/login/VerificationOtp.vue'),
  },


   {
    path: '/adminhome',
    name: 'AdminHome',
    component: () => import('../views/Admin/AdminHome.vue')
  },
  {
    path: '/developerhome',
    name: 'DeveloperHome',
    component: () => import('../views/Developer/DeveloperHome.vue')
  },
  {
    path: '/companyhome',
    name: 'CompanyHome',
    component: () => import('../views/Company/CompanyHome.vue')
  },{
    path: '/instructorhome',
    name: 'InstructorHome',
    component: () => import('../views/Instructor/InstructorHome.vue')
  }, {
    path: '/form',
    name: 'Form',
    component: Form
  },
  {
    path: '/tasks/:challengeId',
    name: 'tasks',
    component: TaskForm 
  }
  ,
  {
    path: '/task-page/:taskId',
    name: 'task-page',
    component: TaskPage
  },
  {
    path: '/challenges',
    name: 'Challenges',
    component: Challenges
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard
  },
  {
    path: '/form1',
    name: 'Form1',
    component: Form1
  },
  {
    path: '/tasks1/:challengeId',
    name: 'tasks1',
    component: Taskform1
  }
  ,
  {
    path: '/task-page1/:taskId',
    name: 'task-page1',
    component: TaskPage1
  },
  {
    path: '/challenges1',
    name: 'Challenges1',
    component: Challenges1
  },
  {
    path: '/company1',
    name: 'Company1',
    component: Company1
  },
  {
    path: '/challenge/:id',
    name: 'ChallengeDetails1',
    component: ChallengeDetails1
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
/* const role=store.getters.getAccount.role
if (role=='admin'){
  routes.push({
    path: '/',
    redirect: '/adminlanding'
  },);
}else{
  routes.push({
    path: '/',
    redirect: '/landing'
  },);
} */

export default router
