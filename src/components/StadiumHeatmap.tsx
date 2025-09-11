import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

// Mock data for stadium sections with violence detection levels
const stadiumSections = [
  // Upper tier - Category 1 (Red sections)
  { id: '532', level: 'safe', category: 'Upper North' },
  { id: '531', level: 'warning', category: 'Upper North' },
  { id: '530', level: 'safe', category: 'Upper North' },
  { id: '529', level: 'safe', category: 'Upper North' },
  { id: '528', level: 'safe', category: 'Upper North' },
  { id: '527', level: 'safe', category: 'Upper North' },
  { id: '526', level: 'safe', category: 'Upper North' },
  { id: '525', level: 'safe', category: 'Upper North' },
  { id: '524', level: 'safe', category: 'Upper North' },
  
  // Side sections - Category 2 (Orange sections)
  { id: '135', level: 'safe', category: 'West Stand' },
  { id: '136', level: 'safe', category: 'West Stand' },
  { id: '137', level: 'warning', category: 'West Stand' },
  { id: '138', level: 'safe', category: 'West Stand' },
  { id: '139', level: 'safe', category: 'West Stand' },
  { id: '121', level: 'safe', category: 'East Stand' },
  { id: '122', level: 'safe', category: 'East Stand' },
  { id: '123', level: 'safe', category: 'East Stand' },
  { id: '124', level: 'safe', category: 'East Stand' },
  { id: '125', level: 'safe', category: 'East Stand' },
  
  // VIP sections - Category 3 (Blue sections)
  { id: '140', level: 'danger', category: 'VIP West' },
  { id: '141', level: 'safe', category: 'VIP West' },
  { id: '118', level: 'safe', category: 'VIP East' },
  { id: '119', level: 'safe', category: 'VIP East' },
  
  // Lower sections - Category 4 (Green sections)
  { id: '540', level: 'safe', category: 'Lower West' },
  { id: '518', level: 'safe', category: 'Lower East' },
  
  // South sections
  { id: '101', level: 'safe', category: 'South Stand' },
  { id: '103', level: 'warning', category: 'South Stand' },
  { id: '104', level: 'safe', category: 'South Stand' },
  { id: '105', level: 'safe', category: 'South Stand' },
  { id: '106', level: 'safe', category: 'South Stand' },
  { id: '107', level: 'safe', category: 'South Stand' },
  { id: '108', level: 'safe', category: 'South Stand' },
  { id: '109', level: 'safe', category: 'South Stand' },
  { id: '110', level: 'safe', category: 'South Stand' },
  { id: '111', level: 'warning', category: 'South Stand' },
  { id: '112', level: 'safe', category: 'South Stand' },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'danger': return 'bg-destructive/80 border-destructive';
    case 'warning': return 'bg-warning/80 border-warning';
    default: return 'bg-success/80 border-success';
  }
};

const getLevelIcon = (level: string) => {
  switch (level) {
    case 'danger': return <AlertTriangle className="h-3 w-3 text-destructive-foreground" />;
    case 'warning': return <TrendingUp className="h-3 w-3 text-warning-foreground" />;
    default: return <CheckCircle className="h-3 w-3 text-success-foreground" />;
  }
};

