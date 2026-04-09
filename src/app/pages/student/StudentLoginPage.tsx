import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ArrowLeft } from 'lucide-react';

export function StudentLoginPage() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentId.trim()) {
      alert('학번을 입력해주세요');
      return;
    }

    // TODO: 학번 확인 API 호출
    // 임시로 로컬 스토리지에 저장
    localStorage.setItem('studentId', studentId);

    navigate('/student/upload');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          처음으로
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>학생 로그인</CardTitle>
            <CardDescription>학번을 입력하여 시작하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">학번</Label>
                <Input
                  id="studentId"
                  placeholder="예: 2024001"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                시작하기
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
