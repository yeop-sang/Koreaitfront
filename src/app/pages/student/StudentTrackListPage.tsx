import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { FileText, CheckCircle, Clock, Download } from "lucide-react";

interface Track {
  id: string;
  name: string;
  description: string;
  hasSubmitted: boolean;
  isApproved: boolean;
  submittedAt?: string;
}

export function StudentTrackListPage() {
  const navigate = useNavigate();

  const [tracks] = useState<Track[]>([
    {
      id: "t1",
      name: "백엔드 개발 기초",
      description: "Spring Boot와 JPA를 활용한 RESTful API 개발",
      hasSubmitted: true,
      isApproved: true,
      submittedAt: "2026-04-05",
    },
    {
      id: "t2",
      name: "프론트엔드 심화",
      description: "React와 TypeScript를 활용한 SPA 개발",
      hasSubmitted: true,
      isApproved: false,
      submittedAt: "2026-04-08",
    },
    {
      id: "t3",
      name: "데이터베이스 설계",
      description: "효율적인 데이터베이스 모델링과 쿼리 최적화",
      hasSubmitted: false,
      isApproved: false,
    },
  ]);

  const handleTrackClick = (track: Track) => {
    if (!track.hasSubmitted) {
      navigate(`/student/track/${track.id}/upload`);
    } else if (!track.isApproved) {
      navigate(`/student/track/${track.id}/status`);
    } else {
      navigate(`/student/track/${track.id}/download`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">내 트랙</h1>
          <p className="text-gray-600 mt-2">증빙 업로드/강사 평가/패킷 생성 상태를 확인합니다</p>

        </div>
        <div className="space-y-4">
          {tracks.map((track) => (
            <Card
              key={track.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleTrackClick(track)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{track.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">
                      {track.description}
                    </p>
                  </div>
                  <div>
                    {!track.hasSubmitted ? (
                      <Badge variant="outline" className="bg-yellow-50">
                        <Clock className="w-3 h-3 mr-1" />
                        증빙 업로드 필요
                      </Badge>
                    ) : track.isApproved ? (
                      <Badge className="bg-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        패킷 생성 완료
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-50">
                        <Clock className="w-3 h-3 mr-1" />
                        강사 평가 대기
                      </Badge>
                    )}
                </div>
              </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {track.hasSubmitted && track.submittedAt && (
                      <span>제출일: {track.submittedAt}</span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrackClick(track);
                    }}
                  >
                    {!track.hasSubmitted ? (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        프로젝트 업로드
                      </>
                    ) : track.isApproved ? (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        패킷 다운로드
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 mr-2" />
                        강사 평가 대기
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {tracks.length === 0 && (
            <Card className="p-12">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  수강 중인 트랙이 없습니다
                </h3>
                <p className="text-gray-600">
                  강사가 트랙에 등록하면 여기에 표시됩니다
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
