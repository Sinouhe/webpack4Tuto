import kiwi from './Kiwi.jpg';
import './kiwi-image.scss';

class KiwiImage {
    
    render() {
        const img = document.createElement('img');
        img.src = kiwi;
        img.alt = 'Kiwi';
        img.classList.add('kiwi-image');

        const bodyElement = document.querySelector('body');
        bodyElement.appendChild(img);
    }

}

export default KiwiImage;