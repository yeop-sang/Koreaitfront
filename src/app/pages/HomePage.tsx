import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">취업 포트폴리오 관리</h1>
          <p className="text-slate-600">강사와 학생이 함께 만드는 취업 준비 시스템</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/teacher/tracks')}>
            <CardHeader>
              <CardTitle className="text-2xl">강사 모드</CardTitle>
              <CardDescription>트랙 생성 및 학생 평가 관리</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• 교육 트랙 생성 및 관리</li>
                <li>• AI 자동 평가지표 생성</li>
                <li>• 학생 포트폴리오 검토</li>
                <li>• 학생별 역량 평가</li>
              </ul>
              <Button className="w-full mt-6">강사로 시작하기</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/student/tracks')}>
            <CardHeader>
              <CardTitle className="text-2xl">학생 모드</CardTitle>
              <CardDescription>포트폴리오 업로드 및 역량 평가</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• 수강 트랙 확인</li>
                <li>• 발표자료 업로드</li>
                <li>• AI 역량 분석 및 선택</li>
                <li>• 개인 기여도 평가</li>
              </ul>
              <Button className="w-full mt-6">학생으로 시작하기</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
