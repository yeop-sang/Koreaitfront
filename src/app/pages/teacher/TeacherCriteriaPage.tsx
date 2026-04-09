import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import { Plus, Save, ArrowLeft, Trash2, Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../components/ui/utils";

interface Student {
  id: string;
  name: string;
}

interface Criterion {
  id: string;
  name: string;
  description: string;
}

interface Score {
  criterionId: string;
  studentId: string;
  value: string; // "-" | "1" | "2" | "3" | "4" | "5"
}

export function TeacherCriteriaPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseName, assignmentDesc, files } = location.state || {};

  // Mock available students database
  const availableStudents = [
    { id: "s1", name: "김철수", phone: "1234" },
    { id: "s2", name: "이영희", phone: "5678" },
    { id: "s3", name: "박민수", phone: "9012" },
    { id: "s4", name: "김철수", phone: "3456" }, // 동명이인
    { id: "s5", name: "최지은", phone: "7890" },
    { id: "s6", name: "정현우", phone: "2345" },
    { id: "s7", name: "이영희", phone: "6789" }, // 동명이인
  ];

  // Selected students for this assignment
  const [students, setStudents] = useState<Student[]>([
    { id: "s1", name: "김철수" },
    { id: "s2", name: "이영희" },
    { id: "s3", name: "박민수" },
  ]);

  // Mock auto-generated criteria from backend analysis
  const [criteria, setCriteria] = useState<Criterion[]>([
    {
      id: "c1",
      name: "코드 구조",
      description: "코드의 구조화 및 모듈화 수준",
    },
    {
      id: "c2",
      name: "알고리즘 이해도",
      description: "문제 해결을 위한 알고리즘 적용 능력",
    },
    {
      id: "c3",
      name: "문서화",
      description: "코드 주석 및 README 작성 수준",
    },
    {
      id: "c4",
      name: "테스트 커버리지",
      description: "단위 테스트 및 통합 테스트 완성도",
    },
  ]);

  const [scores, setScores] = useState<Score[]>([]);
  const [newCriterionName, setNewCriterionName] = useState("");
  const [isAddingCriterion, setIsAddingCriterion] = useState(false);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [openStudentCombobox, setOpenStudentCombobox] = useState(false);

  const getScore = (criterionId: string, studentId: string): string => {
    const score = scores.find(
      (s) => s.criterionId === criterionId && s.studentId === studentId
    );
    return score?.value || "-";
  };

  const setScore = (criterionId: string, studentId: string, value: string) => {
    setScores((prev) => {
      const existing = prev.find(
        (s) => s.criterionId === criterionId && s.studentId === studentId
      );
      if (existing) {
        return prev.map((s) =>
          s.criterionId === criterionId && s.studentId === studentId
            ? { ...s, value }
            : s
        );
      }
      return [...prev, { criterionId, studentId, value }];
    });
  };

  const addCriterion = () => {
    if (!newCriterionName.trim()) return;

    if (criteria.length >= 5) {
      toast.error("평가 요소는 최대 5개까지 추가할 수 있습니다.");
      return;
    }

    const newCriterion: Criterion = {
      id: `c${criteria.length + 1}`,
      name: newCriterionName,
      description: "",
    };
    setCriteria([...criteria, newCriterion]);
    setNewCriterionName("");
    setIsAddingCriterion(false);
    toast.success("평가 요소가 추가되었습니다.");
  };

  const addStudent = (studentId: string) => {
    const selectedStudent = availableStudents.find((s) => s.id === studentId);
    if (!selectedStudent) return;

    // Check if student already added
    if (students.some((s) => s.id === studentId)) {
      toast.error("이미 추가된 학생입니다.");
      return;
    }

    const newStudent: Student = {
      id: selectedStudent.id,
      name: selectedStudent.name,
    };
    setStudents([...students, newStudent]);
    setIsAddingStudent(false);
    setOpenStudentCombobox(false);
    toast.success("학생이 추가되었습니다.");
  };

  const removeStudent = (studentId: string) => {
    setStudents(students.filter((s) => s.id !== studentId));
    // Remove scores for this student
    setScores(scores.filter((s) => s.studentId !== studentId));
    toast.success("학생이 제거되었습니다.");
  };

  const removeCriterion = (criterionId: string) => {
    setCriteria(criteria.filter((c) => c.id !== criterionId));
    // Remove scores for this criterion
    setScores(scores.filter((s) => s.criterionId !== criterionId));
    toast.success("평가 요소가 제거되었습니다.");
  };

  const handleSave = async () => {
    // Mock API call to save rubric data
    // const data = {
    //   courseName,
    //   assignmentDesc,
    //   files,
    //   criteria,
    //   scores,
    // };
    // await fetch('/api/teacher/rubric/save', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });

    toast.success("평가표가 저장되었습니다!");
  };

  if (!courseName) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-6">
          <p>업로드 페이지에서 먼저 과정 정보를 입력해주세요.</p>
          <Button onClick={() => navigate("/teacher/upload")} className="mt-4">
            업로드 페이지로 이동
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate("/teacher/upload")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로 가기
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            저장
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{courseName}</CardTitle>
            {assignmentDesc && (
              <p className="text-sm text-gray-600 mt-2">
                {assignmentDesc}
              </p>
            )}
            {files && files.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                분석된 파일: {files.join(", ")}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                백엔드 분석을 통해 자동 생성된 루브릭 평가표입니다.
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-max">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left p-4 bg-gray-100 font-semibold min-w-[150px]">
                        학생
                      </th>
                      {criteria.map((criterion) => (
                        <th
                          key={criterion.id}
                          className="text-center p-4 bg-gray-100 font-semibold min-w-[120px]"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div>
                              <div className="font-medium">{criterion.name}</div>
                              {criterion.description && (
                                <div className="text-xs text-gray-500 font-normal mt-1">
                                  {criterion.description}
                                </div>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCriterion(criterion.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-gray-200">
                        <td className="p-4 bg-gray-50">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{student.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeStudent(student.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                        {criteria.map((criterion) => (
                          <td key={criterion.id} className="p-4 text-center">
                            <Select
                              value={getScore(criterion.id, student.id)}
                              onValueChange={(value) =>
                                setScore(criterion.id, student.id, value)
                              }
                            >
                              <SelectTrigger className="w-[100px] mx-auto">
                                <SelectValue placeholder="-" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="-">-</SelectItem>
                                <SelectItem value="1">1점</SelectItem>
                                <SelectItem value="2">2점</SelectItem>
                                <SelectItem value="3">3점</SelectItem>
                                <SelectItem value="4">4점</SelectItem>
                                <SelectItem value="5">5점</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        ))}
                      </tr>
                    ))}
                    {isAddingStudent && (
                      <tr className="border-b border-gray-200 bg-blue-50">
                        <td className="p-4">
                          <Popover open={openStudentCombobox} onOpenChange={setOpenStudentCombobox}>
                            <PopoverTrigger asChild>
                              <div>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={openStudentCombobox}
                                  className="w-full justify-between"
                                  onClick={() => setOpenStudentCombobox(true)}
                                >
                                  학생 선택...
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0">
                              <Command>
                                <CommandInput placeholder="학생 검색 (이름 또는 번호)..." />
                                <CommandList>
                                  <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                                  <CommandGroup>
                                    {availableStudents
                                      .filter((s) => !students.some((st) => st.id === s.id))
                                      .map((student) => (
                                        <CommandItem
                                          key={student.id}
                                          value={`${student.name}${student.phone}`}
                                          onSelect={() => addStudent(student.id)}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              "opacity-0"
                                            )}
                                          />
                                          {student.name}{student.phone}
                                        </CommandItem>
                                      ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </td>
                        {criteria.map((criterion) => (
                          <td key={criterion.id} className="p-4 text-center">
                            <div className="w-[100px] h-10 mx-auto bg-gray-200 rounded" />
                          </td>
                        ))}
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="mt-4 flex gap-2">
                  {isAddingStudent ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsAddingStudent(false);
                          setOpenStudentCombobox(false);
                        }}
                      >
                        취소
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingStudent(true)}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      학생 추가
                    </Button>
                  )}

                  {isAddingCriterion ? (
                    <>
                      <Input
                        placeholder="평가 요소 이름"
                        value={newCriterionName}
                        onChange={(e) => setNewCriterionName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") addCriterion();
                          if (e.key === "Escape") {
                            setIsAddingCriterion(false);
                            setNewCriterionName("");
                          }
                        }}
                        className="w-[200px]"
                      />
                      <Button onClick={addCriterion} size="sm">
                        추가
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsAddingCriterion(false);
                          setNewCriterionName("");
                        }}
                      >
                        취소
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingCriterion(true)}
                      className="gap-2"
                      disabled={criteria.length >= 5}
                    >
                      <Plus className="w-4 h-4" />
                      평가 요소 추가
                    </Button>
                  )}
                  {criteria.length >= 5 && (
                    <p className="text-xs text-gray-500 mt-2">
                      평가 요소는 최대 5개까지 추가할 수 있습니다.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
