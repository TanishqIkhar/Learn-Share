import { NextResponse } from 'next/server';

const BACKEND_URL = 'https://learnshare-api.onrender.com';

async function proxyRequest(request, { params }) {
  const path = (await params).path;
  const pathStr = Array.isArray(path) ? path.join('/') : path;
  const url = new URL(request.url);
  const targetUrl = `${BACKEND_URL}/api/${pathStr}${url.search}`;

  const headers = {};
  const authHeader = request.headers.get('Authorization');
  if (authHeader) headers['Authorization'] = authHeader;

  const contentType = request.headers.get('Content-Type');
  if (contentType && !contentType.includes('multipart')) {
    headers['Content-Type'] = contentType;
  }

  const method = request.method;
  const options = { method, headers };

  if (method !== 'GET' && method !== 'DELETE') {
    try {
      if (contentType && contentType.includes('multipart')) {
        options.body = await request.blob();
      } else {
        const body = await request.text();
        if (body) options.body = body;
      }
    } catch {}
  }

  try {
    const response = await fetch(targetUrl, options);
    const responseText = await response.text();
    return new NextResponse(responseText, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server is waking up, please try again in 30 seconds...' },
      { status: 503 }
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
