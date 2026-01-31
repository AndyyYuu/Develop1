import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import { Lightbulb, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const questions = [
  {
    id: "q1",
    ancient: "寻灵光：近日何时，见求道者道心最明？",
    modern: "最近一周，孩子在哪个瞬间最开心、最专注？",
    hint: "可能是打游戏时、画画时、和朋友聊天时、做手工时...描述具体场景"
  },
  {
    id: "q2",
    ancient: "观心劫：汝见其识海中有何郁结之气？",
    modern: "你觉得孩子最近有什么烦恼或压力？",
    hint: "学业压力？人际关系？自我怀疑？不用跟孩子确认，先写下你的观察"
  },
  {
    id: "q3",
    ancient: "探秘境：其心中可有汝未至之境？",
    modern: "孩子心里有没有啥是你不知道的？",
    hint: "比如偷偷追的星、混的圈子、暗恋的人、不想让你知道的爱好"
  }
];

export default function ParentForm() {
  const [, setLocation] = useLocation();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    if (!agreed) {
      toast.error("请先勾选道心誓约");
      return;
    }
    
    const allAnswered = questions.every(q => answers[q.id]?.trim());
    if (!allAnswered) {
      toast.error("请完成所有问题");
      return;
    }

    localStorage.setItem('parentAnswers', JSON.stringify(answers));
    toast.success("护道者灵图已绘制完成");
    setLocation('/child');
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-12">
      {/* 背景 */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(/images/hero-background.png)' }}
      />

      <div className="relative z-10 container max-w-4xl">
        {/* 标题 */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <img 
              src="/images/bagua-pattern.png" 
              alt="八卦" 
              className="w-20 h-20 mx-auto opacity-80"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-primary">护道者灵图</h1>
          <p className="text-muted-foreground text-lg">
            家长视角 · 以爱之目绘制外境图
          </p>
        </div>

        {/* 卷轴容器 */}
        <div 
          className="bg-card/90 backdrop-blur-sm border-2 border-primary/30 rounded-xl p-8 mb-8"
          style={{
            backgroundImage: 'url(/images/scroll-texture.png)',
            backgroundBlendMode: 'soft-light',
            backgroundSize: 'cover'
          }}
        >
          {/* 问题列表 */}
          <div className="space-y-8">
            {questions.map((q, index) => (
              <div key={q.id} className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {q.ancient}
                    </h3>
                    <button
                      onClick={() => setShowHint(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-3"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {showHint[q.id] ? "收起提示" : "点击查看白话翻译"}
                    </button>
                    {showHint[q.id] && (
                      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-3 space-y-2">
                        <p className="text-foreground font-medium">{q.modern}</p>
                        <p className="text-sm text-muted-foreground">👉 提示：{q.hint}</p>
                      </div>
                    )}
                    <Textarea
                      placeholder="请在此书写你的观察..."
                      value={answers[q.id] || ""}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      className="min-h-[120px] bg-background/50 border-primary/20 focus:border-primary/50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 道心誓约 */}
          <div className="mt-8 pt-8 border-t border-primary/20">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div 
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                  agreed 
                    ? 'bg-primary border-primary' 
                    : 'border-primary/50 group-hover:border-primary'
                }`}
                onClick={() => setAgreed(!agreed)}
              >
                {agreed && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
              </div>
              <span className="text-lg">
                以道心为誓，所言皆真
                <span className="text-sm text-muted-foreground ml-2">
                  （我保证我说的是真话）
                </span>
              </span>
            </label>
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="text-lg px-12 py-6 glow-cyan"
            onClick={handleSubmit}
          >
            完成绘制，封印灵图
          </Button>
        </div>

        {/* 说明 */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>完成后，请将设备交给孩子填写求道者灵图</p>
          <p className="mt-2">此非考校，乃绘心 · 道心惟微，允许犹豫</p>
        </div>
      </div>
    </div>
  );
}
