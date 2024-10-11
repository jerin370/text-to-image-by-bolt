'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as fal from '@fal-ai/serverless-client';
import Image from 'next/image';

fal.config({
  credentials: process.env.FAL_KEY,
});

export default function TextToImage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result: any = await fal.subscribe('fal-ai/fast-sdxl', {
        input: {
          prompt,
        },
      });
      if (result.images && result.images.length > 0) {
        setImageUrl(result.images[0].url);
      } else {
        throw new Error('No image generated');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Text to Image Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button onClick={generateImage} disabled={isLoading || !prompt}>
              {isLoading ? 'Generating...' : 'Generate Image'}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </CardContent>
      </Card>

      {imageUrl && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Generated Image</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={imageUrl}
              alt="Generated"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
