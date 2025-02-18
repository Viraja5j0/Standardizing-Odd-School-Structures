// import React, { useEffect, useState } from 'react';
// import Papa from 'papaparse';
// import { FaSchool, FaUsers, FaChartLine, FaClipboardCheck } from 'react-icons/fa';
// import { Bar } from 'react-chartjs-2';

// interface SchoolData {
//   school_name: string;
//   total_students: number;
//   previous_total_students: number;
//   total_teachers: number;
//   previous_total_teachers: number;  // Added this missing property
//   total_classes: number;
//   resource_utilization: number;
//   previous_resource_utilization: number;
//   policy_compliance: number;
//   previous_policy_compliance: number;
// }

// interface StatCardProps {
//   icon: JSX.Element;
//   title: string;
//   value: string;
//   color?: string;
// }

// function StatCard({ icon, title, value, color = "blue" }: StatCardProps) {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <div className="flex items-center justify-between">
//         <div className={`text-${color}-600`}>{icon}</div>
//       </div>
//       <div className="mt-4">
//         <h3 className="text-gray-500 text-sm">{title}</h3>
//         <p className="text-2xl font-bold">{value}</p>
//       </div>
//     </div>
//   );
// }

// const standards = [
//   { minStudents: 0, maxStudents: 200, requiredResources: 100, requiredTeachers: 50 },
//   { minStudents: 201, maxStudents: 500, requiredResources: 300, requiredTeachers: 150 },
//   { minStudents: 501, maxStudents: 1000, requiredResources: 500, requiredTeachers: 250 },
//   { minStudents: 1001, maxStudents: Infinity, requiredResources: 1000, requiredTeachers: 500 },
// ];

// function calculatePerformance(school: SchoolData, standards: any[]) {
//   const standard = standards.find(s => school.total_students >= s.minStudents && school.total_students <= s.maxStudents);

//   if (!standard) {
//     return {
//       resourcePerformance: 0,
//       teacherPerformance: 0,
//       message: "School size does not meet any standard"
//     };
//   }

//   const resourcePerformance = (Math.min(school.resource_utilization, standard.requiredResources) / standard.requiredResources) * 100;
//   const teacherPerformance = (Math.min(school.total_teachers, standard.requiredTeachers) / standard.requiredTeachers) * 100;

//   const message = [];
//   if (school.resource_utilization < standard.requiredResources) {
//     message.push(`Lacks ${standard.requiredResources - school.resource_utilization} resources`);
//   }
//   if (school.total_teachers < standard.requiredTeachers) {
//     message.push(`Lacks ${standard.requiredTeachers - school.total_teachers} teachers`);
//   }

//   return {
//     resourcePerformance,
//     teacherPerformance,
//     message: message.length > 0 ? message.join(", ") : "Meets standards"
//   };
// }

// export default function Dashboard() {
//   const [schoolData, setSchoolData] = useState<SchoolData[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const results = await new Promise<Papa.ParseResult<SchoolData>>((resolve, reject) => {
//           Papa.parse('/schooldata.csv', {
//             download: true,
//             header: true,
//             dynamicTyping: true,
//             complete: resolve,
//             error: reject,
//           });
//         });

//         console.log("Parsed CSV Data:", results.data); // Debugging line



//         if (results.data && results.data.length > 0) {
//           const parsedData = results.data.map((item: any) => ({
//             school_name: item.school_name || "Unknown School",
//             total_students: Number(item.total_students) || 0,
//             previous_total_students: Number(item.previous_total_students) || 0,
//             total_teachers: Number(item.total_teachers) || 0,
//             previous_total_teachers: Number(item.previous_total_teachers) || 0,
//             total_classes: Number(item.total_classes) || 0,
//             resource_utilization: Number(item.resource_utilization) || 0,
//             previous_resource_utilization: Number(item.previous_resource_utilization) || 0,
//             policy_compliance: Number(item.policy_compliance) || 0,
//             previous_policy_compliance: Number(item.previous_policy_compliance) || 0,
//           }));
//           setSchoolData(parsedData);
//         } else {
//           console.error("No data found in CSV or dataset is empty.");
//           setError("No data available. Please check your CSV file.");
//           setSchoolData([]);
//         }
//       } catch (err) {
//         console.error("Error parsing CSV or fetching data:", err);
//         setError("Error loading data.  Please check the console for details.");
//         setSchoolData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures this runs only once

//   if (loading) {
//     return <div>Loading data...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!schoolData || schoolData.length === 0) {
//     return <div>No data available.</div>;
//   }

