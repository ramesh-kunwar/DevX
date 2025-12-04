import mongoose from "mongoose";
import { Difficulty, Language, ProblemDocument, Tag } from "./problem-types";

const problemSchema = new mongoose.Schema<ProblemDocument>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD],
        },
        tags: {
            type: [String],
            enum: Object.values(Tag),
            required: true,
        },
        visibleTestCases: [
            {
                input: {
                    type: String,
                    required: true,
                },
                output: {
                    type: String,
                    required: true,
                },

                explanation: {
                    type: String,
                    required: true,
                },
            },
        ],

        hiddenTestCases: [
            {
                input: {
                    type: String,
                    required: true,
                },
                output: {
                    type: String,
                    required: true,
                },
            },
        ],

        starterCode: [
            {
                language: {
                    type: String,
                    enum: Object.values(Language),
                    required: true,
                },
                initialCode: {
                    type: String,
                    required: true,
                },
            },
        ],

        problemCreator: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model<ProblemDocument>("Problem", problemSchema);
