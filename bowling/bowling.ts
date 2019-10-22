export default class Bowling {
    private rolls: Array<number>;

    constructor(rolls: Array<number>) {
        this.rolls = rolls;
    }

    private getCurrentScore(score: number, index: number): number {
        if (score < 0 || score > 10) {
            throw Error('Pins must have a value from 0 to 10');
        }
        let currentScore = score;
        const nextFirstScore = this.rolls[index + 1]; // [i + 1] score
        const nextSecondScore = this.rolls[index + 2]; // [i + 2] score
        if (score < 10) {
            if (typeof nextFirstScore !== 'number') {
                throw Error('Score cannot be taken until the end of the game');
            }

            if (score + nextFirstScore > 10) {
                throw Error('Pin count exceeds pins on the lane');
            }

            if (score + nextFirstScore === 10) {
                if (typeof nextFirstScore !== 'number' || typeof nextSecondScore !== 'number') {
                    throw Error('Score cannot be taken until the end of the game');
                }

                currentScore += (nextFirstScore + nextSecondScore);
            } else {
                currentScore += nextFirstScore;
            }
        } else {
            if (typeof nextFirstScore !== 'number' || typeof nextSecondScore !== 'number') {
                throw Error('Score cannot be taken until the end of the game');
            }

            if (nextFirstScore !== 10 && nextFirstScore + nextSecondScore > 10) {
                throw Error('Pin count exceeds pins on the lane');
            }

            currentScore += (nextFirstScore + nextSecondScore);
        }

        return currentScore;
    }

    private getFrames(): Array<number> {
        const frames = [];
        for (let i = 0; i < this.rolls.length; i += 1) {
            const framesLength = frames.length;
            if (framesLength < 10 ){
                frames.push(this.getCurrentScore(this.rolls[i], i));
                if (this.rolls[i] < 10) {
                    i++; // Manually increase i 1, due to this frame includes 2 turns
                }
            } else if (frames[9] < 10 && i < this.rolls.length) {
                throw Error('Should not be able to roll after game is over');
            }
        }
        return frames;
    }

    public score(): number {
        const frames = this.getFrames();
        if (frames.length < 10) {
            throw Error('Score cannot be taken until the end of the game');
        }
        return frames.reduce((total: number, num: number) => total + num);
    }

}