//   const totalSchools = schoolData.length;
//   const totalStudents = schoolData.reduce((acc, curr) => acc + curr.total_students, 0);
//   const totalTeachers = schoolData.reduce((acc, curr) => acc + curr.total_teachers, 0);
//   const totalClasses = schoolData.reduce((acc, curr) => acc + curr.total_classes, 0);

//   // Correctly calculate totals *after* the data is loaded:
//   const totalResourceUtilization = schoolData.reduce((acc, curr) => acc + curr.resource_utilization, 0);
//   const totalPolicyCompliance = schoolData.reduce((acc, curr) => acc + curr.policy_compliance, 0);

//   const avgResourceUtilization = totalSchools > 0 ? totalResourceUtilization / totalSchools : 0;
//   const avgPolicyCompliance = totalSchools > 0 ? totalPolicyCompliance / totalSchools : 0;


//   const schoolPerformanceData = schoolData.map(school => ({
//     ...school,
//     performance: calculatePerformance(school, standards),
//   }));

//   const aggregatedPerformance = schoolPerformanceData.reduce((acc, school) => {
//     acc.totalResourcePerformance += school.performance.resourcePerformance || 0;
//     acc.totalTeacherPerformance += school.performance.teacherPerformance || 0;

//     if (school.performance && school.performance.message && school.performance.message.startsWith("Lacks")) {
//       const lacks = school.performance.message.split(", ");
//       lacks.forEach(lack => {
//         const parts = lack.trim().split(" ");
//         if (parts.length >= 2) {
//           const amountStr = parts[1];
//           const type = parts.slice(2).join(" ");
//           const amount = parseInt(amountStr);

//           if (!isNaN(amount)) {
//             if (!acc.lacks) {
//               acc.lacks = {} as Lacks;
//             }
//             if (!acc.lacks[type]) {
//               acc.lacks[type] = 0;
//             }
//             acc.lacks[type] += amount;
//           } else {
//             console.warn("Invalid amount:", amountStr, "in message:", school.performance.message);
//           }
//         } else {
//           console.warn("Invalid lack format:", lack, "in message:", school.performance.message);
//         }
//       });
//     }
//     return acc;
//   }, { totalResourcePerformance: 0, totalTeacherPerformance: 0, lacks: undefined as Lacks | undefined }); // This line was modified to include the type assertion

//   const avgResourcePerformance = schoolPerformanceData.length > 0 ? aggregatedPerformance.totalResourcePerformance / schoolPerformanceData.length : 0;
//   const avgTeacherPerformance = schoolPerformanceData.length > 0 ? aggregatedPerformance.totalTeacherPerformance / schoolPerformanceData.length : 0;
  

//   const perfectSchools = schoolData.filter(school => {
//     const performance = calculatePerformance(school, standards);
//     return performance.resourcePerformance === 100 && performance.teacherPerformance === 100; // Adjust criteria as needed
//   });

//   const oddSchools = schoolData.filter(school => {
//     const performance = calculatePerformance(school, standards);
//     return performance.resourcePerformance < 100 || performance.teacherPerformance < 100; // Adjust criteria as needed
//   });

//   const recommendations = oddSchools.map(school => {
//     const performance = calculatePerformance(school, standards);
//     const messages = performance.message.split(", ");

//     const schoolRecommendations = messages.map(message => {
//       const parts = message.trim().split(" ");
//       const amount = parts[1];
//       const type = parts.slice(2).join(" ");
//       return `Increase ${type} by ${amount} at ${school.school_name}`;
//     });

//     return schoolRecommendations;
//   });

//   console.log("Perfect Schools:", perfectSchools);
//   console.log("Odd Schools:", oddSchools);
//   console.log("Recommendations:", recommendations);

//   // *** Chart Data ***
//   const chartData = {
//     labels: ['Resource Utilization', 'Policy Compliance'],
//     datasets: [
//       {
//         label: 'Average Percentage',
//         data: [avgResourceUtilization, avgPolicyCompliance],
//         backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
//         borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
//         borderWidth: 1,
//       },
//     ],
//   };




//   return (
//     <div className="flex-1 p-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold mb-2">Education Standardization Dashboard</h1>
//         <p className="text-gray-600">Monitor and optimize educational resource allocation</p>
//       </div>

