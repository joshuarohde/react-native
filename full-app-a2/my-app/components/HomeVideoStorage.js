import videos from './VideoStorage';

export const homeVideoLayout = {
  main: videos.find(v => v.id === '-gNMU2gZ_iE') || {}, // Full-width main video
  featured: [
    videos.find(v => v.id === '6Sfb-WU0Ir8') || {},
    videos.find(v => v.id === 'bUWVfUbXwlY') || {},
  ],
};
