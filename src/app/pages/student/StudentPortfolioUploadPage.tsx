import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function StudentPortfolioUploadPage() {
  const navigate = useNavigate();
  const { trackId } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [repLink, setRepLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [presentationLink, setPresentationLink] = useState("");
  const [deployLink, setDeployLink] = useState("");
  const trackName = "백엔드 개발 기초"; // Mock data

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        (file) => file.type === "application/pdf"
      );
      if (newFiles.length !== e.target.files.length) {
        toast.error("PDF 파일만 업로드 가능합니다.");
      }
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      toast.error("프로젝트 PDF를 최소 1개 이상 업로드해주세요.");
      return;
    }

    setIsUploading(true);

    // Mock API call
    setTimeout(() => {
      setIsUploading(false);
      toast.success("프로젝트가 업로드되었습니다!");
      navigate(`/student/track/${trackId}/competency`, {
        state: {
          files: uploadedFiles.map((f) => f.name),
          projectName: projectName.trim(),
          links: {
            representative: repLink.trim(),
            github: githubLink.trim() || undefined,
            presentation: presentationLink.trim() || undefined,
            deploy: deployLink.trim() || undefined,
          },
        },
      });
    }, 1500);
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
            <CardTitle className="text-2xl">프로젝트 업로드</CardTitle>
            <p className="text-sm text-gray-600 mt-2">{trackName}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">프로젝트명</Label>
                <Input
                  id="projectName"
                  placeholder="예: 온라인 쇼핑몰 개선"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repLink">대표 링크</Label>
                <Input
                  id="repLink"
                  type="url"
                  placeholder="예: https://portfolio.example.com/project"
                  value={repLink}
                  onChange={(e) => setRepLink(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubLink">GitHub (선택)</Label>
                <Input
                  id="githubLink"
                  type="url"
                  placeholder="예: https://github.com/your/repo"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="presentationLink">발표자료 (선택)</Label>
                <Input
                  id="presentationLink"
                  type="url"
                  placeholder="예: https://slides.com/your/presentation"
                  value={presentationLink}
                  onChange={(e) => setPresentationLink(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deployLink">배포 URL (선택)</Label>
                <Input
                  id="deployLink"
                  type="url"
                  placeholder="예: https://your-app.example.com"
                  value={deployLink}
                  onChange={(e) => setDeployLink(e.target.value)}
                />
              </div>
            </div>
            <div className="h-px bg-gray-200 my-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-4">
                프로젝트 PDF를 드래그하거나 클릭하여 업로드하세요
              </p>
              <input
                type="file"
                multiple
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                파일 선택
              </Button>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  업로드된 파일 ({uploadedFiles.length})
                </p>
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <span className="text-sm">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/student/tracks")}
                disabled={isUploading}
              >
                취소
              </Button>
              <Button onClick={handleSubmit} disabled={isUploading || !uploadedFiles.length}>
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    업로드 중...
                  </>
                ) : (
                  "다음"
                )}
</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
