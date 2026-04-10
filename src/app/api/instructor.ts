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

export interface CreateInstructorTrackPayload {
  name: string;
  domainType: string;
  materialFile: File;
  rubricFile: File;
}

export interface InstructorTrackCreateResponse {
  track_id: number;
  status: string;
}

function getErrorMessage(status: number, data: unknown) {
  if (data && typeof data === "object") {
    const detail = "detail" in data ? data.detail : null;
    const message = "message" in data ? data.message : null;

    if (typeof detail === "string" && detail.trim()) {
      return detail;
    }

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return `요청 처리에 실패했습니다. (${status})`;
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

export async function createInstructorTrack(
  instructorId: string,
  payload: CreateInstructorTrackPayload
): Promise<InstructorTrackCreateResponse> {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("domain_type", payload.domainType);
  formData.append("material_file", payload.materialFile);
  formData.append("rubric_file", payload.rubricFile);

  const response = await fetch(API_ENDPOINTS.instructorTracks(instructorId), {
    method: "POST",
    body: formData,
  });

  const data = (await response.json().catch(() => null)) as
    | Partial<InstructorTrackCreateResponse>
    | { detail?: string; message?: string }
    | null;

  if (!response.ok) {
    throw new Error(getErrorMessage(response.status, data));
  }

  if (typeof data?.track_id !== "number" || typeof data.status !== "string") {
    throw new Error("트랙 생성 응답 형식이 올바르지 않습니다.");
  }

  return {
    track_id: data.track_id,
    status: data.status,
  };
}
