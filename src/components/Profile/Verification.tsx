'use client';

import React, { useState } from 'react';
import { ExtendedProfile, VerificationFlow, VerificationStep } from '@/types/profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, AlertCircle } from 'lucide-react';

interface VerificationProps {
  profile: ExtendedProfile;
  onVerificationUpdate?: (flow: VerificationFlow) => void;
}

export const Verification: React.FC<VerificationProps> = ({ 
  profile, 
  onVerificationUpdate 
}) => {
  const [verificationFlow, setVerificationFlow] = useState<VerificationFlow>({
    steps: [
      {
        id: 'email',
        title: 'Email Verification',
        description: 'Verify your email address',
        completed: profile.verification.emailVerified,
        required: true
      },
      {
        id: 'profile',
        title: 'Profile Completion',
        description: 'Complete your basic profile information',
        completed: !!(profile.name && profile.email),
        required: true
      },
      {
        id: 'role',
        title: 'Role Verification',
        description: 'Verify your role and permissions',
        completed: profile.verification.roleVerified,
        required: true
      }
    ],
    currentStep: 0,
    completed: false
  });

  const handleStepComplete = (stepId: string) => {
    const updatedSteps = verificationFlow.steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    );
    
    const newFlow = {
      ...verificationFlow,
      steps: updatedSteps,
      completed: updatedSteps.every(step => step.completed)
    };
    
    setVerificationFlow(newFlow);
    onVerificationUpdate?.(newFlow);
  };

  const getStepIcon = (step: VerificationStep) => {
    if (step.completed) {
      return <Check className="w-5 h-5 text-green-600" />;
    }
    if (step.required) {
      return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
    return <X className="w-5 h-5 text-gray-400" />;
  };

  const getStepStatus = (step: VerificationStep) => {
    if (step.completed) {
      return 'bg-green-50 border-green-200';
    }
    if (step.required) {
      return 'bg-yellow-50 border-yellow-200';
    }
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔍 Verification Status
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge 
            variant={profile.verification.trustLevel === 'verified' ? 'default' : 'secondary'}
          >
            {profile.verification.trustLevel}
          </Badge>
          <span className="text-sm text-gray-600">
            Score: {profile.verification.verificationScore}/100
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {verificationFlow.steps.map((step, index) => (
            <div
              key={step.id}
              className={`p-4 rounded-lg border ${getStepStatus(step)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStepIcon(step)}
                  <div>
                    <h4 className="font-medium text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {step.completed ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  ) : step.required ? (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Required
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      Optional
                    </Badge>
                  )}
                </div>
              </div>
              
              {!step.completed && step.required && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <Button 
                    size="sm" 
                    onClick={() => handleStepComplete(step.id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Complete {step.title}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {verificationFlow.completed && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">
                All verification steps completed!
              </span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Your profile is fully verified and you have access to all features.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 