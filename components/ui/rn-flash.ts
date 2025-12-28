// Lightweight wrapper around 'react-native-flash-message' so the rest of the app
// can import a stable path. Install the dependency first (see README below).
import { hideMessage, showMessage as rnShowMessage } from 'react-native-flash-message';

export type RNFlashOptions = {
  message: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'danger';
  duration?: number;
};

export function showRNFlash(opts: RNFlashOptions) {
  rnShowMessage({
    message: opts.message,
    description: opts.description,
    type: opts.type ?? 'info',
    duration: opts.duration ?? 3000,
  });
}

export { hideMessage };

