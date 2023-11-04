export default function parse(input: string): (string[] | CLI.Operator)[]
{
    input = input.trim();

    if (input === "")
        return [];

    let inString: boolean = false;
    let stringOpenedWith: "'" | '"' | null = null;

    const instructions: (string[] | CLI.Operator)[] = [[""]];
    let instructionIndex: number = 0;
    let keywordInInstructionIndex: number = 0;

    for (let i = 0; i < input.length; i++) {
        // if a string is opened (not yet closed)
        if (inString) {
            // checks if we want to close the string
            if (input[i] === stringOpenedWith) {
                inString = false;
                stringOpenedWith = null;

                // adds a keyword if it is not the last string in the instruction
                if (i < input.length - 1) {
                    (instructions[instructionIndex] as string[]).push("");
                    keywordInInstructionIndex++;
                }
            }
            // otherwise, adds the char into the instruction keyword
            else {
                (instructions[instructionIndex] as string[])[keywordInInstructionIndex] += input[i];
            }
        }
        // otherwise, checks for "system" tokens
        else {
            switch (input[i]) {
                case "'":
                case '"':
                case " ":
                    // handles string opening
                    if (input[i] !== " ") {
                        inString = true;
                        stringOpenedWith = input[i] as "'" | '"';
                    }

                    // adds a keyword in the instruction if the last one is not ""
                    if ((instructions[instructionIndex] as string[])[keywordInInstructionIndex] !== "") {
                        (instructions[instructionIndex] as string[]).push("");
                        keywordInInstructionIndex++;
                    }
                    break;
                case ";":
                    // unexpected as the first expression of the input
                    if (instructions[instructionIndex].length === 1 && instructions[instructionIndex][0] === "")
                        throw new Error(`\n${input}\n${" ".repeat(i)}^\n[Syntax] Unexpected token`);

                    // adds an instruction if it is not the last semicolon in the input
                    if (i < input.length -1) {
                        instructions.push(";")
                        instructions.push([""]);
                        instructionIndex += 2;
                        keywordInInstructionIndex = 0;
                    }
                    break;
                case "|":
                    // the simple pipe is not yet implemented -> checks this case
                    if (input[i + 1] !== "|")
                        throw new Error(`\n${input}\n${" ".repeat(i)}^\n[Syntax] Not implemented.`);

                    // checks if we got something after ||
                    if (i + 1 < input.length -1) {
                        instructions.push(";")
                        instructions.push([""]);
                        instructionIndex += 2;
                        keywordInInstructionIndex = 0;
                        // since we are looking for the first |, skips the second one
                        i++;
                    }
                    else
                        throw new Error(
                            `\n${input}\n${
                                " ".repeat(i + 2)
                            }^\n[Syntax] A pipeline chain operator must be followed by a pipeline.`
                        );

                    break;
                case ">":
                case "&":
                case "(":
                case ")":
                    throw new Error(`\n${input}\n${" ".repeat(i)}^\n[Syntax] Not yet implemented.`);
                default:
                    (instructions[instructionIndex] as string[])[keywordInInstructionIndex] += input[i];
            }
        }
    }

    if (inString)
        throw new Error(`\n${input}\n${" ".repeat(input.length)}^\n[Syntax] Unclosed string`);
    
    return instructions;
}
