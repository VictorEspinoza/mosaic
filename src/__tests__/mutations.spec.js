import { IMAGES_FETCH } from '../store/mutations';
import images from './data.json';

describe('mutations', () => {
  it('IMAGES_FETCH', () => {
    const state = {
      images: []
    };
    //apply mutation
    IMAGES_FETCH(state, images);
    expect(state.images.length).toEqual(5)
  });
});



