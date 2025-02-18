import React from 'react';
import { FaSchool, FaUsers, FaChartLine, FaClipboardCheck } from 'react-icons/fa';

interface SchoolStatsProps {
  totalSchools: number;
  totalStudents: number;
  utilizationRate: number;
  complianceRate: number;
}

export default function SchoolChart({ 
  totalSchools = 2547,
  totalStudents = 1200000,
  utilizationRate = 87,
  complianceRate = 94
}: Partial<SchoolStatsProps>) {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <FaSchool className="text-blue-600 w-6 h-6" />
          <div className="text-green-500 text-sm">+12%</div>
        </div>
        <div className="mt-4">
          <h3 className="text-gray-500 text-sm">Total Schools</h3>
          <p className="text-2xl font-bold">{totalSchools.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <FaUsers className="text-blue-600 w-6 h-6" />
          <div className="text-green-500 text-sm">+5%</div>
        </div>
        <div className="mt-4">
          <h3 className="text-gray-500 text-sm">Student Enrollment</h3>
          <p className="text-2xl font-bold">{(totalStudents / 1000000).toFixed(1)}M</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <FaChartLine className="text-blue-600 w-6 h-6" />
          <div className="text-green-500 text-sm">+3%</div>
        </div>
        <div className="mt-4">
          <h3 className="text-gray-500 text-sm">Resource Utilization</h3>
          <p className="text-2xl font-bold">{utilizationRate}%</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <FaClipboardCheck className="text-blue-600 w-6 h-6" />
          <div className="text-green-500 text-sm">+8%</div>
        </div>
        <div className="mt-4">
          <h3 className="text-gray-500 text-sm">Policy Compliance</h3>
          <p className="text-2xl font-bold">{complianceRate}%</p>
        </div>
      </div>
    </div>
  );
}