import mongoose from "mongoose";

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export enum Tag {
    ARRAY = "array",
    LINKED_LIST = "linkedList",
    GRAPH = "graph",
    DP = "dp",
    STRING = "string",
}

export enum Language {
    JAVASCRIPT = "javascript",
    TYPESCRIPT = "typescript",
    PYTHON = "python",
    JAVA = "java",
    CPP = "cpp",
}

export interface ProblemDocument extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    difficulty: Difficulty;
    tags: Tag[];
    visibleTestCases: TestCase[];
    hiddenTestCases: TestCase[];
    starterCode: StarterCode[];
    problemCreator: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface TestCase {
    input: string;
    output: string;
    explanation?: string;
}

export interface StarterCode {
    language: Language;
    initialCode: string;
}

export interface CreateProblemDTO {
    title: string;
    description: string;
    difficulty: Difficulty;
    tags: Tag[];
    visibleTestCase: TestCase[];
    hiddenTestCase: TestCase[];
    starterCode: StarterCode[];
}

/**
 * What we RETURN to user
 * Includes ID, timestamps, and populated creator info
 */
export interface ProblemResponseDTO {
    id: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    tags: Tag[];
    visibleTestCases: TestCase[];
    // We DON'T return hiddenTestCases to users!
    starterCode: StarterCode[];
    problemCreator: {
        id: string;
        firstName: string;
        lastName: string;
        emailId: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

/**
 * What we use for LISTING problems (minimal data)
 */
export interface ProblemListResponseDTO {
    id: string;
    title: string;
    difficulty: Difficulty;
    tags: Tag[];
    createdAt: Date;
}
/**
 * What we use for JUDGING/EXECUTION
 * Includes hidden test cases but not sensitive creator info
 */
export interface ProblemForExecutionDTO {
    id: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    tags: Tag[];
    visibleTestCases: TestCase[];
    hiddenTestCases: TestCase[]; // Only included for backend execution
    starterCode: StarterCode[];
}

// ==========================================
// MAPPER FUNCTIONS (Transform data safely)
// ==========================================

/**
 * Converts a ProblemDocument to a safe ProblemResponseDTO
 * Hides hiddenTestCases and transforms creator
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toProblemResponse = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    problem: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    creator?: any,
): ProblemResponseDTO => {
    return {
        id: problem._id.toString(),
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        tags: problem.tags,
        visibleTestCases: problem.visibleTestCases,
        starterCode: problem.starterCode,
        problemCreator: creator
            ? {
                  id: creator._id.toString(),
                  firstName: creator.firstName,
                  lastName: creator.lastName,
                  emailId: creator.emailId,
              }
            : {
                  id: problem.problemCreator.toString(),
                  firstName: "Unknown",
                  lastName: "User",
                  emailId: "unknown@email.com",
              },
        createdAt: problem.createdAt,
        updatedAt: problem.updatedAt,
    };
};

/**
 * Converts to list response (minimal data for listing)
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toProblemListResponse = (problem: any): ProblemListResponseDTO => {
    return {
        id: problem._id.toString(),
        title: problem.title,
        difficulty: problem.difficulty,
        tags: problem.tags,
        createdAt: problem.createdAt,
    };
};

/**
 * Converts to execution format (includes hidden tests)
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toProblemForExecution = (problem: any): ProblemForExecutionDTO => {
    return {
        id: problem._id.toString(),
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        tags: problem.tags,
        visibleTestCases: problem.visibleTestCases,
        hiddenTestCases: problem.hiddenTestCases,
        starterCode: problem.starterCode,
    };
};
