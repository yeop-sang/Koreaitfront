import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface Competency {
  title: string;
  description: string;
  priority: number;
  source_refs: string;
  flags: string;
}

interface ContributionScore {
  competency: Competency;
  score: string;
}

export function StudentContributionPage() {
  const navigate = useNavigate();
  const { trackId } = useParams();
  const location = useLocation();
  const { selectedCompetencies } = location.state || {};

  const trackName = "백엔드 개발 기초"; // Mock data

  const [contributionScores, setContributionScores] = useState<ContributionScore[]>(
    (selectedCompetencies || []).map((comp: Competency) => ({
      competency: comp,
      score: "3", // Default to 3
    }))
  );

  const updateScore = (index: number, score: string) => {
    const newScores = [...contributionScores];
    newScores[index].score = score;
    setContributionScores(newScores);
  };

  const handleSubmit = () => {
    // TODO: API 호출
    console.log('기여도 저장:', contributionScores);

    toast.success('기여도가 저장되었습니다!');
    navigate('/student/tracks');
  };

  if (!selectedCompetencies || selectedCompetencies.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-6">
          <p>선택된 역량이 없습니다.</p>
          <Button onClick={() => navigate('/student/tracks')} className="mt-4">
            트랙 목록으로 이동
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전으로
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">기여도 입력</CardTitle>
            <CardDescription>
              {trackName} - 선택한 역량별로 본인의 기여도를 1~5점으로 평가하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 각 역량에 대한 본인의 기여도를 솔직하게 평가해주세요.
                1점(최소)부터 5점(최대)까지 선택할 수 있습니다.
              </p>
            </div>

            <div className="space-y-4">
              {contributionScores.map((item, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">
                          {item.competency.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {item.competency.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          출처: {item.competency.source_refs}
                        </p>
                      </div>
                      <div className="min-w-[150px]">
                        <Label className="text-sm mb-2 block">기여도</Label>
                        <Select
                          value={item.score}
                          onValueChange={(value) => updateScore(index, value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1점 (낮음)</SelectItem>
                            <SelectItem value="2">2점</SelectItem>
                            <SelectItem value="3">3점 (보통)</SelectItem>
                            <SelectItem value="4">4점</SelectItem>
                            <SelectItem value="5">5점 (높음)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => navigate('/student/tracks')}
              >
                취소
              </Button>
              <Button onClick={handleSubmit}>
                완료
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
