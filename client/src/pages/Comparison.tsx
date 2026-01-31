import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Sun, Zap } from "lucide-react";
import { toast } from "sonner";

const questions = [
  { id: "q1", parent: "寻灵光：近日何时，见求道者道心最明？", child: "问本心：近日何时，尔最感通明自在？" },
  { id: "q2", parent: "观心劫：汝见其识海中有何郁结之气？", child: "诉心障：今有何事，如劫雷盘绕？" },
  { id: "q3", parent: "探秘境：其心中可有汝未至之境？", child: "藏幽处：可有洞天，未示于至亲？" }
];

type MarkType = 'light' | 'rift' | null;

export default function Comparison() {
  const [, setLocation] = useLocation();
  const [parentAnswers, setParentAnswers] = useState<Record<string, string>>({});
  const [childAnswers, setChildAnswers] = useState<Record<string, string>>({});
  const [parentMarks, setParentMarks] = useState<Record<string, MarkType>>({});
  const [childMarks, setChildMarks] = useState<Record<string, MarkType>>({});
  const [resonanceCount, setResonanceCount] = useState(0);

  useEffect(() => {
    const parent = localStorage.getItem('parentAnswers');
    const child = localStorage.getItem('childAnswers');
    
    if (!parent || !child) {
      toast.error("请先完成双方问卷");
      setLocation('/');
      return;
    }
    
    setParentAnswers(JSON.parse(parent));
    setChildAnswers(JSON.parse(child));
  }, [setLocation]);

  const handleMark = (questionId: string, role: 'parent' | 'child', markType: MarkType) => {
    if (role === 'parent') {
      setParentMarks(prev => ({
        ...prev,
        [questionId]: prev[questionId] === markType ? null : markType
      }));
    } else {
      setChildMarks(prev => ({
        ...prev,
        [questionId]: prev[questionId] === markType ? null : markType
      }));
    }
  };

  useEffect(() => {
    let count = 0;
    questions.forEach(q => {
      if (parentMarks[q.id] === 'light' && childMarks[q.id] === 'light') {
        count++;
      }
    });
    setResonanceCount(count);
  }, [parentMarks, childMarks]);

  const handleContinue = () => {
    const allMarked = questions.every(q => 
      (parentMarks[q.id] || childMarks[q.id])
    );
    
    if (!allMarked) {
      toast.error("请至少为每个问题标记一次");
      return;
    }

    localStorage.setItem('parentMarks', JSON.stringify(parentMarks));
    localStorage.setItem('childMarks', JSON.stringify(childMarks));
    localStorage.setItem('resonanceCount', resonanceCount.toString());
    
    setLocation('/sharing');
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-12">
      {/* 背景 */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(/images/hero-background.png)' }}
      />

      <div className="relative z-10 container max-w-7xl">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">双镜交辉</h1>
          <p className="text-muted-foreground text-lg mb-4">
            两卷灵图已成，现在——交换
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-primary" />
              <span>点灵术（认同/温暖）</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-destructive" />
              <span>破妄纹（好奇/疑问）</span>
            </div>
          </div>
          {resonanceCount > 0 && (
            <div className="mt-4 text-primary text-lg font-semibold animate-pulse">
              ✨ 共鸣次数：{resonanceCount} 次 - 两心共鸣，光彻九霄！
            </div>
          )}
        </div>

        {/* 对比区域 */}
        <div className="space-y-8 mb-12">
          {questions.map((q, index) => (
            <div key={q.id} className="grid md:grid-cols-2 gap-6">
              {/* 护道者（家长）答案 */}
              <div className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-xl p-6 relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-primary">护道者视角</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{q.parent}</p>
                <div className="bg-background/50 rounded-lg p-4 mb-4 min-h-[100px]">
                  <p className="whitespace-pre-wrap">{parentAnswers[q.id]}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={parentMarks[q.id] === 'light' ? 'default' : 'outline'}
                    className={parentMarks[q.id] === 'light' ? 'bg-primary glow-cyan' : ''}
                    onClick={() => handleMark(q.id, 'parent', 'light')}
                  >
                    <Sun className="w-4 h-4 mr-1" />
                    微光
                  </Button>
                  <Button
                    size="sm"
                    variant={parentMarks[q.id] === 'rift' ? 'default' : 'outline'}
                    className={parentMarks[q.id] === 'rift' ? 'bg-destructive glow-purple' : ''}
                    onClick={() => handleMark(q.id, 'parent', 'rift')}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    裂隙
                  </Button>
                </div>
              </div>

              {/* 求道者（孩子）答案 */}
              <div className="bg-card/80 backdrop-blur-sm border-2 border-secondary/30 rounded-xl p-6 relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-secondary">求道者视角</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{q.child}</p>
                <div className="bg-background/50 rounded-lg p-4 mb-4 min-h-[100px]">
                  <p className="whitespace-pre-wrap">{childAnswers[q.id]}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={childMarks[q.id] === 'light' ? 'default' : 'outline'}
                    className={childMarks[q.id] === 'light' ? 'bg-primary glow-cyan' : ''}
                    onClick={() => handleMark(q.id, 'child', 'light')}
                  >
                    <Sun className="w-4 h-4 mr-1" />
                    微光
                  </Button>
                  <Button
                    size="sm"
                    variant={childMarks[q.id] === 'rift' ? 'default' : 'outline'}
                    className={childMarks[q.id] === 'rift' ? 'bg-destructive glow-purple' : ''}
                    onClick={() => handleMark(q.id, 'child', 'rift')}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    裂隙
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 继续按钮 */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="text-lg px-12 py-6 glow-cyan"
            onClick={handleContinue}
          >
            进入真言法会
          </Button>
        </div>
      </div>
    </div>
  );
}
