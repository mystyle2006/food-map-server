import { v4 as uuid } from 'uuid';
import * as path from 'path';

export const sanitizeFilename = (originalName: string): string => {
  const ext = path.extname(originalName); // 예: ".png"
  const base = path.basename(originalName, ext); // 확장자 제외 이름
  const safeBase = base.replace(/[^a-zA-Z0-9-_]/g, '_'); // 한글, 공백 등 -> _
  return `${uuid()}_${safeBase}${ext}`;
};
