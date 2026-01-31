import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Download, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function Summary() {
  const [, setLocation] = useLocation();
  const [resonanceCount, setResonanceCount] = useState(0);
  const [parentAnswers, setParentAnswers] = useState<Record<string, string>>({});
  const [childAnswers, setChildAnswers] = useState<Record<string, string>>({});
  const [parentReflection, setParentReflection] = useState("");
  const [childReflection, setChildReflection] = useState("");

  useEffect(() => {
    const count = localStorage.getItem('resonanceCount');
    const parent = localStorage.getItem('parentAnswers');
    const child = localStorage.getItem('childAnswers');
    const parentRef = localStorage.getItem('parentReflection');
    const childRef = localStorage.getItem('childReflection');

    if (count) setResonanceCount(parseInt(count));
    if (parent) setParentAnswers(JSON.parse(parent));
    if (child) setChildAnswers(JSON.parse(child));
    if (parentRef) setParentReflection(parentRef);
    if (childRef) setChildReflection(childRef);
  }, []);

  const handleDownload = () => {
    const content = `
焕墟幻境·破壁 - 修行记录
================================

共鸣次数：${resonanceCount} 次

护道者灵图（家长）
--------------------------------
Q1: ${parentAnswers.q1 || ''}
Q2: ${parentAnswers.q2 || ''}
Q3: ${parentAnswers.q3 || ''}

求道者灵图（孩子）
--------------------------------
Q1: ${childAnswers.q1 || ''}
Q2: ${childAnswers.q2 || ''}
Q3: ${childAnswers.q3 || ''}

真言法会分享
--------------------------------
护道者：${parentReflection}
求道者：${childReflection}

今夜试炼任务
--------------------------------
选一道标记了⚡（裂隙）的题目，聊10分钟。
规则：孩子多说，家长多问，不吵架，只理解。

生成时间：${new Date().toLocaleString('zh-CN')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `破壁修行记录_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("修行记录已下载");
  };

  const handleRestart = () => {
    if (confirm("确定要重新开始吗？之前的记录将被清除。")) {
      localStorage.clear();
      setLocation('/');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-12">
      {/* 背景 */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(/images/hero-background.png)' }}
      />

      <div className="relative z-10 container max-w-5xl">
        {/* 标题 */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <Sparkles className="w-20 h-20 text-primary mx-auto" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-primary">持光者契约</h1>
          <p className="text-muted-foreground text-lg">
            恭喜完成第一课「破壁」修行
          </p>
        </div>

        {/* 成就展示 */}
        <div className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border-2 border-primary/30 rounded-xl p-8 mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">修行成果</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card/60 rounded-lg p-6">
              <div className="text-4xl font-bold text-primary mb-2">{resonanceCount}</div>
              <div className="text-sm text-muted-foreground">共鸣次数</div>
            </div>
            <div className="bg-card/60 rounded-lg p-6">
              <div className="text-4xl font-bold text-secondary mb-2">3</div>
              <div className="text-sm text-muted-foreground">完成问题</div>
            </div>
            <div className="bg-card/60 rounded-lg p-6">
              <div className="text-4xl font-bold text-primary mb-2">✓</div>
              <div className="text-sm text-muted-foreground">真言分享</div>
            </div>
          </div>
        </div>

        {/* 道具获得 */}
        <div className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">道具获得</h3>
          
          <div className="space-y-6">
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🗝️</div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold mb-2">持光者秘钥</h4>
                  <p className="text-muted-foreground mb-2">
                    <span className="font-semibold">古文：</span>借此钥，可于今夜开启心门，借光而谈。
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">💡 说人话：</span>这是一个任务提醒卡，今晚回家后，找个时间聊聊。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📜</div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold mb-2">今夜试炼卷</h4>
                  <p className="text-muted-foreground mb-2">
                    <span className="font-semibold">古文：</span>取卷上一条裂隙，行借光谈话十刻。
                  </p>
                  <p className="text-sm mb-4">
                    <span className="font-semibold">💡 说人话：</span>今晚作业：选一道你们标记了⚡（裂隙）的题目，聊10分钟。规则：孩子多说，家长多问，不吵架，只理解。
                  </p>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="font-semibold mb-2">具体步骤：</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>找一个安静的时间（晚饭后或睡前）</li>
                      <li>选择一个标记了"裂隙"的问题</li>
                      <li>孩子先说3-5分钟，家长只听不评判</li>
                      <li>家长用"借光诀"提问，确认理解</li>
                      <li>互相分享感受，不争对错</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 烛阴子寄语 */}
        <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <img 
              src="/images/zhuyin-character.png" 
              alt="烛阴子" 
              className="w-16 h-16 object-contain"
            />
            <div className="flex-1">
              <p className="text-lg leading-relaxed mb-2">
                <span className="font-semibold text-primary">烛阴子：</span>
                "墙壁护人安全，亦隔绝了星光。今日我们不拆墙，只拍一张灵识X光——看清纹理，发现那天然的缝隙。记住，缝隙不是破损，是光与风唯一的通道。"
              </p>
              <p className="text-sm text-muted-foreground">
                三日后，汝等将化身「心流侦探」，于识海中寻专注之火种...
              </p>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 glow-cyan"
            onClick={handleDownload}
          >
            <Download className="w-5 h-5 mr-2" />
            下载修行记录
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6"
            onClick={handleRestart}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            重新开始修行
          </Button>
        </div>

        {/* 说明 */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>记录已保存在浏览器本地</p>
          <p className="mt-2">建议下载备份，以便日后回顾</p>
        </div>
      </div>
    </div>
  );
}
