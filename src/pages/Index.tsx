
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shield, Send } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [logInput, setLogInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const exampleLog = `{
  "timestamp": "2024-01-15T10:30:45.123456+0000",
  "src_ip": "192.168.1.100",
  "dest_ip": "10.0.0.1",
  "alert": {
    "signature": "GPL ATTACK_RESPONSE id check returned root",
    "severity": 2
  }
}`;

  const handleAnalyze = async () => {
    if (!logInput.trim()) {
      setError('로그 데이터를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      // 실제 API 대신 예시 응답
      setTimeout(() => {
        setResult('분석 완료: 이 로그는 보안 위험이 감지되었습니다. 관리자에게 문의하세요.');
        setLoading(false);
        toast({
          title: "분석 완료",
          description: "로그 분석이 완료되었습니다.",
        });
      }, 2000);
    } catch (err) {
      setError('분석 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  const loadExample = () => {
    setLogInput(exampleLog);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">T.ACE</h1>
          </div>
          <p className="text-gray-300 text-lg">유한영, 성민욱, 홍영재</p>
        </div>

        <div className="space-y-6">
          {/* Input Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">로그 입력</CardTitle>
              <CardDescription className="text-gray-300">
                보안 로그를 입력하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="log-input" className="text-white">로그 데이터</Label>
                <Textarea
                  id="log-input"
                  value={logInput}
                  onChange={(e) => setLogInput(e.target.value)}
                  placeholder="로그를 여기에 입력하세요..."
                  rows={8}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={loadExample} variant="outline" className="bg-gray-700 border-gray-600 text-white">
                  예제 불러오기
                </Button>
              </div>

              <Button 
                onClick={handleAnalyze} 
                disabled={loading || !logInput.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    분석 중...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    분석 시작
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">분석 결과</CardTitle>
              <CardDescription className="text-gray-300">
                보안 분석 결과
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Error Display */}
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>오류</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Result Display */}
              {result && (
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {result}
                  </p>
                </div>
              )}

              {/* Placeholder */}
              {!result && !error && !loading && (
                <div className="text-center py-12 text-gray-400">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>로그 데이터를 입력하고 분석을 시작하세요</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>🔒 초보자용 보안 로그 분석 도구</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
