export const ArgumentError = 'Error';

type Operator  = 'minus' | 'plus' | 'divided' | 'multiplied' | 'raised';

export class WordProblem {
    private question: string;

    constructor(question: string) {
        this.question = question;
    }

    private parseString(): Array<string | number> {
        const regex = /(plus|minus|divided|multiplied|raised|((-*)\d+))/g;
        return (this.question.match(regex) || []).map((val: string) => {
            const n = parseInt(val);
            if (isNaN(n)) {
                return val;
            }

            return n;
        });
    }

    private calculate(n1: number, n2: number, operator: Operator) {
        switch (operator) {
            case 'minus':
                return n1 - n2;
            case 'plus':
                return n1 + n2;
            case 'divided':
                return n1 / n2;
            case 'multiplied':
                return n1 * n2;
            case 'raised':
                return Math.pow(n1, n2);
        }
    }

    public answer() {
        const parsedArr = this.parseString();
        if (parsedArr.length < 3) {
            throw Error(ArgumentError);
        }
        let i = 0;
        let val;
        while (parsedArr.length !== 1) {
            if (typeof parsedArr[i] === 'string') {
                const n1 = parsedArr[i - 1] as number;
                const n2 = parsedArr[i + 1] as number;
                val = this.calculate(n1, n2, parsedArr[i] as Operator);
                parsedArr.splice(i - 1, 3);
                parsedArr.unshift(val);

                i = 0;
            } else {
                i++;
            }
        }

        return parsedArr[0];
    }
}