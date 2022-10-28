import { JSDOM } from 'jsdom';
import axe from 'axe-core';

export const getJSDOMFromUrl = async () => {
  try {
    // const dom = await JSDOM.fromURL('https://bit-solutions.me/');
    // console.log('dom ', dom.serialize());
    // const images = dom.window.document.querySelectorAll('img');

    // @ts-ignore
    const testAxe = await axe(dom);
    console.log('testAxe result ', testAxe);

    // const imagesArray: any[] = [];
    // images.forEach(image => {
    //   if (image.alt.length === 0) {
    //     imagesArray.push(image.outerHTML);
    //   }
    // });
    // return imagesArray;
  } catch (error) {
    console.error('Wystąpił błąd :( ', error);
  }
};
