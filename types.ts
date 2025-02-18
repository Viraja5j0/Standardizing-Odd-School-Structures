// export interface School {
//     id: string;
//     name: string;
//     location: string;
//     studentCount: number;
//     teacherCount: number;
//     infrastructureScore: number; // 1-10
//     resourceScore: number; // 1-10
//     policyImplementationScore: number; // 1-10
//     academicPerformance: number; // Percentage
//     extracurricularActivities: string[];
//   }
  
//   export interface SchoolAnalysis {
//     studentTeacherRatio: number;
//     infrastructureStatus: 'Good' | 'Average' | 'Needs Improvement';
//     resourceStatus: 'Well Equipped' | 'Adequate' | 'Insufficient';
//     policyCompliance: 'High' | 'Medium' | 'Low';
//     recommendations: string[];
//   }
  
//   export const SCHOOL_STANDARDS = {
//     idealStudentTeacherRatio: 20,
//     minInfrastructureScore: 7,
//     minResourceScore: 7,
//     minPolicyScore: 8,
//     minAcademicPerformance: 75,
//     minExtracurriculars: 5,
//   };



  // types.ts
export interface School {
    name: string;
    type: string;
    capacity: number;
    location: string;
    gradeConfiguration: string;
    buildingInfrastructure: string;
    financialResources: string;
    learningMaterials: string;
    studentTeacherRatio: number;
    policyImplementation: {
      curriculumAdherence: string;
      assessmentPractices: string;
      inclusivity: string;
    };
    isOddSchool?: boolean;
    recommendations?: string[];
    category?: string;
  }