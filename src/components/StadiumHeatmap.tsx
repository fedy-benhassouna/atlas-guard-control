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
        <div className="relative flex justify-center">
          <div className="relative w-[500px] h-[350px]">
            
            {/* Upper Tier - Outer oval */}
            <div className="absolute inset-0">
              {/* Top curve - Upper sections */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex justify-center">
                <div className="flex space-x-1" style={{ transform: 'perspective(200px) rotateX(15deg)' }}>
                  {['534', '533', '532', '531', '530', '529', '528', '527', '526', '525', '524'].map((id) => {
                    const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                    return (
                      <div
                        key={id}
                        className={`h-8 w-8 border flex items-center justify-center text-xs font-semibold rounded-t ${getLevelColor(section.level)}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right curve - Upper sections */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
                <div className="flex flex-col space-y-1" style={{ transform: 'perspective(200px) rotateY(-15deg)' }}>
                  {['523', '522', '521', '520', '519'].map((id) => {
                    const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                    return (
                      <div
                        key={id}
                        className={`h-8 w-8 border flex items-center justify-center text-xs font-semibold rounded-r ${getLevelColor(section.level)}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom curve - Upper sections */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center">
                <div className="flex space-x-1" style={{ transform: 'perspective(200px) rotateX(-15deg)' }}>
                  {['515', '514', '513', '512', '511', '510', '509', '508', '507', '506', '505', '504', '503', '502', '501'].map((id) => {
                    const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                    return (
                      <div
                        key={id}
                        className={`h-8 w-8 border flex items-center justify-center text-xs font-semibold rounded-b ${getLevelColor(section.level)}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Left curve - Upper sections */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
                <div className="flex flex-col space-y-1" style={{ transform: 'perspective(200px) rotateY(15deg)' }}>
                  {['535', '536', '537', '538', '539', '540', '541', '542', '543', '544'].map((id) => {
                    const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                    return (
                      <div
                        key={id}
                        className={`h-8 w-8 border flex items-center justify-center text-xs font-semibold rounded-l ${getLevelColor(section.level)}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Middle Tier */}
            <div className="absolute inset-12">
              {/* Top - Middle sections */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex justify-center">
                <div className="flex space-x-1">
                  {['134', '133', '132', '131', '130', '129', '128', '127', '126', '125', '124'].map((id) => {
                    const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                    return (
                      <div
                        key={id}
                        className={`h-6 w-6 border flex items-center justify-center text-xs font-semibold ${getLevelColor(section.level)}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right - Middle sections */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
                <div className="flex flex-col space-y-1">
                  {['123', '122', '121', '120', '119', '118'].map((id) => {
                    const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                    return (
                      <div
                        key={id}
                        className={`h-6 w-6 border flex items-center justify-center text-xs font-semibold ${getLevelColor(section.level)}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom - Middle sections */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center">
                <div className="flex space-x-1">
                  {['112', '111', '110', '109', '108', '107', '106', '105', '104', '103', '101'].map((id) => {
                    const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                    return (
                      <div
                        key={id}
                        className={`h-6 w-6 border flex items-center justify-center text-xs font-semibold ${getLevelColor(section.level)}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Left - Middle sections */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
                <div className="flex flex-col space-y-1">
                  {['135', '136', '137', '138', '139', '140', '141', '142', '143', '144'].map((id) => {
                    const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                    return (
                      <div
                        key={id}
                        className={`h-6 w-6 border flex items-center justify-center text-xs font-semibold ${getLevelColor(section.level)}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Football Pitch - Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-24 bg-gradient-to-r from-success/30 via-success/20 to-success/30 rounded-lg border-2 border-success/50 shadow-inner">
              {/* Pitch markings */}
              <div className="absolute inset-1 border border-success/60 rounded">
                {/* Goal areas */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-6 border border-success/60"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-6 border border-success/60"></div>
                
                {/* Penalty areas */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-10 border border-success/60"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-10 border border-success/60"></div>
                
                {/* Center circle */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-success/60 rounded-full"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-success/60 rounded-full"></div>
                
                {/* Center line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-success/60"></div>
              </div>
              
              {/* Pitch label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-success opacity-80">PITCH</span>
              </div>
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