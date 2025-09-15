import { NextResponse } from 'next/server';

export async function GET() {
  const assets = [
    {
      name: 'Hero Background',
      type: 'video',
      src: 'https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/hero-assets/Hero.mp4',
      poster: 'https://gakdaifdrumuvkttklha.supabase.co/storage/v1/object/public/hero-assets/poster.jpg',
    },
  ];

  return NextResponse.json(assets);
}