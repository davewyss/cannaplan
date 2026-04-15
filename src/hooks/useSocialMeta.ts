import { useEffect } from 'react';
import { useLocation } from '../router';
import { updateSocialMeta, resetSocialMeta } from '../lib/socialMeta';

/**
 * Hook to update social meta tags based on current location
 * Should be called from the page component or App root
 */
export function useSocialMeta(
  title?: string,
  description?: string,
  image?: string,
  url?: string
): void {
  useEffect(() => {
    if (title || description || image) {
      updateSocialMeta({ title, description, image, url });
    } else {
      resetSocialMeta();
    }
  }, [title, description, image, url]);
}
