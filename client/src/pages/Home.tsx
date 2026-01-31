import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowRight, Users, Sparkles, Heart, BookOpen } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景图 */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero-background.png)' }}
      />
      
      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />

      {/* 粒子效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full particle-bg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Logo区域 */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6 relative">
            <img 
              src="/images/bagua-pattern.png" 
              alt="八卦图案" 
              className="w-32 h-32 mx-auto opacity-90 animate-spin-slow"
              style={{ animationDuration: '20s' }}
            />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            焕墟幻境
          </h1>
          <div className="text-3xl md:text-4xl font-semibold mb-6 text-primary">
            第一课「破壁」
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            在虚空中捡到一枚「裂隙玉珏」，被传送到山海经世界边缘的「识海关」。
            此处是现实与内心的交界处，弥漫着「认知迷雾」...
          </p>
        </div>

        {/* 特色介绍 */}
        <div className="grid md:grid-cols-4 gap-6 mb-12 max-w-6xl w-full">
          <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center hover:border-primary/50 hover:scale-105 transition-all">
            <Users className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">亲子互动</h3>
            <p className="text-sm text-muted-foreground">家长与孩子共同参与</p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center hover:border-primary/50 hover:scale-105 transition-all">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">认知探索</h3>
            <p className="text-sm text-muted-foreground">发现彼此的视角差异</p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center hover:border-primary/50 hover:scale-105 transition-all">
            <Heart className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">情感连接</h3>
            <p className="text-sm text-muted-foreground">建立更深的理解</p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center hover:border-primary/50 hover:scale-105 transition-all">
            <BookOpen className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">山海经风</h3>
            <p className="text-sm text-muted-foreground">新国潮修仙世界观</p>
          </div>
        </div>

        {/* CTA按钮 */}
        <div className="flex flex-col items-center gap-6">
          <Button 
            size="lg" 
            className="text-2xl px-16 py-8 glow-cyan bg-primary hover:bg-primary/90 text-primary-foreground group"
            onClick={() => setLocation('/intro')}
          >
            踏入识海关
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              预计用时：40分钟 | 适合年龄：8岁以上
            </p>
            <p className="text-xs text-muted-foreground">
              建议在安静的环境中进行，准备好纸笔记录感受
            </p>
          </div>
        </div>

        {/* 底部装饰 */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-12 h-px bg-primary/30" />
            <span>守境人烛阴子恭候</span>
            <div className="w-12 h-px bg-primary/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