//       <div className="grid grid-cols-4 gap-6 mb-8">
//         <StatCard
//           icon={<FaSchool className="w-6 h-6" />}
//           title="Total Schools"
//           value={totalSchools.toString()}
//         />
//         <StatCard
//           icon={<FaUsers className="w-6 h-6" />}
//           title="Student Enrollment"
//           value={totalStudents.toString()}
//         />
//         <StatCard
//           icon={<FaChartLine className="w-6 h-6" />}
//           title="Resource Utilization"
//           value={`${avgResourceUtilization.toFixed(2)}%`}
//         />
//         <StatCard
//           icon={<FaClipboardCheck className="w-6 h-6" />}
//           title="Policy Compliance"
//           value={`${avgPolicyCompliance.toFixed(2)}%`}
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-6">Resource Distribution</h2>
//           <p>Average Resource Performance: {avgResourcePerformance.toFixed(2)}%</p>
//           {Object.keys(aggregatedPerformance.lacks).length > 0 && (
//             <div>
//               <p>Lacks:</p>
//               <ul>
//                 {Object.entries(aggregatedPerformance.lacks).map(([type, amount]) => (
//                   <li key={type}>{amount} {type}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-6">Policy Implementation Status</h2>
//           <p>Average Teacher Performance (includes Policy Compliance): {avgTeacherPerformance.toFixed(2)}%</p>
//           {Object.keys(aggregatedPerformance.lacks).length > 0 && (
//             <div>
//               <p>Lacks:</p>
//               <ul>
//                 {Object.entries(aggregatedPerformance.lacks).map(([type, amount]) => (
//                   <li key={type}>{amount} {type}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }











import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { FaSchool, FaUsers, FaChartLine, FaClipboardCheck } from 'react-icons/fa';

interface SchoolData {
  school_name: string;
  total_students: number;
  previous_total_students: number;
  total_teachers: number;
  previous_total_teachers: number;
  total_classes: number;
  resource_utilization: number;
  previous_resource_utilization: number;
  policy_compliance: number;
  previous_policy_compliance: number;
}

interface StatCardProps {
  icon: JSX.Element;
  title: string;
  value: string | number;
  change?: number;
  color?: string;
}

