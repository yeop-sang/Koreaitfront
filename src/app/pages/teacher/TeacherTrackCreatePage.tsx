import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function TeacherTrackCreatePage() {
  const navigate = useNavigate();
  const [trackName, setTrackName] = useState("");
  const [trackDescription, setTrackDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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
    if (!trackName.trim()) {
      toast.error("트랙 이름을 입력해주세요.");
      return;
    }
    if (!trackDescription.trim()) {
      toast.error("트랙 정보를 입력해주세요.");
      return;
    }
    if (uploadedFiles.length === 0) {
      toast.error("강의자료를 최소 1개 이상 업로드해주세요.");
      return;
    }

    setIsUploading(true);

    // Mock API call - AI가 평가지표 생성
    setTimeout(() => {
      setIsUploading(false);
      toast.success("트랙이 생성되었습니다!");
      // Navigate to track detail page with generated criteria
      navigate("/teacher/track/t3", {
        state: {
          trackName,
          trackDescription,
          files: uploadedFiles.map((f) => f.name),
          isNew: true,
        },
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/teacher/tracks")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            트랙 목록으로
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">새 트랙 생성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="trackName">트랙 이름</Label>
              <Input
                id="trackName"
                placeholder="예: 백엔드 개발 기초"
                value={trackName}
                onChange={(e) => setTrackName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trackDescription">트랙 정보</Label>
              <Textarea
                id="trackDescription"
                placeholder="트랙에 대한 설명을 입력하세요"
                rows={4}
                value={trackDescription}
                onChange={(e) => setTrackDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>강의자료 (PDF)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-4">
                  PDF 파일을 드래그하거나 클릭하여 업로드하세요
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
                <div className="mt-4 space-y-2">
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
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/teacher/tracks")}
                disabled={isUploading}
              >
                취소
              </Button>
              <Button onClick={handleSubmit} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    AI가 평가지표 생성 중...
                  </>
                ) : (
                  "트랙 생성"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
