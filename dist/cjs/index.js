"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cypher = (statement, ...substitutions) => {
    // Get the array of string literals
    const literals = statement.raw;
    // Add each substitution inbetween all
    const formatLiteral = literal => literal.split("\n").map(literal => literal.trim()).join("\n");
    const composed = substitutions.reduce((composed, substitution, index) => {
        // Format and add the string literal
        composed.push(formatLiteral(literals[index]));
        // Format and add the substution proceeding it
        if (substitution)
            composed.push(`\n${substitution.trim()}\n`);
        return composed;
    }, []);
    // Format and add the last literal
    composed.push(formatLiteral(literals[literals.length - 1]));
    return `statement: """${composed.join('').trim()}"""`;
};
exports.default = cypher;
