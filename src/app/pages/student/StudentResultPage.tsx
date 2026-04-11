import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { ArrowLeft, Download, Briefcase } from 'lucide-react';

interface JobRecommendation {
  title: string;
  reason: string;
  missingSkills: string[];
}

export function StudentResultPage() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');

  const [portfolioSummary] = useState({
    title: '온라인 쇼핑몰 프로젝트',
    role: '백엔드 개발 담당',
    period: '2024.01 - 2024.03',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'REST API'],
    achievements: [
      'RESTful API 15개 엔드포인트 설계 및 구현',
      'JWT 기반 사용자 인증 시스템 개발',
      'PostgreSQL 데이터베이스 설계 및 최적화',
      'API 응답 속도 30% 개선',
    ],
  });

  const [jobRecommendations] = useState<JobRecommendation[]>([
    {
      title: '백엔드 개발자',
      reason: 'API 설계 및 데이터베이스 모델링 역량이 높게 평가됨',
      missingSkills: ['클라우드 배포 경험', '대규모 트래픽 처리'],
    },
    {
      title: '풀스택 개발자',
      reason: '백엔드 개발 역량을 기반으로 프론트엔드 역량 추가 시 적합',
      missingSkills: ['React/Vue 등 프론트엔드 프레임워크'],
    },
    {
      title: '서버 개발자',
      reason: 'API 개발 및 데이터베이스 설계 경험 보유',
      missingSkills: ['마이크로서비스 아키텍처', '메시지 큐 활용'],
    },
  ]);

  useEffect(() => {
    const savedStudentId = localStorage.getItem('studentId');
    if (!savedStudentId) {
      navigate('/student/login');
      return;
    }
    setStudentId(savedStudentId);
  }, [navigate]);

  const handleDownload = () => {
    alert('취업 제출 패킷이 다운로드됩니다');
    // TODO: PDF 다운로드 로직
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/student/contribution')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            이전으로
          </Button>
          <div className="text-sm text-slate-600">
            학번: <span className="font-medium">{studentId}</span>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>취업 제출 패킷</CardTitle>
            <CardDescription>
              기업 제출용 텍스트 기반 패킷 미리보기입니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2">{portfolioSummary.title}</h3>
              <p className="text-sm text-slate-600 mb-3">
                {portfolioSummary.role} | {portfolioSummary.period}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {portfolioSummary.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3">주요 성과</h4>
              <ul className="space-y-2">
                {portfolioSummary.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-sm text-slate-700 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              패킷 다운로드
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>관련 직무</CardTitle>
            <CardDescription>
              패킷과 강사 평가를 바탕으로 관련 직무를 제안합니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobRecommendations.map((job, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">{job.title}</h4>
                        <p className="text-sm text-slate-600 mb-3">{job.reason}</p>
                        {job.missingSkills.length > 0 && (
                          <div>
                            <p className="text-xs text-slate-500 mb-2">보완하면 좋은 역량:</p>
                            <div className="flex flex-wrap gap-1">
                              {job.missingSkills.map((skill, skillIdx) => (
                                <Badge key={skillIdx} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={() => navigate('/')}
            >
              처음으로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
