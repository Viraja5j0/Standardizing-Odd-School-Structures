// import { School, SchoolAnalysis, SCHOOL_STANDARDS } from './types';

// export function analyzeSchool(school: School): SchoolAnalysis {
//   const studentTeacherRatio = school.studentCount / school.teacherCount;
  
//   const infrastructureStatus = 
//     school.infrastructureScore >= SCHOOL_STANDARDS.minInfrastructureScore ? 'Good' :
//     school.infrastructureScore >= SCHOOL_STANDARDS.minInfrastructureScore - 3 ? 'Average' : 
//     'Needs Improvement';

//   const resourceStatus =
//     school.resourceScore >= SCHOOL_STANDARDS.minResourceScore ? 'Well Equipped' :
//     school.resourceScore >= SCHOOL_STANDARDS.minResourceScore - 3 ? 'Adequate' :
//     'Insufficient';

//   const policyCompliance =
//     school.policyImplementationScore >= SCHOOL_STANDARDS.minPolicyScore ? 'High' :
//     school.policyImplementationScore >= SCHOOL_STANDARDS.minPolicyScore - 2 ? 'Medium' :
//     'Low';

//   const recommendations: string[] = [];

//   if (studentTeacherRatio > SCHOOL_STANDARDS.idealStudentTeacherRatio) {
//     recommendations.push('Hire more teachers to improve student-teacher ratio');
//   }

//   if (school.infrastructureScore < SCHOOL_STANDARDS.minInfrastructureScore) {
//     recommendations.push('Upgrade infrastructure facilities');
//   }

//   if (school.resourceScore < SCHOOL_STANDARDS.minResourceScore) {
//     recommendations.push('Invest in additional educational resources');
//   }

//   if (school.policyImplementationScore < SCHOOL_STANDARDS.minPolicyScore) {
//     recommendations.push('Improve policy implementation and compliance');
//   }

//   if (school.academicPerformance < SCHOOL_STANDARDS.minAcademicPerformance) {
//     recommendations.push('Implement academic improvement programs');
//   }

//   if (school.extracurricularActivities.length < SCHOOL_STANDARDS.minExtracurriculars) {
//     recommendations.push('Introduce more extracurricular activities');
//   }

//   return {
//     studentTeacherRatio,
//     infrastructureStatus,
//     resourceStatus,
//     policyCompliance,
//     recommendations
//   };
// }






import { School, SchoolAnalysis, SCHOOL_STANDARDS } from './types';

export function analyzeSchool(school: School): SchoolAnalysis {
  const studentTeacherRatio = school.studentCount / school.teacherCount;
  
  const infrastructureStatus = 
    school.infrastructureScore >= SCHOOL_STANDARDS.minInfrastructureScore ? 'Good' :
    school.infrastructureScore >= SCHOOL_STANDARDS.minInfrastructureScore - 3 ? 'Average' : 
    'Needs Improvement';

  const resourceStatus =
    school.resourceScore >= SCHOOL_STANDARDS.minResourceScore ? 'Well Equipped' :
    school.resourceScore >= SCHOOL_STANDARDS.minResourceScore - 3 ? 'Adequate' :
    'Insufficient';

  const policyCompliance =
    school.policyImplementationScore >= SCHOOL_STANDARDS.minPolicyScore ? 'High' :
    school.policyImplementationScore >= SCHOOL_STANDARDS.minPolicyScore - 2 ? 'Medium' :
    'Low';

  const recommendations: string[] = [];

  if (studentTeacherRatio > SCHOOL_STANDARDS.idealStudentTeacherRatio) {
    recommendations.push('Hire more teachers to improve student-teacher ratio');
  }

  if (school.infrastructureScore < SCHOOL_STANDARDS.minInfrastructureScore) {
    recommendations.push('Upgrade infrastructure facilities');
  }

  if (school.resourceScore < SCHOOL_STANDARDS.minResourceScore) {
    recommendations.push('Invest in additional educational resources');
  }

  if (school.policyImplementationScore < SCHOOL_STANDARDS.minPolicyScore) {
    recommendations.push('Improve policy implementation and compliance');
  }

  if (school.academicPerformance < SCHOOL_STANDARDS.minAcademicPerformance) {
    recommendations.push('Implement academic improvement programs');
  }

  if (school.extracurricularActivities.length < SCHOOL_STANDARDS.minExtracurriculars) {
    recommendations.push('Introduce more extracurricular activities');
  }

  return {
    studentTeacherRatio,
    infrastructureStatus,
    resourceStatus,
    policyCompliance,
    recommendations
  };
}