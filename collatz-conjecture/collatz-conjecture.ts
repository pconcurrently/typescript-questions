class CollatzConjecture {
    
    public static steps(input: number): number {
        if (input < 1) {
            throw Error('Only positive numbers are allowed');
        }
        
        let output = input;
        let step = 0;

        while(output !== 1) {
            if (output % 2 === 0) {
                output = output / 2;
            } else {
                output = output * 3 + 1;
            }

            step++;
        }

        return step;
    }
}

export default CollatzConjecture