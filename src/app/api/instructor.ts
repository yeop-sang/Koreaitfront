import { API_ENDPOINTS } from "../config/api";

export interface StudentSummary {
  student_name: string | null;
  student_id: string | null;
}

interface InstructorStudentsResponse {
  students: StudentSummary[];
}

export interface StudentOption {
  id: string;
  name: string;
}

export async function fetchInstructorStudents(instructorId: string): Promise<StudentOption[]> {
  const response = await fetch(API_ENDPOINTS.instructorStudents(instructorId));

  if (!response.ok) {
    throw new Error(`Failed to fetch instructor students: ${response.status}`);
  }

  const data = (await response.json()) as InstructorStudentsResponse;

  if (!Array.isArray(data.students)) {
    return [];
  }

  return data.students
    .filter((student) => Boolean(student.student_name) && Boolean(student.student_id))
    .map((student) => ({
      id: String(student.student_id),
      name: String(student.student_name),
    }));
}
