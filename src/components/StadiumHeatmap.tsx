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
          {/* Stadium visual representation */}
          <div className="relative w-[600px] h-[400px]">
            
            {/* Upper Tier - Outer Ring */}
            <div className="absolute inset-0">
              {/* North Upper Sections */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {['534', '533', '532', '531', '530', '529', '528', '527', '526', '525', '524'].map((id, index) => {
                  const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                  return (
                    <div
                      key={id}
                      className={`h-6 w-8 border flex items-center justify-center text-xs font-semibold rounded-t ${getLevelColor(section.level)}`}
                      style={{
                        transform: `rotate(${(index - 5) * 8}deg)`,
                        transformOrigin: 'center bottom'
                      }}
                    >
                      {id}
                    </div>
                  );
                })}
              </div>

              {/* East Upper Sections */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
                {['523', '522', '521', '520', '519'].map((id, index) => {
                  const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                  return (
                    <div
                      key={id}
                      className={`h-8 w-6 border flex items-center justify-center text-xs font-semibold ${getLevelColor(section.level)}`}
                      style={{
                        transform: `rotate(${90 + (index - 2) * 12}deg)`,
                        transformOrigin: 'left center'
                      }}
                    >
                      {id}
                    </div>
                  );
                })}
              </div>

              {/* South Upper Sections */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {['501', '502', '503', '504', '505', '506', '507', '508', '509', '510', '511', '512', '513', '514', '515'].map((id, index) => {
                  const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                  return (
                    <div
                      key={id}
                      className={`h-6 w-8 border flex items-center justify-center text-xs font-semibold rounded-b ${getLevelColor(section.level)}`}
                      style={{
                        transform: `rotate(${180 + (index - 7) * 6}deg)`,
                        transformOrigin: 'center top'
                      }}
                    >
                      {id}
                    </div>
                  );
                })}
              </div>

              {/* West Upper Sections */}
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
                {['544', '543', '542', '541', '540', '539', '538', '537', '536', '535'].map((id, index) => {
                  const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                  return (
                    <div
                      key={id}
                      className={`h-8 w-6 border flex items-center justify-center text-xs font-semibold ${getLevelColor(section.level)}`}
                      style={{
                        transform: `rotate(${270 + (index - 4) * 10}deg)`,
                        transformOrigin: 'right center'
                      }}
                    >
                      {id}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Middle Tier */}
            <div className="absolute inset-8">
              {/* North Middle */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {['134', '133', '132', '131', '130', '129', '128', '127', '126', '125', '124'].map((id, index) => {
                  const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                  return (
                    <div
                      key={id}
                      className={`h-5 w-7 border flex items-center justify-center text-xs font-semibold ${getLevelColor(section.level)}`}
                      style={{
                        transform: `rotate(${(index - 5) * 6}deg)`,
                        transformOrigin: 'center bottom'
                      }}
                    >
                      {id}
                    </div>
                  );
                })}
              </div>

              {/* East Middle */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
                {['123', '122', '121', '120', '119', '118'].map((id, index) => {
                  const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                  return (
                    <div
                      key={id}
                      className={`h-7 w-5 border flex items-center justify-center text-xs font-semibold ${getLevelColor(section.level)}`}
                      style={{
                        transform: `rotate(${90 + (index - 2.5) * 8}deg)`,
                        transformOrigin: 'left center'
                      }}
                    >
                      {id}
                    </div>
                  );
                })}
              </div>

              {/* South Middle */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {['101', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112'].map((id, index) => {
                  const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                  return (
                    <div
                      key={id}
                      className={`h-5 w-7 border flex items-center justify-center text-xs font-semibold ${getLevelColor(section.level)}`}
                      style={{
                        transform: `rotate(${180 + (index - 5) * 6}deg)`,
                        transformOrigin: 'center top'
                      }}
                    >
                      {id}
                    </div>
                  );
                })}
              </div>

              {/* West Middle */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
                {['144', '143', '142', '141', '140', '139', '138', '137', '136', '135'].map((id, index) => {
                  const section = stadiumSections.find(s => s.id === id) || { level: 'safe' };
                  return (
                    <div
                      key={id}
                      className={`h-7 w-5 border flex items-center justify-center text-xs font-semibold ${getLevelColor(section.level)}`}
                      style={{
                        transform: `rotate(${270 + (index - 4.5) * 8}deg)`,
                        transformOrigin: 'right center'
                      }}
                    >
                      {id}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Football Pitch - Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-32 bg-gradient-to-r from-success/30 via-success/20 to-success/30 rounded-lg border-2 border-success/50 shadow-inner">
              {/* Pitch markings */}
              <div className="absolute inset-1 border border-success/60 rounded">
                {/* Goal areas */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-12 border border-success/60"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-12 border border-success/60"></div>
                
                {/* Penalty areas */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-20 border border-success/60"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-20 border border-success/60"></div>
                
                {/* Center circle */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-success/60 rounded-full"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-success/60 rounded-full"></div>
                
                {/* Center line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-success/60"></div>
              </div>
              
              {/* Pitch label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-success opacity-80">FOOTBALL PITCH</span>
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