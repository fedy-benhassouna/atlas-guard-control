import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Camera } from 'lucide-react';

interface CameraPosition {
  id: string;
  location: string;
  x: number;
  y: number;
  status: 'normal' | 'warning' | 'alert';
}

const cameraPositions: CameraPosition[] = [
  { id: 'cam_1', location: 'North Stand', x: 50, y: 20, status: 'normal' },
  { id: 'cam_2', location: 'South Gate', x: 50, y: 80, status: 'warning' },
  { id: 'cam_3', location: 'Pitch Side', x: 25, y: 50, status: 'normal' },
  { id: 'cam_4', location: 'VIP Section', x: 75, y: 50, status: 'alert' }
];

const StadiumMap = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'alert': return 'bg-destructive';
      case 'warning': return 'bg-warning';
      default: return 'bg-success';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-morocco-green" />
          <span>Stadium Camera Layout</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
          {/* Stadium outline */}
          <div className="absolute inset-4 border-2 border-border rounded-full bg-card/50">
            {/* Pitch */}
            <div className="absolute inset-8 bg-morocco-green/20 rounded-lg border border-morocco-green/40">
              <div className="absolute inset-4 border border-morocco-green/40 rounded-lg">
                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-morocco-green/40 rounded-full" />
              </div>
            </div>
          </div>

          {/* Camera positions */}
          {cameraPositions.map((camera) => (
            <div
              key={camera.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${camera.x}%`, top: `${camera.y}%` }}
            >
              <div className={`relative w-4 h-4 ${getStatusColor(camera.status)} rounded-full animate-pulse-security`}>
                <Camera className="h-3 w-3 text-white absolute top-0.5 left-0.5" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
                  <p className="text-xs font-medium">{camera.location}</p>
                  <Badge variant="outline" className="text-xs">
                    {camera.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span>Normal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-warning rounded-full" />
            <span>Warning</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-destructive rounded-full" />
            <span>Alert</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StadiumMap;