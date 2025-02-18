import { School } from './types';

export const sampleSchools: School[] = [
  {
    id: '1',
    name: 'Excellence Academy',
    location: 'Urban Center',
    studentCount: 800,
    teacherCount: 45,
    infrastructureScore: 9,
    resourceScore: 8,
    policyImplementationScore: 9,
    academicPerformance: 85,
    extracurricularActivities: ['Sports', 'Music', 'Art', 'Debate', 'Robotics', 'Chess']
  },
  {
    id: '2',
    name: 'Progressive High',
    location: 'Suburban Area',
    studentCount: 600,
    teacherCount: 25,
    infrastructureScore: 6,
    resourceScore: 5,
    policyImplementationScore: 7,
    academicPerformance: 72,
    extracurricularActivities: ['Sports', 'Music', 'Art']
  },
  {
    id: '3',
    name: 'Central School',
    location: 'Rural District',
    studentCount: 400,
    teacherCount: 15,
    infrastructureScore: 4,
    resourceScore: 4,
    policyImplementationScore: 5,
    academicPerformance: 65,
    extracurricularActivities: ['Sports', 'Local Crafts']
  }
];