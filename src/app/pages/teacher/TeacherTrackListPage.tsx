import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Plus, FileText, Users } from "lucide-react";
import { getTeacherTrackRecord, DEFAULT_TRACK_CRITERIA } from "../../data/teacherTrackStorage";
import { getTeacherTrackSummaries } from "../../data/teacherTrackStorage";

export function TeacherTrackListPage() {
  const navigate = useNavigate();
  const tracks = getTeacherTrackSummaries();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">트랙 현황</h1>
            <p className="text-gray-600 mt-2">기준 확정 상태, 검토 대기 수, 패킷 준비도를 확인합니다</p>
          </div>
          <Button onClick={() => navigate("/teacher/track/create")} className="gap-2">
            <Plus className="w-4 h-4" />
            트랙 생성
          </Button>
        </div>

        <div className="grid gap-4">
          {tracks.map((track) => (
            <Card
              key={track.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/teacher/track/${track.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{track.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">{track.description}</p>
                  </div>
                  {track.pendingReviews > 0 && (
                    <Badge variant="destructive" className="ml-4">
                      {track.pendingReviews}개 검토 대기
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>학생 {track.studentCount}명</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>생성일: {track.createdAt}</span>
                  </div>
                </div>
                {/* Spec-aligned meta badges (minimal) */}
                {(() => {
                  const record = getTeacherTrackRecord(track.id);
                  const criteriaCount = record?.criteria?.length ?? DEFAULT_TRACK_CRITERIA.length;
                  const scoresCount = record?.scores?.length ?? 0;
                  const studentsCount = record?.students?.length ?? 0;
                  let readiness: "대기" | "진행 중" | "완료" = "대기";
                  if (studentsCount > 0 && criteriaCount > 0 && scoresCount >= studentsCount * criteriaCount) readiness = "완료";
                  else if (scoresCount > 0) readiness = "진행 중";
                  return (
                    <div className="flex flex-wrap gap-2 mt-3 text-xs">
                      <Badge variant="outline">평가지표 {criteriaCount}개</Badge>
                      <Badge variant="outline" className="bg-blue-50">평가 {scoresCount > 0 ? "진행" : "미시작"}</Badge>
                      <Badge variant="outline" className={readiness === "완료" ? "bg-green-50" : readiness === "진행 중" ? "bg-yellow-50" : "bg-gray-50"}>
                        패킷 준비도: {readiness}
                      </Badge>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          ))}

          {tracks.length === 0 && (
            <Card className="p-12">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">트랙이 없습니다</h3>
                <p className="text-gray-600 mb-4">
                  새로운 교육 트랙을 생성하여 시작하세요
                </p>
                <Button onClick={() => navigate("/teacher/track/create")}>
                  <Plus className="w-4 h-4 mr-2" />
                  첫 트랙 만들기
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
