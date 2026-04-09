import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, FileText, Check, X, Download } from "lucide-react";
import { toast } from "sonner";

interface StudentSubmission {
  id: string;
  studentName: string;
  submittedAt: string;
  files: { name: string; url: string }[];
  status: "pending" | "approved" | "rejected";
}

export function TeacherPortfolioReviewPage() {
  const navigate = useNavigate();
  const { trackId } = useParams();

  const [submissions, setSubmissions] = useState<StudentSubmission[]>([
    {
      id: "sub1",
      studentName: "김철수",
      submittedAt: "2026-04-08 14:30",
      files: [
        { name: "발표자료.pdf", url: "#" },
        { name: "프로젝트_문서.pdf", url: "#" },
      ],
      status: "pending",
    },
    {
      id: "sub2",
      studentName: "박민지",
      submittedAt: "2026-04-08 16:20",
      files: [{ name: "최종발표.pdf", url: "#" }],
      status: "pending",
    },
  ]);

  const handleApprove = (submissionId: string) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === submissionId ? { ...sub, status: "approved" as const } : sub
      )
    );
    toast.success("포트폴리오가 승인되었습니다.");
  };

  const handleReject = (submissionId: string) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === submissionId ? { ...sub, status: "rejected" as const } : sub
      )
    );
    toast.success("포트폴리오가 반려되었습니다.");
  };

  const pendingSubmissions = submissions.filter((s) => s.status === "pending");

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(`/teacher/track/${trackId}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            트랙으로 돌아가기
          </Button>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold">포트폴리오 검토</h1>
          <p className="text-gray-600 mt-2">
            학생들이 제출한 포트폴리오를 검토하고 승인합니다
          </p>
        </div>

        {pendingSubmissions.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                검토 대기 중인 포트폴리오가 없습니다
              </h3>
              <p className="text-gray-600">
                학생들이 포트폴리오를 제출하면 여기에 표시됩니다
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        {submission.studentName}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        제출일시: {submission.submittedAt}
                      </p>
                    </div>
                    {submission.status === "pending" ? (
                      <Badge variant="outline" className="bg-yellow-50">
                        검토 대기
                      </Badge>
                    ) : submission.status === "approved" ? (
                      <Badge className="bg-green-500">승인 완료</Badge>
                    ) : (
                      <Badge variant="destructive">반려됨</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">제출 파일</h4>
                      <div className="space-y-2">
                        {submission.files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-600" />
                              <span className="text-sm">{file.name}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {submission.status === "pending" && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => handleApprove(submission.id)}
                          className="gap-2"
                        >
                          <Check className="w-4 h-4" />
                          승인
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleReject(submission.id)}
                          className="gap-2"
                        >
                          <X className="w-4 h-4" />
                          반려
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
