import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import { Lightbulb, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const questions = [
  {
    id: "q1",
    ancient: "问本心：近日何时，尔最感通明自在？",
    modern: "最近啥时候你最爽、最开心、最像你自己？",
    hint: "打游戏通关？和朋友八卦？一个人听歌？吃到了好吃的？随便说！"
  },
  {
    id: "q2",
    ancient: "诉心障：今有何事，如劫雷盘绕？",
    modern: "最近有啥事让你特别烦、压力大？",
    hint: "作业太多？爸妈管太严？考试没考好？和朋友吵架？身材焦虑？"
  },
  {
    id: "q3",
    ancient: "藏幽处：可有洞天，未示于至亲？",
    modern: "你心里有没有啥小秘密，不太跟爸妈说的？",
    hint: "暗恋的人？偷偷攒的零花钱？不想让他们知道的爱好？放心，他们现在看不到你的屏幕"
  }
];

export default function ChildForm() {
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

    localStorage.setItem('childAnswers', JSON.stringify(answers));
    toast.success("求道者灵图已绘制完成");
    setLocation('/comparison');
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
          <h1 className="text-4xl font-bold mb-4 text-secondary">求道者灵图</h1>
          <p className="text-muted-foreground text-lg">
            孩子视角 · 以真之心感知内境
          </p>
        </div>

        {/* 卷轴容器 */}
        <div 
          className="bg-card/90 backdrop-blur-sm border-2 border-secondary/30 rounded-xl p-8 mb-8"
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {q.ancient}
                    </h3>
                    <button
                      onClick={() => setShowHint(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                      className="flex items-center gap-2 text-sm text-secondary hover:text-secondary/80 transition-colors mb-3"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {showHint[q.id] ? "收起提示" : "点击查看白话翻译"}
                    </button>
                    {showHint[q.id] && (
                      <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 mb-3 space-y-2">
                        <p className="text-foreground font-medium">{q.modern}</p>
                        <p className="text-sm text-muted-foreground">👉 提示：{q.hint}</p>
                      </div>
                    )}
                    <Textarea
                      placeholder="请在此书写你的真实感受..."
                      value={answers[q.id] || ""}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      className="min-h-[120px] bg-background/50 border-secondary/20 focus:border-secondary/50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 道心誓约 */}
          <div className="mt-8 pt-8 border-t border-secondary/20">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div 
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                  agreed 
                    ? 'bg-secondary border-secondary' 
                    : 'border-secondary/50 group-hover:border-secondary'
                }`}
                onClick={() => setAgreed(!agreed)}
              >
                {agreed && <CheckCircle2 className="w-4 h-4 text-secondary-foreground" />}
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
            className="text-lg px-12 py-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground glow-red"
            onClick={handleSubmit}
          >
            完成绘制，封印灵图
          </Button>
        </div>

        {/* 说明 */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>完成后，双方灵图将交换显现</p>
          <p className="mt-2">此非考校，乃绘心 · 道心惟微，允许犹豫</p>
        </div>
      </div>
    </div>
  );
}
