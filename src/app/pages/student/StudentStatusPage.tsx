import { useNavigate, useParams } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Clock, FileText } from "lucide-react";

export function StudentStatusPage() {
  const navigate = useNavigate();
  const { trackId } = useParams();

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
              <Badge variant="outline" className="bg-yellow-50">
                <Clock className="w-3 h-3 mr-1" />
                승인 대기 중
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <Clock className="w-12 h-12 mx-auto text-yellow-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                강사 검토 중입니다
              </h3>
              <p className="text-gray-600">
                강사가 제출한 포트폴리오를 검토 중입니다. 승인이 완료되면
                인증서를 다운로드할 수 있습니다.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-3">제출 정보</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">제출일시</span>
                  <span className="font-medium">{submittedAt}</span>
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
