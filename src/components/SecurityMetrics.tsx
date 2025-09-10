import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  Clock, 
  Shield,
  BarChart3,
  Target
} from 'lucide-react';

const SecurityMetrics = () => {
  const metrics = [
    {
      title: "Incidents Today",
      value: "3",
      change: "+1",
      trend: "up",
      color: "text-destructive",
      icon: Activity
    },
    {
      title: "Average Safety Score",
      value: "92%",
      change: "+2.1%",
      trend: "up",
      color: "text-success",
      icon: Shield
    },
    {
      title: "Response Time",
      value: "2.3s",
      change: "-0.4s",
      trend: "down",
      color: "text-morocco-gold",
      icon: Clock
    },
    {
      title: "Fans Monitored",
      value: "45,872",
      change: "+1,234",
      trend: "up",
      color: "text-primary",
      icon: Users
    }
  ];

  const hourlyData = [
    { hour: '12:00', incidents: 1, score: 94 },
    { hour: '13:00', incidents: 0, score: 96 },
    { hour: '14:00', incidents: 2, score: 89 },
    { hour: '15:00', incidents: 1, score: 92 },
    { hour: '16:00', incidents: 0, score: 97 }
  ];

  return (
    <div className="space-y-6">
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{metric.title}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendIcon className={`h-3 w-3 ${metric.trend === 'up' ? 'text-success' : 'text-destructive'}`} />
                  <span className={`text-xs ${metric.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className={`text-2xl font-bold mt-2 ${metric.color}`}>
                {metric.value}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Hourly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-morocco-green" />
            <span>Hourly Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hourlyData.map((data, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-mono">{data.hour}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Safety Score</span>
                    <span className="text-sm font-medium">{data.score}%</span>
                  </div>
                  <Progress value={data.score} className="h-2" />
                </div>
                <div className="w-16 text-right">
                  <Badge variant={data.incidents > 1 ? "destructive" : data.incidents === 1 ? "secondary" : "outline"}>
                    {data.incidents} alerts
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-morocco-red" />
            <span>AI Model Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Vision Detection</span>
                <span className="text-sm font-medium">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Audio Analysis</span>
                <span className="text-sm font-medium">89.7%</span>
              </div>
              <Progress value={89.7} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Fusion Algorithm</span>
                <span className="text-sm font-medium">96.8%</span>
              </div>
              <Progress value={96.8} className="h-2" />
            </div>
          </div>
          
          <div className="pt-2 border-t border-border">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-success">98.5%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="text-lg font-bold text-morocco-gold">156ms</div>
                <div className="text-xs text-muted-foreground">Latency</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityMetrics;