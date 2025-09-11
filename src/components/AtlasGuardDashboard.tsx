import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  AlertTriangle, 
  Shield, 
  Clock, 
  MapPin, 
  Volume2, 
  Eye,
  Settings,
  Bell,
  Activity,
  Users,
  Target,
  Zap
} from 'lucide-react';
import AlertNotifications from './AlertNotifications';
import MoroccanFlag from './MoroccanFlag';

// Mock data for demonstration
const mockCameras = [
  {
    id: 'cam_1',
    location: 'North Stand',
    status: 'active',
    detection_status: 'No Violence',
    video_timestamp: '0.0s',
    alert_level: 'normal',
    recording: true
  },
  {
    id: 'cam_2',
    location: 'South Gate',
    status: 'active',
    detection_status: 'No Violence',
    video_timestamp: '0.0s',
    alert_level: 'normal',
    recording: true
  },
  {
    id: 'cam_3',
    location: 'Pitch Side',
    status: 'active',
    detection_status: 'No Violence',
    video_timestamp: '0.0s',
    alert_level: 'normal',
    recording: true
  },
  {
    id: 'cam_4',
    location: 'VIP Section',
    status: 'active',
    detection_status: 'No Violence',
    video_timestamp: '0.0s',
    alert_level: 'normal',
    recording: true
  }
];

const mockAlerts = [
  {
    id: '1',
    timestamp: '2024-11-15T14:30:22Z',
    camera: 'VIP Section',
    type: 'crowd_disturbance',
    severity: 'high',
    description: 'High violence detection score - immediate attention required'
  },
  {
    id: '2',
    timestamp: '2024-11-15T14:28:15Z',
    camera: 'South Gate',
    type: 'elevated_activity',
    severity: 'medium',
    description: 'Elevated crowd activity detected'
  },
  {
    id: '3',
    timestamp: '2024-11-15T14:25:03Z',
    camera: 'North Stand',
    type: 'audio_distress',
    severity: 'low',
    description: 'Audio distress patterns identified'
  }
];

const stadiums = [
  'Mohammed V Stadium - Casablanca',
  'Grand Stade de Tanger',
  'Prince Moulay Abdellah Stadium - Rabat',
  'Adrar Stadium - Agadir'
];

const AtlasGuardDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedStadium, setSelectedStadium] = useState(stadiums[0]);
  const [cameras, setCameras] = useState(mockCameras);
  const [alerts, setAlerts] = useState(mockAlerts);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8000/ws');
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { timestamp, label } = data;
        
        // Update all cameras with the new status (in a real scenario, you'd identify specific cameras)
        setCameras(prevCameras => 
          prevCameras.map(camera => ({
            ...camera,
            detection_status: label,
            video_timestamp: timestamp,
            alert_level: label === 'Violence' ? 'alert' : 'normal'
          }))
        );
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onopen = () => {
      console.log('Connected to AtlasGuard WebSocket');
    };

    ws.onclose = () => {
      console.log('Disconnected from AtlasGuard WebSocket');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const getAlertBadgeVariant = (level: string) => {
    switch (level) {
      case 'alert': return 'destructive';
      case 'warning': return 'secondary';
      default: return 'outline';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      default: return 'text-success';
    }
  };

  const formatScore = (score: number) => Math.round(score * 100);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AlertNotifications />
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <MoroccanFlag size="lg" />
                <Shield className="h-8 w-8 text-morocco-red" />
                <div>
                  <h1 className="text-2xl font-bold gradient-morocco bg-clip-text text-transparent">
                    AtlasGuard 2030
                  </h1>
                  <p className="text-sm text-muted-foreground">Stadium Safety Control Center</p>
                </div>
              </div>
              <div className="h-8 w-px bg-border" />
              <Select value={selectedStadium} onValueChange={setSelectedStadium}>
                <SelectTrigger className="w-80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stadiums.map((stadium) => (
                    <SelectItem key={stadium} value={stadium}>
                      {stadium}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-lg">
                    {currentTime.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Camera Grid - 8 columns */}
          <div className="col-span-8">
            <div className="grid grid-cols-2 gap-4">
              {cameras.map((camera) => (
                <Card key={camera.id} className={`camera-border ${camera.alert_level}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Camera className="h-4 w-4" />
                        <CardTitle className="text-sm font-medium">{camera.location}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getAlertBadgeVariant(camera.alert_level)}>
                          {camera.alert_level}
                        </Badge>
                        {camera.recording && (
                          <div className="flex items-center space-x-1">
                            <div className="h-2 w-2 bg-destructive rounded-full animate-pulse-security" />
                            <span className="text-xs text-muted-foreground">REC</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Video feed */}
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center relative">
                      <video 
                        className="w-full h-full object-cover rounded-lg"
                        src="http://127.0.0.1:8000/video"
                        autoPlay
                        loop
                        muted
                        onError={(e) => {
                          // Fallback to placeholder if video fails to load
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="text-center absolute inset-0 items-center justify-center hidden">
                        <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Camera Feed {camera.id}</p>
                      </div>
                    </div>
                    
                    {/* Detection Status */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-morocco-red" />
                          <span className="font-semibold">Detection Status</span>
                        </div>
                        <Badge 
                          variant={camera.detection_status === 'Violence' ? 'destructive' : 'outline'}
                          className={camera.detection_status === 'Violence' ? 'animate-pulse-security' : ''}
                        >
                          {camera.detection_status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3" />
                          <span>Video Timestamp</span>
                        </div>
                        <span className="font-mono">{camera.video_timestamp}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar - 4 columns */}
          <div className="col-span-4 space-y-6">
            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span>Active Alerts</span>
                  <Badge variant="destructive">{alerts.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => (
                  <Alert key={alert.id} className="p-3">
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-3 w-3" />
                            <span className="font-medium">{alert.camera}</span>
                          </div>
                          <span className={`text-xs font-semibold ${getSeverityColor(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm">{alert.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </span>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline" className="h-6 text-xs">
                              Dispatch
                            </Button>
                            <Button size="sm" variant="outline" className="h-6 text-xs">
                              False Alarm
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>

          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-8">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>Powered by AtlasGuard 2030 AI Technology</span>
              <span>•</span>
              <span>Version 2.1.0</span>
              <span>•</span>
              <span>Last Update: {currentTime.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-success rounded-full animate-pulse-security" />
              <span>AI Servers Connected</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AtlasGuardDashboard;