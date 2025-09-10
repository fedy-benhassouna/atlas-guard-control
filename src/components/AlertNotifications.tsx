import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  X, 
  Clock, 
  MapPin,
  Volume2,
  Eye
} from 'lucide-react';

interface AlertNotification {
  id: string;
  timestamp: string;
  camera: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  vision_score?: number;
  audio_score?: number;
  fused_score: number;
}

const AlertNotifications = () => {
  const [notifications, setNotifications] = useState<AlertNotification[]>([]);

  useEffect(() => {
    // Simulate real-time alerts
    const simulateAlerts = () => {
      const newAlert: AlertNotification = {
        id: `alert_${Date.now()}`,
        timestamp: new Date().toISOString(),
        camera: ['North Stand', 'South Gate', 'Pitch Side', 'VIP Section'][Math.floor(Math.random() * 4)],
        type: ['crowd_disturbance', 'elevated_activity', 'audio_distress', 'suspicious_behavior'][Math.floor(Math.random() * 4)],
        severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
        description: 'Automated alert triggered by AI detection system',
        vision_score: Math.random() * 0.4 + 0.6,
        audio_score: Math.random() * 0.4 + 0.6,
        fused_score: Math.random() * 0.4 + 0.6
      };

      setNotifications(prev => [newAlert, ...prev.slice(0, 4)]); // Keep only 5 most recent
    };

    // Add initial alerts and then simulate new ones
    simulateAlerts();
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 5 seconds
        simulateAlerts();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const dismissAlert = (id: string) => {
    setNotifications(prev => prev.filter(alert => alert.id !== id));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-destructive bg-destructive/10';
      case 'medium': return 'border-warning bg-warning/10';
      default: return 'border-success bg-success/10';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-destructive animate-pulse-alert';
      case 'medium': return 'text-warning';
      default: return 'text-success';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-96">
      {notifications.map((alert) => (
        <Alert 
          key={alert.id} 
          className={`${getSeverityColor(alert.severity)} border-2 shadow-lg backdrop-blur-sm animate-fade-in`}
        >
          <AlertTriangle className={`h-5 w-5 ${getSeverityIcon(alert.severity)}`} />
          <AlertDescription>
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'secondary' : 'outline'}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium text-sm">{alert.camera}</span>
                </div>
                
                <p className="text-sm">{alert.description}</p>
                
                {/* AI Scores */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {alert.vision_score && (
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>Vision: {Math.round(alert.vision_score * 100)}%</span>
                    </div>
                  )}
                  {alert.audio_score && (
                    <div className="flex items-center space-x-1">
                      <Volume2 className="h-3 w-3" />
                      <span>Audio: {Math.round(alert.audio_score * 100)}%</span>
                    </div>
                  )}
                </div>
                
                <div className="text-xs font-semibold text-morocco-red">
                  Fused Score: {Math.round(alert.fused_score * 100)}%
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="security" className="h-6 text-xs">
                    Dispatch Security
                  </Button>
                  <Button size="sm" variant="outline" className="h-6 text-xs">
                    False Alarm
                  </Button>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-2"
                onClick={() => dismissAlert(alert.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default AlertNotifications;