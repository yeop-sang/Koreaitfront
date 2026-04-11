import { useNavigate, useParams } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Clock, FileText, CheckCircle } from "lucide-react";
export function StudentStatusPage() {
  const navigate = useNavigate();
  const { trackId } = useParams();
  type StudentFlowStatus =
    | "needs_upload"
    | "waiting_criteria"
    | "waiting_scoring"
    | "packet_ready"
    | "provisional";
  const currentStatus =
    (localStorage.getItem("studentStatus") as StudentFlowStatus) || "waiting_scoring";
  const blockingReason = localStorage.getItem("studentBlockingReason") || "";
  const statusLabel: Record<StudentFlowStatus, string> = {
    needs_upload: "증빙 업로드 필요",
    waiting_criteria: "강사 기준 확정 중",
    waiting_scoring: "강사 평가 대기",
    packet_ready: "패킷 생성 완료",
    provisional: "잠정 상태",
  };
  const badgeClass: Record<StudentFlowStatus, string> = {
    needs_upload: "bg-yellow-50",
    waiting_criteria: "bg-blue-50",
    waiting_scoring: "bg-blue-50",
    packet_ready: "bg-green-500 text-white",
    provisional: "bg-red-50",
  };
  const summaryText: Record<StudentFlowStatus, string> = {
    needs_upload: "프로젝트 PDF/링크를 등록하면 다음 단계로 진행됩니다.",
    waiting_criteria: "강사 평가 기준을 확정하는 중입니다. 확정 후 점수 입력으로 진행됩니다.",
    waiting_scoring: "강사 1~5 점수 입력을 기다리고 있습니다. 완료되면 패킷을 생성합니다.",
    packet_ready: "취업 제출 패킷이 생성되었습니다. 다운로드 페이지에서 확인할 수 있습니다.",
    provisional: "일부 항목이 누락되어 패킷이 잠정 상태입니다. 아래 누락 사유를 확인하세요.",
  };
  const steps = [
    "프로젝트 PDF/링크 등록",
    "역할/기여/결과 후보 검토",
    "개인 기여/추가 코멘트 입력",
    "강사 기준 확정",
    "강사 기준별 1~5 평가 입력",
    "취업 제출 패킷 생성",
  ];
  function deriveDone(status: StudentFlowStatus) {
    switch (status) {
      case "needs_upload":
        return [false, false, false, false, false, false];
      case "waiting_criteria":
        return [true, false, false, false, false, false];
      case "waiting_scoring":
        return [true, true, true, true, false, false];
      case "packet_ready":
        return [true, true, true, true, true, true];
      case "provisional":
        return [true, true, true, true, false, false];
      default:
        return [false, false, false, false, false, false];
    }
  }
  const checklistDone = deriveDone(currentStatus);

  const trackName = "백엔드 개발 기초"; // Mock data
  const submittedAt = "2026-04-08 14:30";
  const submittedFiles = ["발표자료.pdf", "프로젝트_문서.pdf"];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/student/tracks")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            트랙 목록으로
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{trackName}</CardTitle>
              <Badge variant="outline" className={badgeClass[currentStatus]}>
                {currentStatus === "packet_ready" ? (
                  <CheckCircle className="w-3 h-3 mr-1" />
                ) : (
                  <Clock className="w-3 h-3 mr-1" />
                )}
                {statusLabel[currentStatus]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg text-center">
              {currentStatus === "packet_ready" ? (
                <CheckCircle className="w-12 h-12 mx-auto text-green-600 mb-4" />
              ) : (
                <Clock className="w-12 h-12 mx-auto text-slate-600 mb-4" />
              )}
              <h3 className="text-lg font-semibold mb-2">상태 안내</h3>
              <p className="text-gray-600 mb-2">{summaryText[currentStatus]}</p>
              {currentStatus === "provisional" && blockingReason && (
                <p className="text-sm text-red-700">누락/차단 사유: {blockingReason}</p>
              )}
            </div>

            <div>
              <h4 className="font-medium mb-3">제출 정보</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">제출일시</span>
                  <span className="font-medium">{submittedAt}</span>
                </div>
              </div>
            <div className="mt-6">
              <h4 className="font-medium mb-3">진행 체크리스트</h4>
              <div className="space-y-2">
                {steps.map((label, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <span
                      className={
                        "inline-block w-2.5 h-2.5 rounded-full " +
                        (checklistDone[idx] ? "bg-green-500" : "bg-gray-300")
                      }
                    />
                    <span className={checklistDone[idx] ? "text-slate-800" : "text-slate-500"}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">제출한 파일</h4>
              <div className="space-y-2">
                {submittedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded"
                  >
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{file}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => navigate("/student/tracks")}
                className="w-full"
              >
                트랙 목록으로 돌아가기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
