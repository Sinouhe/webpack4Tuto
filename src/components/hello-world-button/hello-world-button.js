import './hello-world-button.scss'


class helloWorldButton {

    buttonCssClass = 'hello-world-button';

    render() {
        const button = document.createElement('Button');
        button.innerHTML = 'hello world';
        button.classList.add(this.buttonCssClass);
        button.onclick = function() {
            const p = document.createElement('p');
            p.innerHTML = 'Hello world';
            p.classList.add('hello-world-text');
            body.appendChild(p);
        }
        const body = document.querySelector('body');
        body.appendChild(button);
    }

}

export default helloWorldButton;