function StatCard({ icon, title, value, change, color = "blue" }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className={`text-${color}-600`}>{icon}</div>
        {change !== undefined && (
          <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

const standards = [
  { 
    category: 'Small',
    minStudents: 0, 
    maxStudents: 200, 
    requiredResources: 100, 
    requiredTeachers: 20,
    minResourceUtilization: 70,
    minPolicyCompliance: 80
  },
  { 
    category: 'Medium',
    minStudents: 201, 
    maxStudents: 500, 
    requiredResources: 250, 
    requiredTeachers: 40,
    minResourceUtilization: 75,
    minPolicyCompliance: 85
  },
  { 
    category: 'Large',
    minStudents: 501, 
    maxStudents: 1000, 
    requiredResources: 500, 
    requiredTeachers: 80,
    minResourceUtilization: 80,
    minPolicyCompliance: 90
  },
  { 
    category: 'Extra Large',
    minStudents: 1001, 
    maxStudents: Infinity, 
    requiredResources: 1000, 
    requiredTeachers: 160,
    minResourceUtilization: 85,
    minPolicyCompliance: 95
  }
];

function getSchoolCategory(totalStudents: number) {
  return standards.find(s => 
    totalStudents >= s.minStudents && totalStudents <= s.maxStudents
  ) || standards[0];
}

function analyzeSchool(school: SchoolData) {
  const category = getSchoolCategory(school.total_students);
  const issues = [];
  const recommendations = [];

  if (school.total_teachers < category.requiredTeachers) {
    const teachersNeeded = category.requiredTeachers - school.total_teachers;
    issues.push(`Insufficient teachers (${school.total_teachers}/${category.requiredTeachers})`);
    recommendations.push(`Hire ${teachersNeeded} additional teachers`);
  }

  if (school.resource_utilization < category.minResourceUtilization) {
    issues.push(`Low resource utilization (${school.resource_utilization.toFixed(1)}%/${category.minResourceUtilization}%)`);
    recommendations.push('Implement resource optimization plan');
  }

  if (school.policy_compliance < category.minPolicyCompliance) {
    issues.push(`Below policy compliance target (${school.policy_compliance.toFixed(1)}%/${category.minPolicyCompliance}%)`);
    recommendations.push('Conduct policy compliance training');
  }

  return {
    schoolName: school.school_name,
    category: category.category,
    issues,
    recommendations,
    meetsStandards: issues.length === 0
  };
}

export default function Dashboard() {
  const [schoolData, setSchoolData] = useState<SchoolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      const response = await fetch('/school_data.csv?' + new Date().getTime());
      const csvText = await response.text();
      
      return new Promise<SchoolData[]>((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const data = results.data as SchoolData[];
            if (data && data.length > 0 && data[0].school_name) {
              resolve(data);
            } else {
              reject(new Error('No valid data found in CSV'));
            }
          },
          error: (error) => reject(error)
        });
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const updateDashboard = async () => {
    try {
      console.log('Fetching new data...');
      const newData = await fetchData();
      console.log('New data:', newData);
      setSchoolData(newData);
      setLastUpdate(new Date());
      setError(null);
    } catch (err: any) {
      console.error('Error updating dashboard:', err);
      setError(err.message || 'Failed to update dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateDashboard();
    const interval = setInterval(updateDashboard, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading && schoolData.length === 0) {
    return <div className="p-8">Loading data...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  const totalSchools = schoolData.length;
  const totalStudents = schoolData.reduce((sum, school) => sum + (school.total_students || 0), 0);
  const previousTotalStudents = schoolData.reduce((sum, school) => sum + (school.previous_total_students || 0), 0);
  
  const avgResourceUtilization = schoolData.reduce((sum, school) => sum + (school.resource_utilization || 0), 0) / totalSchools;
  const prevAvgResourceUtilization = schoolData.reduce((sum, school) => sum + (school.previous_resource_utilization || 0), 0) / totalSchools;
  
  const avgPolicyCompliance = schoolData.reduce((sum, school) => sum + (school.policy_compliance || 0), 0) / totalSchools;
  const prevAvgPolicyCompliance = schoolData.reduce((sum, school) => sum + (school.previous_policy_compliance || 0), 0) / totalSchools;

  const studentChange = previousTotalStudents ? ((totalStudents - previousTotalStudents) / previousTotalStudents) * 100 : 0;
  const resourceChange = prevAvgResourceUtilization ? avgResourceUtilization - prevAvgResourceUtilization : 0;
  const complianceChange = prevAvgPolicyCompliance ? avgPolicyCompliance - prevAvgPolicyCompliance : 0;

  const schoolAnalysis = schoolData.map(analyzeSchool);
  const compliantSchools = schoolAnalysis.filter(school => school.meetsStandards);
  const nonCompliantSchools = schoolAnalysis.filter(school => !school.meetsStandards);

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Education Standardization Dashboard</h1>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Monitoring {totalSchools} schools across the district</p>
          <p className="text-sm text-gray-500">Last updated: {lastUpdate.toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaSchool className="w-6 h-6" />}
          title="Total Schools"
          value={totalSchools}
        />
        <StatCard
          icon={<FaUsers className="w-6 h-6" />}
          title="Total Students"
          value={totalStudents.toLocaleString()}
          change={studentChange}
        />
        <StatCard
          icon={<FaChartLine className="w-6 h-6" />}
          title="Resource Utilization"
          value={`${avgResourceUtilization.toFixed(1)}%`}
          change={resourceChange}
        />
        <StatCard
          icon={<FaClipboardCheck className="w-6 h-6" />}
          title="Policy Compliance"
          value={`${avgPolicyCompliance.toFixed(1)}%`}
          change={complianceChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">School Performance Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Compliant Schools:</span>
              <span className="font-bold text-green-500">{compliantSchools.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Non-compliant Schools:</span>
              <span className="font-bold text-red-500">{nonCompliantSchools.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Overall Compliance Rate:</span>
              <span className="font-bold">{((compliantSchools.length / totalSchools) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Resource Distribution</h2>
          <div className="space-y-4">
            {standards.map(standard => {
              const schoolsInCategory = schoolAnalysis.filter(
                school => school.category === standard.category
              );
              return (
                <div key={standard.category} className="flex justify-between items-center">
                  <span>{standard.category} Schools:</span>
                  <span className="font-bold">{schoolsInCategory.length}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {nonCompliantSchools.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Schools Requiring Attention</h2>
          <div className="space-y-6">
            {nonCompliantSchools.map((school, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-lg mb-2">{school.schoolName} ({school.category})</h3>
                <div className="space-y-2">
                  <div className="text-red-500">
                    <strong>Issues:</strong>
                    <ul className="list-disc list-inside">
                      {school.issues.map((issue: string, i: number) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-blue-500">
                    <strong>Recommendations:</strong>
                    <ul className="list-disc list-inside">
                      {school.recommendations.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}