import Animate from '@/lib/Animate';

interface IOption {
    backgroundColor: string;
    rainColor: string;
}

class Element {

}

export default class RainAnimation extends Animate {
    private static readonly option: IOption = {
        backgroundColor: '#061928',
        rainColor: 'rgba(174,194,224,0.5)',
    }
    private elements: Element[] = [];
    constructor(width: number, height: number) {
        super();
        this.initRect(width, height);
        this.initData();
    }

    initData() {

    }

    draw() {
        if (!this.context) {
            return;
        }
        this.context.save();
        this.context.restore();
    }
}