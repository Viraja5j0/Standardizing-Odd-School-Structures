import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface SchoolData {
  school_name: string;
  total_students: number;
  total_teachers: number;
  total_classes: number;
  resource_allocation: number;
  policy_compliance: number;
  infrastructure_rating: number;
  grades_offered: string;  // Added for Grades Offered
  location: string;       // Added for Location
  subject_focus: string; // Added for Subject Focus
  s_no: number;          // Added for s.no
}

const CSVParser = () => {
  const [schoolData, setSchoolData] = useState<SchoolData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Papa.parse('/schooldata.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          const parsedData = results.data.map((item: any) => {
            const resource_allocation = Number(item["Resource Allocation"]?.replace(/[^0-9.-]+/g, '') || 0); // Clean and convert
            const policy_compliance = Number(item["Policy Compliance"] || 0);
            const total_students = Number(item.total_students || 0);
            const total_teachers = Number(item.total_teachers || 0);
            const total_classes = Number(item.total_classes || 0);
            const infrastructure_rating = Number(item["Infrastructure Rating"] || 0);
            const s_no = Number(item["s.no"] || 0); // Added for s.no

            return {
              school_name: item["School Name"] || "Unknown School",
              total_students: total_students,
              total_teachers: total_teachers,
              total_classes: total_classes,
              resource_allocation: resource_allocation,
              policy_compliance: policy_compliance,
              infrastructure_rating: infrastructure_rating,
              grades_offered: item["Grades Offered"] || "", // Added for Grades Offered
              location: item.Location || "",            // Added for Location
              subject_focus: item["Subject Focus"] || "", // Added for Subject Focus
              s_no: s_no, // Added for s.no
            };
          });
          setSchoolData(parsedData);
          console.log("Parsed Data:", parsedData);
        } else {
          setError("Error parsing CSV: No data found.");
          console.error("CSV Parsing Error: No data or empty data in CSV file.");
        }
      },
      error: (err) => {
        setError("Error parsing CSV: " + err.message);
        console.error("CSV Parsing Error:", err);
      },
    });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (schoolData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Number of Schools: {schoolData.length}</p>
      <pre>{JSON.stringify(schoolData, null, 2)}</pre>
    </div>
  );
};

export default CSVParser;