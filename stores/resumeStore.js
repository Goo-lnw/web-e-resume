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
    try {
      const res = await $axios.get('/student/protected')
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
      error.value = null
      console.log(workExperience.value)
    } catch (err) {
      error.value = err.message || 'Failed to load data'
    } finally {
      loading.value = false
    }
  }

  return {
    fetchResume,
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
