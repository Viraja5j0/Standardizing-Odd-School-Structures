import React, { useState, useEffect } from 'react';
import { SchoolData } from '../types/school';
import Papa from 'papaparse';

export default function Schools() {
  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);
  const [filter, setFilter] = useState('all'); // 'all', 'odd', 'standard'

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/school_data.csv?' + new Date().getTime());
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setSchools(results.data as SchoolData[]);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error fetching schools:', error);
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const getStructureType = (school: SchoolData) => {
    // Simplified logic - in real app, would be more complex based on grade configuration
    const studentTeacherRatio = school.total_students / school.total_teachers;
    return studentTeacherRatio > 30 ? 'Odd' : 'Standard';
  };

  const filteredSchools = schools.filter(school => {
    if (filter === 'all') return true;
    const type = getStructureType(school);
    return filter === 'odd' ? type === 'Odd' : type === 'Standard';
  });

  if (loading) return <div className="flex-1 p-8">Loading schools data...</div>;

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Schools Management</h1>
        <div className="flex gap-4">
          <select 
            className="px-4 py-2 border rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Schools</option>
            <option value="odd">Odd Structure</option>
            <option value="standard">Standard Structure</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <div 
            key={school.school_name}
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedSchool(school)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{school.school_name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                getStructureType(school) === 'Odd' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {getStructureType(school)}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Students:</span>
                <span className="font-medium">{school.total_students}</span>
              </div>
              <div className="flex justify-between">
                <span>Teachers:</span>
                <span className="font-medium">{school.total_teachers}</span>
              </div>
              <div className="flex justify-between">
                <span>Classes:</span>
                <span className="font-medium">{school.total_classes}</span>
              </div>
              <div className="flex justify-between">
                <span>Resource Utilization:</span>
                <span className="font-medium">{school.resource_utilization}%</span>
              </div>
            </div>

            {getStructureType(school) === 'Odd' && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <h4 className="text-sm font-semibold text-red-800 mb-2">Standardization Needed</h4>
                <ul className="text-sm text-red-600 list-disc list-inside">
                  <li>Student-teacher ratio exceeds standard</li>
                  <li>Resource allocation needs optimization</li>
                  <li>Infrastructure assessment required</li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold">{selectedSchool.school_name}</h2>
              <button 
                onClick={() => setSelectedSchool(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Current Metrics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Students:</span>
                    <span>{selectedSchool.total_students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Teachers:</span>
                    <span>{selectedSchool.total_teachers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resource Utilization:</span>
                    <span>{selectedSchool.resource_utilization}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Policy Compliance:</span>
                    <span>{selectedSchool.policy_compliance}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Standardization Plan</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">Recommended Actions</h4>
                    <ul className="text-sm text-blue-600 list-disc list-inside">
                      <li>Optimize teacher allocation</li>
                      <li>Restructure grade configurations</li>
                      <li>Enhance resource utilization</li>
                      <li>Update infrastructure</li>
                    </ul>
                  </div>
                  
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Generate Detailed Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




// import React, { useState } from 'react';
// import { School, Users, BookOpen, Award, AlertTriangle, BarChart as ChartBar } from 'lucide-react';

// const schools = [
//   {
//     id: 1,
//     name: 'Springfield Elementary',
//     location: 'West Bengal',
//     students: 450,
//     teachers: 35,
//     rating: 4.5,
//     structure: 'Odd',
//     gradeConfig: '1-7',
//     standardCategory: 'Non-conforming',
//     infrastructureScore: 78,
//     resourceUtilization: 82
//   },
//   {
//     id: 2,
//     name: 'Washington High',
//     location: 'Kerala',
//     students: 850,
//     teachers: 60,
//     rating: 4.8,
//     structure: 'Standard',
//     gradeConfig: '1-10',
//     standardCategory: 'Secondary',
//     infrastructureScore: 92,
//     resourceUtilization: 88
//   },
//   {
//     id: 3,
//     name: 'Lincoln Middle School',
//     location: 'Goa',
//     students: 620,
//     teachers: 45,
//     rating: 4.2,
//     structure: 'Odd',
//     gradeConfig: '5-10',
//     standardCategory: 'Non-conforming',
//     infrastructureScore: 75,
//     resourceUtilization: 79
//   }
// ];

// function Schools() {
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [showReport, setShowReport] = useState(false);

//   const handleGenerateReport = (school) => {
//     setSelectedSchool(school);
//     setShowReport(true);
//   };

//   const getStructureStatusColor = (structure) => {
//     return structure === 'Standard' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
//   };

//   const SchoolReport = ({ school }) => {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//         <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//           <h2 className="text-2xl font-bold mb-4">School Structure Analysis: {school.name}</h2>
          
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-gray-50 p-4 rounded">
//                 <h3 className="font-semibold">Basic Information</h3>
//                 <p>Location: {school.location}</p>
//                 <p>Total Students: {school.students}</p>
//                 <p>Total Teachers: {school.teachers}</p>
//                 <p>Grade Configuration: {school.gradeConfig}</p>
//                 <p>Structure Type: {school.structure}</p>
//               </div>
              
//               <div className="bg-gray-50 p-4 rounded">
//                 <h3 className="font-semibold">Performance Metrics</h3>
//                 <p>Infrastructure Score: {school.infrastructureScore}%</p>
//                 <p>Resource Utilization: {school.resourceUtilization}%</p>
//                 <p>Teacher-Student Ratio: 1:{Math.round(school.students/school.teachers)}</p>
//                 <p>Overall Rating: {school.rating}/5.0</p>
//               </div>
//             </div>

//             <div className="bg-gray-50 p-4 rounded">
//               <h3 className="font-semibold mb-2">Structure Analysis</h3>
//               <div className="space-y-2">
//                 <p><strong>Current Status:</strong> {school.structure === 'Odd' ? 'Non-standard Structure' : 'Standard Structure'}</p>
//                 <p><strong>Category:</strong> {school.standardCategory}</p>
//                 <p><strong>Grade Configuration:</strong> {school.gradeConfig}</p>
//                 <p><strong>Compliance Status:</strong> {school.structure === 'Standard' ? 'Compliant with Samagra Shiksha' : 'Requires Standardization'}</p>
//               </div>
//             </div>

//             <div className="bg-gray-50 p-4 rounded">
//               <h3 className="font-semibold mb-2">Recommendations</h3>
//               {school.structure === 'Odd' ? (
//                 <ul className="list-disc list-inside">
//                   <li>Restructure grade configuration to align with standard categories</li>
//                   <li>Develop infrastructure improvement plan</li>
//                   <li>Optimize resource allocation</li>
//                   <li>Implement phased transition strategy</li>
//                   <li>Engage stakeholders for smooth transition</li>
//                 </ul>
//               ) : (
//                 <ul className="list-disc list-inside">
//                   <li>Maintain current structure standards</li>
//                   <li>Continue resource optimization</li>
//                   <li>Share best practices with other schools</li>
//                   <li>Monitor compliance with Samagra Shiksha framework</li>
//                 </ul>
//               )}
//             </div>

//             <div className="bg-gray-50 p-4 rounded">
//               <h3 className="font-semibold mb-2">Action Plan</h3>
//               {school.structure === 'Odd' ? (
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span>Structure Assessment</span>
//                     <span className="text-green-600">Completed</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Stakeholder Consultation</span>
//                     <span className="text-yellow-600">In Progress</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Resource Planning</span>
//                     <span className="text-gray-400">Pending</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span>Implementation</span>
//                     <span className="text-gray-400">Pending</span>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-green-600">School structure meets Samagra Shiksha standards. Continue monitoring and maintenance.</p>
//               )}
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end space-x-4">
//             <button
//               onClick={() => window.print()}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Print Report
//             </button>
//             <button
//               onClick={() => setShowReport(false)}
//               className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex-1 p-8">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Schools Management</h1>
//         <p className="text-gray-600">Monitor and standardize educational institutions</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <div className="flex items-center space-x-3">
//             <div className="bg-blue-100 p-3 rounded-full">
//               <School className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-gray-600">Total Schools</p>
//               <p className="text-2xl font-bold">145,012</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white p-4 rounded-lg shadow">
//           <div className="flex items-center space-x-3">
//             <div className="bg-yellow-100 p-3 rounded-full">
//               <AlertTriangle className="w-6 h-6 text-yellow-600" />
//             </div>
//             <div>
//               <p className="text-gray-600">Odd Structures</p>
//               <p className="text-2xl font-bold">14.28%</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow">
//           <div className="flex items-center space-x-3">
//             <div className="bg-green-100 p-3 rounded-full">
//               <ChartBar className="w-6 h-6 text-green-600" />
//             </div>
//             <div>
//               <p className="text-gray-600">Standardized</p>
//               <p className="text-2xl font-bold">85.72%</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow">
//           <div className="flex items-center space-x-3">
//             <div className="bg-purple-100 p-3 rounded-full">
//               <Award className="w-6 h-6 text-purple-600" />
//             </div>
//             <div>
//               <p className="text-gray-600">Avg. Compliance</p>
//               <p className="text-2xl font-bold">76%</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Schools List</h2>
//             <div className="space-x-4">
//               <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
//                 Import Schools
//               </button>
//               <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//                 Add New School
//               </button>
//             </div>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Structure</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Config</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teachers</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {schools.map((school) => (
//                   <tr key={school.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{school.name}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{school.location}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStructureStatusColor(school.structure)}`}>
//                         {school.structure}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{school.gradeConfig}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{school.students}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{school.teachers}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">{school.rating}/5.0</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button
//                         onClick={() => handleGenerateReport(school)}
//                         className="text-blue-600 hover:text-blue-900"
//                       >
//                         Generate Detail Report
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {showReport && selectedSchool && (
//         <SchoolReport school={selectedSchool} />
//       )}
//     </div>
//   );
// }

// export default Schools;