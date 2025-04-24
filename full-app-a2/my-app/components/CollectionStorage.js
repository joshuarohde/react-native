import videos from './VideoStorage';

export const collections = [
  {
    id: 'p1',
    title: 'Lucas Is Looking For Love',
    about: 'Lucas navigates romance, confusion, and potential emotional collapse in this heartfelt pilot episode. In this collection, you will find the Original 1st Episode, a concept video, and a Unreleased 2nd Episode!',
    mainVideo: videos.find(v => v.id === '18QbgNnSjKk') || {},
    subVideos: [
      videos.find(v => v.id === '18QbgNnSjKk') || {},
      videos.find(v => v.id === 'zCMsRJuJBfQ') || {},
      videos.find(v => v.id === 'uiuruM6iyTU') || {},
    ],
  },
  {
    id: 'p2',
    title: 'This Trail I Walk Again',
    about: 'A hauntingly personal journey told through music and surreal promo shorts. This Collection has the Original Music Video as well as all lead up promos.',
    mainVideo: videos.find(v => v.id === 'poBqBgz53EE') || {},
    subVideos: [
        videos.find(v => v.id === 'poBqBgz53EE') || {},
        videos.find(v => v.id === 'kUhvES67V0k') || {},
        videos.find(v => v.id === 'X7WIDvxggZQ') || {},
        videos.find(v => v.id === 'dUnZWnDITUc') || {},
    ],
  },
];
