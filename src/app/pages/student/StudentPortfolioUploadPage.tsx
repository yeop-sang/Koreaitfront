import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function StudentPortfolioUploadPage() {
  const navigate = useNavigate();
  const { trackId } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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
      toast.error("발표자료를 최소 1개 이상 업로드해주세요.");
      return;
    }

    setIsUploading(true);

    // Mock API call
    setTimeout(() => {
      setIsUploading(false);
      toast.success("발표자료가 업로드되었습니다!");
      // Navigate to competency selection page
      navigate(`/student/track/${trackId}/competency`, {
        state: {
          files: uploadedFiles.map((f) => f.name),
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
            <CardTitle className="text-2xl">발표자료 업로드</CardTitle>
            <p className="text-sm text-gray-600 mt-2">{trackName}</p>
          </CardHeader>
          <CardContent className="space-y-6">
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
              <Button onClick={handleSubmit} disabled={isUploading}>
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
