import { useNavigate, useParams } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Download, CheckCircle, FileText } from "lucide-react";
import { toast } from "sonner";

export function StudentDownloadPage() {
  const navigate = useNavigate();
  const { trackId } = useParams();

  const trackName = "백엔드 개발 기초"; // Mock data
  const submittedAt = "2026-04-05 10:20";
  const approvedAt = "2026-04-06 15:30";
  const submittedFiles = ["발표자료.pdf", "프로젝트_문서.pdf"];

  const handleDownload = () => {
    // Mock download
    toast.success("패킷 다운로드가 시작됩니다.");
  };

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
              <Badge className="bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                패킷 생성 완료
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                취업 제출 패킷이 생성되었습니다!
              </h3>
              <p className="text-gray-600 mb-4">
                강사 평가가 반영된 취업 제출 패킷이 준비되었습니다. 이제 패킷을 다운로드할 수 있습니다.
              </p>
              <Button onClick={handleDownload} className="gap-2">
                <Download className="w-4 h-4" />
                패킷 다운로드
              </Button>
            </div>
            <div className="mt-2 flex justify-center">
              <Button variant="outline" onClick={() => navigate("/student/result")}>
                패킷 미리보기
              </Button>
            </div>

            <div>
              <h4 className="font-medium mb-3">제출 정보</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">제출일시</span>
                  <span className="font-medium">{submittedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">승인일시</span>
                  <span className="font-medium text-green-600">
                    {approvedAt}
                  </span>
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
