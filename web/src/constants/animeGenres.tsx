import { cloneElement } from 'react';

import {
  Calendar,
  Fire,
  FlyingSaucer,
  Ghost,
  HandFist,
  Heart,
  HeartBreak,
  Heartbeat,
  Knife,
  MapTrifold,
  MaskHappy,
  MusicNotes,
  Scroll,
  Sword,
  Volleyball,
} from '@/libs/phosphor';

export const ANIME_GENRES: { [genre: string]: string } = {
  action: 'Action',
  adventure: 'Adventure',
  comedy: 'Comedy',
  'slice-of-life': 'Slice Of Life',
  'sci-fi': 'Sci-Fi',
  sports: 'Sports',
  fantasy: 'Fantasy',
  drama: 'Drama',
  music: 'Music',
  romance: 'Romance',
  supernatural: 'Supernatural',
  suspense: 'Suspense',
  seinen: 'Seinen',
  shoujo: 'Shoujo',
  shounen: 'Shounen',
};

function generateIcon(icon: JSX.Element) {
  return cloneElement(icon, {
    size: 32,
    weight: 'fill',
    className: 'text-yellow-500',
  });
}

export const ANIME_GENRES_ICON: { [key: string]: JSX.Element } = {
  action: generateIcon(<Fire />),
  adventure: generateIcon(<MapTrifold />),
  comedy: generateIcon(<MaskHappy />),
  'slice-of-life': generateIcon(<Calendar />),
  'sci-fi': generateIcon(<FlyingSaucer />),
  sports: generateIcon(<Volleyball />),
  fantasy: generateIcon(<Sword />),
  drama: generateIcon(<HeartBreak />),
  music: generateIcon(<MusicNotes />),
  romance: generateIcon(<Heart />),
  supernatural: generateIcon(<Ghost />),
  suspense: generateIcon(<Knife />),
  seinen: generateIcon(<Scroll />),
  shoujo: generateIcon(<Heartbeat />),
  shounen: generateIcon(<HandFist />),
};
