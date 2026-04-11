import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Competency {
  title: string;
  description: string;
  priority: number;
  source_refs: string;
  flags: string;
}

export function StudentCompetencySelectionPage() {
  const navigate = useNavigate();
  const { trackId } = useParams();
  const location = useLocation();
  const { files, projectName, links } = (location.state as any) || {};
  const trackName = "백엔드 개발 기초"; // Mock data

  // Mock AI response
  const [competencies] = useState<Competency[]>([
    {
      title: "API 설계 능력",
      description: "RESTful 원칙 준수 및 명세화 역량",
      priority: 1,
      source_refs: "강의안 p.12",
      flags: "확인 필요",
    },
    {
      title: "DB 정규화",
      description: "정규화 규칙에 따른 테이블 분리",
      priority: 2,
      source_refs: "강의안 p.23",
      flags: "확인 필요",
    },
    {
      title: "DB 튜닝",
      description: "커넥션 풀 조절",
      priority: 3,
      source_refs: "강의안 p.30",
      flags: "확인 필요",
    },
    {
      title: "인증/인가 구현",
      description: "JWT 기반 인증 시스템 구축",
      priority: 4,
      source_refs: "강의안 p.45",
      flags: "확인 필요",
    },
    {
      title: "에러 핸들링",
      description: "전역 예외 처리 및 로깅",
      priority: 5,
      source_refs: "강의안 p.56",
      flags: "확인 필요",
    },
  ]);

  const [selectedCompetencies, setSelectedCompetencies] = useState<Set<number>>(
    new Set()
  );

  const toggleCompetency = (index: number) => {
    const newSelected = new Set(selectedCompetencies);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedCompetencies(newSelected);
  };

  const handleNext = () => {
    if (selectedCompetencies.size === 0) {
      toast.error("최소 1개 이상의 역량을 선택해주세요.");
      return;
    }

    const selected = Array.from(selectedCompetencies).map(
      (index) => competencies[index]
    );

    navigate(`/student/track/${trackId}/contribution`, {
      state: {
        selectedCompetencies: selected,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/student/tracks")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            트랙 목록으로
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">역량 선택</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              {trackName} - AI가 분석한 역량 중 본인이 수행한 항목을 선택하세요
            </p>
            {files && files.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                제출한 파일: {files.join(", ")}
              </p>
)}
            {projectName && (
              <p className="text-xs text-gray-500 mt-1">프로젝트명: {projectName}</p>
            )}
            {links && (
              <div className="text-xs text-gray-500 mt-1 space-x-2">
                {links.representative && (
                  <a href={links.representative} target="_blank" rel="noreferrer" className="underline text-blue-600">대표</a>
                )}
                {links.github && (
                  <a href={links.github} target="_blank" rel="noreferrer" className="underline text-blue-600">GitHub</a>
                )}
                {links.presentation && (
                  <a href={links.presentation} target="_blank" rel="noreferrer" className="underline text-blue-600">발표</a>
                )}
                {links.deploy && (
                  <a href={links.deploy} target="_blank" rel="noreferrer" className="underline text-blue-600">배포</a>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
              <p className="text-sm text-blue-800">
                ✨ AI가 강의자료와 발표자료를 분석하여 아래 역량 후보를
                추출했습니다. 본인이 실제로 수행한 역량을 선택해주세요.
              </p>
            </div>

            <div className="space-y-3">
              {competencies.map((competency, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleCompetency(index)}
                >
                  <Checkbox
                    checked={selectedCompetencies.has(index)}
                    onCheckedChange={() => toggleCompetency(index)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{competency.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        우선순위 {competency.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {competency.description}
                    </p>
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>출처: {competency.source_refs}</span>
                      {competency.flags && (
                        <span className="text-yellow-600">
                          🔍 {competency.flags}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <p className="text-sm text-gray-600">
                {selectedCompetencies.size}개 선택됨
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate("/student/tracks")}
                >
                  취소
                </Button>
                <Button onClick={handleNext}>다음</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
