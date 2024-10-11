'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as fal from '@fal-ai/serverless-client';
import Image from 'next/image';

fal.config({
  credentials: process.env.FAL_KEY,
});

export default function ImageAnalysis() {
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    setIsLoading(true);
    setError('');
    setResult('');

    try {
      const result: any = await fal.subscribe('fal-ai/llava-next', {
        input: {
          image_url: imageUrl,
          prompt: prompt,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === 'IN_PROGRESS') {
            update.logs?.map((log) => log.message).forEach(console.log);
          }
        },
      });

      setResult(result.output);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setError('Failed to analyze image. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Image Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
              />
              <Button onClick={() => fileInputRef.current?.click()}>
                Upload Image
              </Button>
            </div>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Uploaded"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            )}
            <Textarea
              placeholder="Enter your prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              onClick={analyzeImage}
              disabled={isLoading || !imageUrl || !prompt}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Image'}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{result}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
