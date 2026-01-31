import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Sparkles, Users, Heart } from "lucide-react";

export default function GameIntro() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景图 */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: 'url(/images/hero-background.png)' }}
      />
      
      {/* 粒子效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full particle-bg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* 烛阴子角色 */}
        <div className="mb-8 relative">
          <img 
            src="/images/zhuyin-character.png" 
            alt="烛阴子" 
            className="w-64 h-64 object-contain drop-shadow-2xl"
          />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-2 bg-primary/20 rounded-full blur-xl" />
        </div>

        {/* 欢迎文字 */}
        <div className="text-center mb-12 max-w-3xl">
          <h1 className="text-5xl font-bold mb-6 text-primary glow-cyan">
            欢迎踏入识海关
          </h1>
          <div className="bg-card/80 backdrop-blur-sm border border-primary/30 rounded-lg p-8 mb-6">
            <p className="text-lg leading-relaxed mb-4">
              我是守境人<span className="text-primary font-semibold">烛阴子</span>，掌管此地的"光之法则"。
            </p>
            <p className="text-lg leading-relaxed mb-4">
              你们看周围这迷雾——它不是障碍，而是你们各自心域的边界。
            </p>
            <p className="text-lg leading-relaxed">
              传说中，<span className="text-secondary">护道者</span>（家长）手持"外境图"，<span className="text-secondary">求道者</span>（孩子）内藏"心域图"。只有当两图交叠，那些看似错位的"裂隙"，才会成为光之通道...
            </p>
          </div>
        </div>

        {/* 游戏机制介绍 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl w-full">
          <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-lg p-6 text-center hover:border-primary/50 transition-all">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">双生地图</h3>
            <p className="text-muted-foreground">
              家长和孩子分别填写问卷，背对背绘制各自的心域图
            </p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-lg p-6 text-center hover:border-primary/50 transition-all">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">点灵术</h3>
            <p className="text-muted-foreground">
              标记微光（认同）和裂隙（好奇），发现彼此的认知差异
            </p>
          </div>
          <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-lg p-6 text-center hover:border-primary/50 transition-all">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">真言法会</h3>
            <p className="text-muted-foreground">
              分享感受，学习理解彼此的视角，建立更深的连接
            </p>
          </div>
        </div>

        {/* 开始按钮 */}
        <div className="flex flex-col items-center gap-4">
          <Button 
            size="lg" 
            className="text-xl px-12 py-6 glow-cyan bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setLocation('/parent')}
          >
            开始修行之旅
          </Button>
          <p className="text-sm text-muted-foreground">
            预计用时：40分钟 | 适合：家长与孩子共同参与
          </p>
        </div>
      </div>
    </div>
  );
}