const StadiumHeatmap = () => {
  const dangerCount = stadiumSections.filter(s => s.level === 'danger').length;
  const warningCount = stadiumSections.filter(s => s.level === 'warning').length;
  const safeCount = stadiumSections.filter(s => s.level === 'safe').length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-morocco-red" />
            <span>Stadium Violence Heatmap</span>
          </CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-full bg-success" />
              <span className="text-xs">Safe ({safeCount})</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-full bg-warning" />
              <span className="text-xs">Warning ({warningCount})</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <span className="text-xs">Danger ({dangerCount})</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Stadium Layout */}
        <div className="relative">
          {/* Stadium visual representation */}
          <div className="mx-auto max-w-4xl">
            {/* Top sections */}
            <div className="mb-2 flex justify-center space-x-1">
              {stadiumSections.filter(s => s.id.startsWith('5')).slice(0, 9).map((section) => (
                <div
                  key={section.id}
                  className={`h-8 w-12 rounded-t-lg border-2 flex items-center justify-center ${getLevelColor(section.level)}`}
                >
                  <span className="text-xs font-semibold text-foreground">{section.id}</span>
                </div>
              ))}
            </div>
            
            {/* Middle sections with pitch */}
            <div className="flex items-center justify-between">
              {/* Left side */}
              <div className="space-y-1">
                {stadiumSections.filter(s => s.id.startsWith('1') && parseInt(s.id) >= 135).slice(0, 5).map((section) => (
                  <div
                    key={section.id}
                    className={`h-6 w-10 border-2 flex items-center justify-center ${getLevelColor(section.level)}`}
                  >
                    <span className="text-xs font-semibold text-foreground">{section.id}</span>
                  </div>
                ))}
                {stadiumSections.filter(s => s.id === '140' || s.id === '141').map((section) => (
                  <div
                    key={section.id}
                    className={`h-6 w-10 border-2 flex items-center justify-center ${getLevelColor(section.level)}`}
                  >
                    <span className="text-xs font-semibold text-foreground">{section.id}</span>
                  </div>
                ))}
                <div className={`h-6 w-10 border-2 flex items-center justify-center ${getLevelColor('safe')}`}>
                  <span className="text-xs font-semibold text-foreground">540</span>
                </div>
              </div>
              
              {/* Pitch */}
              <div className="mx-4 h-32 w-48 bg-success/20 border-2 border-success rounded-lg flex items-center justify-center relative">
                <div className="absolute inset-2 border border-success/40 rounded">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-8 border border-success/40 rounded-r"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-8 border border-success/40 rounded-l"></div>
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-success/40 rounded-full"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-success/40"></div>
                </div>
                <span className="text-xs text-success font-semibold">PITCH</span>
              </div>
              
              {/* Right side */}
              <div className="space-y-1">
                {stadiumSections.filter(s => s.id.startsWith('12')).slice(0, 5).map((section) => (
                  <div
                    key={section.id}
                    className={`h-6 w-10 border-2 flex items-center justify-center ${getLevelColor(section.level)}`}
                  >
                    <span className="text-xs font-semibold text-foreground">{section.id}</span>
                  </div>
                ))}
                {stadiumSections.filter(s => s.id === '118' || s.id === '119').map((section) => (
                  <div
                    key={section.id}
                    className={`h-6 w-10 border-2 flex items-center justify-center ${getLevelColor(section.level)}`}
                  >
                    <span className="text-xs font-semibold text-foreground">{section.id}</span>
                  </div>
                ))}
                <div className={`h-6 w-10 border-2 flex items-center justify-center ${getLevelColor('safe')}`}>
                  <span className="text-xs font-semibold text-foreground">518</span>
                </div>
              </div>
            </div>
            
            {/* Bottom sections */}
            <div className="mt-2 flex justify-center space-x-1">
              {stadiumSections.filter(s => s.id.startsWith('1') && parseInt(s.id) <= 112).slice(0, 12).map((section) => (
                <div
                  key={section.id}
                  className={`h-8 w-12 rounded-b-lg border-2 flex items-center justify-center ${getLevelColor(section.level)}`}
                >
                  <span className="text-xs font-semibold text-foreground">{section.id}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active incidents list */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {stadiumSections
              .filter(s => s.level !== 'safe')
              .map((section) => (
                <div key={section.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    {getLevelIcon(section.level)}
                    <div>
                      <p className="text-sm font-medium">Section {section.id}</p>
                      <p className="text-xs text-muted-foreground">{section.category}</p>
                    </div>
                  </div>
                  <Badge variant={section.level === 'danger' ? 'destructive' : 'secondary'}>
                    {section.level}
                  </Badge>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StadiumHeatmap;