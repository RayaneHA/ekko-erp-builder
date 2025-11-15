import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData, useLocation } from '@remix-run/react';
import { useCallback, useEffect, useRef, useState } from 'react';

const PREVIEW_CHANNEL = 'preview-updates';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const previewId = params.id;

  if (!previewId) {
    throw new Response('Preview ID is required', { status: 400 });
  }

  // Extract path from URL (everything after /webcontainer/preview/{id})
  const url = new URL(request.url);
  const pathMatch = url.pathname.match(/^\/webcontainer\/preview\/[^/]+(\/.*)?$/);
  const path = pathMatch && pathMatch[1] ? pathMatch[1] : '/';

  return json({ previewId, path });
}

export default function WebContainerPreview() {
  const { previewId, path } = useLoaderData<typeof loader>();
  const location = useLocation();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const broadcastChannelRef = useRef<BroadcastChannel>();
  const [previewUrl, setPreviewUrl] = useState('');

  // Handle preview refresh
  const handleRefresh = useCallback(() => {
    if (iframeRef.current && previewUrl) {
      // Force a clean reload
      iframeRef.current.src = '';
      requestAnimationFrame(() => {
        if (iframeRef.current) {
          iframeRef.current.src = previewUrl;
        }
      });
    }
  }, [previewUrl]);

  // Notify other tabs that this preview is ready
  const notifyPreviewReady = useCallback(() => {
    if (broadcastChannelRef.current && previewUrl) {
      broadcastChannelRef.current.postMessage({
        type: 'preview-ready',
        previewId,
        url: previewUrl,
        timestamp: Date.now(),
      });
    }
  }, [previewId, previewUrl]);

  useEffect(() => {
    const supportsBroadcastChannel = typeof window !== 'undefined' && typeof window.BroadcastChannel === 'function';

    if (supportsBroadcastChannel) {
      broadcastChannelRef.current = new window.BroadcastChannel(PREVIEW_CHANNEL);

      // Listen for preview updates
      broadcastChannelRef.current.onmessage = (event) => {
        if (event.data.previewId === previewId) {
          if (event.data.type === 'refresh-preview' || event.data.type === 'file-change') {
            handleRefresh();
          }
        }
      };
    } else {
      broadcastChannelRef.current = undefined;
    }

    // Extract path from current location if not provided in loader
    const currentPath = location.pathname.replace(`/webcontainer/preview/${previewId}`, '') || path;
    const normalizedPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;

    // Construct the WebContainer preview URL with path
    const baseUrl = `https://${previewId}.local-credentialless.webcontainer-api.io`;
    const url = baseUrl + normalizedPath;
    
    console.log('[Preview] Setting preview URL:', {
      previewId,
      path: normalizedPath,
      fullUrl: url,
      locationPathname: location.pathname,
    });
    
    setPreviewUrl(url);

    // Set the iframe src
    if (iframeRef.current) {
      console.log('[Preview] Setting iframe src to:', url);
      iframeRef.current.src = url;
    }

    // Notify other tabs that this preview is ready
    notifyPreviewReady();

    // Cleanup
    return () => {
      broadcastChannelRef.current?.close();
    };
  }, [previewId, path, location.pathname, handleRefresh, notifyPreviewReady]);

  return (
    <div className="w-full h-full relative">
      {!previewUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary">
          <div className="text-center">
            <div className="text-lg font-medium mb-2">Loading preview...</div>
            <div className="text-sm text-bolt-elements-textSecondary">Preview ID: {previewId}</div>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="WebContainer Preview"
        className="w-full h-full border-none"
        sandbox="allow-scripts allow-forms allow-popups allow-modals allow-storage-access-by-user-activation allow-same-origin"
        allow="cross-origin-isolated"
        loading="eager"
        onLoad={(e) => {
          console.log('[Preview] Iframe loaded:', previewUrl);
          notifyPreviewReady();
        }}
        onError={(e) => {
          console.error('[Preview] Iframe error:', e, previewUrl);
        }}
      />
    </div>
  );
}
