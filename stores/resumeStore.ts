import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useResumeStore = defineStore('resume', () => {
  const additionalInfo = ref([])
  const education = ref([])
  const internships = ref([])
  const projects = ref([])
  const resume = ref({})
  const skills = ref([])
  const softSkills = ref([])
  const student = ref({})
  const training = ref([])
  const workExperience = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchResume() {
    const { $axios } = useNuxtApp();
    loading.value = true
    error.value = null
    
    try {
      const res = await $axios.get('/student/protected')
      
      // ตรวจสอบ response data
      if (res.data) {
        additionalInfo.value = res.data.additionalInfo || []
        education.value = res.data.education || []
        internships.value = res.data.internships || []
        projects.value = res.data.projects || []
        resume.value = res.data.resume || {}
        skills.value = res.data.skills || []
        softSkills.value = res.data.softSkills || []
        student.value = res.data.student || {}
        training.value = res.data.training || []
        workExperience.value = res.data.workExperience || []
      }
      
      console.log('Resume data loaded successfully:', student.value)
    } catch (err: any) {
      console.error('Failed to fetch resume data:', err)
      error.value = err.response?.data?.message || err.message || 'Failed to load data'
      
      // ถ้าเป็น 401 หรือ 403 ให้ logout
      if (err.response?.status === 401 || err.response?.status === 403) {
        const { logout } = useAuth()
        logout()
      }
    } finally {
      loading.value = false
    }
  }

  // Reset store state
  function resetStore() {
    additionalInfo.value = []
    education.value = []
    internships.value = []
    projects.value = []
    resume.value = {}
    skills.value = []
    softSkills.value = []
    student.value = {}
    training.value = []
    workExperience.value = []
    loading.value = false
    error.value = null
  }

  return {
    fetchResume,
    resetStore,
    additionalInfo,
    education,
    internships,
    projects,
    resume,
    skills,
    softSkills,
    student,
    training,
    workExperience,
    loading,
    error,
  }
})
