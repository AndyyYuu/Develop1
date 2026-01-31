import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

export default function Sharing() {
  const [, setLocation] = useLocation();
  const [parentReflection, setParentReflection] = useState("");
  const [childReflection, setChildReflection] = useState("");
  const [resonanceCount, setResonanceCount] = useState(0);

  useEffect(() => {
    const count = localStorage.getItem('resonanceCount');
    if (count) {
      setResonanceCount(parseInt(count));
    }
  }, []);

  const handleComplete = () => {
    if (!parentReflection.trim() || !childReflection.trim()) {
      toast.error("请双方都完成分享");
      return;
    }

    localStorage.setItem('parentReflection', parentReflection);
    localStorage.setItem('childReflection', childReflection);
    
    toast.success("真言法会圆满完成");
    setLocation('/summary');
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
            <img 
              src="/images/zhuyin-character.png" 
              alt="烛阴子" 
              className="w-32 h-32 object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-primary">真言法会</h1>
          <p className="text-muted-foreground text-lg mb-4">
            标记已成，现在请分享你们的感受
          </p>
          {resonanceCount > 0 && (
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-primary font-semibold">
                ✨ 你们有 {resonanceCount} 处共鸣！两心相通，默契满满！
              </p>
            </div>
          )}
        </div>

        {/* 烛阴子引导 */}
        <div className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-xl p-8 mb-8">
          <div className="space-y-6">
            <div className="bg-primary/10 border-l-4 border-primary rounded-r-lg p-4">
              <p className="text-lg leading-relaxed">
                <span className="font-semibold text-primary">烛阴子：</span>
                "最美之境，非无阴影，乃阴影降临时，总有光芒温柔照入。裂隙本身不是问题，两域永隔，才是劫数。"
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                💡 说人话：有分歧很正常，重要的是愿意理解对方。今天不是要争对错，而是看到彼此眼中的世界。
              </p>
            </div>

            <div className="bg-secondary/10 border-l-4 border-secondary rounded-r-lg p-4">
              <p className="text-lg leading-relaxed">
                <span className="font-semibold text-secondary">烛阴子：</span>
                "此乃'认知图式之异'。护道者以爱之目绘，求道者以真之心感。今日非判高下，乃并置双图，见视角之差——此即理解之始。"
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                💡 说人话：家长用爱去"看"，孩子用心去"感"。今天把两张地图拼在一起——原来你看事情的角度和我不一样啊！知道这一点，就是理解的开始。
              </p>
            </div>
          </div>
        </div>

        {/* 分享区域 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 护道者分享 */}
          <div className="bg-card/80 backdrop-blur-sm border-2 border-primary/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold text-primary">护道者分享</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              家长：看到孩子的回答，你最大的感受是什么？有什么想对孩子说的？
            </p>
            <Textarea
              placeholder="比如：看到你写的压力，我才知道原来你一直在承受这些...我想说..."
              value={parentReflection}
              onChange={(e) => setParentReflection(e.target.value)}
              className="min-h-[200px] bg-background/50 border-primary/20 focus:border-primary/50"
            />
          </div>

          {/* 求道者分享 */}
          <div className="bg-card/80 backdrop-blur-sm border-2 border-secondary/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-6 h-6 text-secondary" />
              <h3 className="text-xl font-semibold text-secondary">求道者分享</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              孩子：看到爸妈的观察，你有什么感受？有什么想对他们说的？
            </p>
            <Textarea
              placeholder="比如：原来你们注意到了这些...我想让你们知道..."
              value={childReflection}
              onChange={(e) => setChildReflection(e.target.value)}
              className="min-h-[200px] bg-background/50 border-secondary/20 focus:border-secondary/50"
            />
          </div>
        </div>

        {/* 心法提示 */}
        <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">💡 借光诀心法（今晚回家可以这样聊）</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-primary mb-2">护道者心法（家长）</h4>
              <ul className="space-y-2 text-sm">
                <li>✅ 问："能多说点吗？"</li>
                <li>✅ 确认："你的意思是...对吗？"</li>
                <li>❌ 禁止说："你怎么能这么想？"</li>
                <li>❌ 禁止说："不对，你应该..."</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-secondary mb-2">求道者心法（孩子）</h4>
              <ul className="space-y-2 text-sm">
                <li>✅ 解释："我当时其实是..."</li>
                <li>✅ 说明："我想表达的是..."</li>
                <li>❌ 禁止说："你不懂我！"</li>
                <li>❌ 禁止说："算了不说了..."</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 完成按钮 */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="text-lg px-12 py-6 glow-cyan"
            onClick={handleComplete}
          >
            完成真言法会
          </Button>
        </div>
      </div>
    </div>
  );
}
