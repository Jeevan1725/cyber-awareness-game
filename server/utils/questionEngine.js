import crypto from "crypto";
import VaultUsedQuestion from "../models/VaultUsedQuestion.js";

function questionHash(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export async function generateQuestion(userData) {

  if (!userData || !userData.securityAnswers) {
    return null;
  }

  const answers = Array.from(userData.securityAnswers.entries());

  let possibleQuestions = [];

  for (const [key, value] of answers) {

    if (!value) continue;

    const val = String(value);

    /* =========================
       SPECIAL LOGIC FOR AGE
    ========================= */

    if (key === "age") {

      const age = parseInt(val);

      if (isNaN(age)) continue;

      const numbers = [5, 10, 15, 20];

      for (const num of numbers) {

        const plus = age + num;
        const minus = age - num;

        if (plus <= 50) {
          possibleQuestions.push({
            question: `Enter your age + ${num}`,
            answer: String(plus)
          });
        }

        if (minus >= 0) {
          possibleQuestions.push({
            question: `Enter your age - ${num}`,
            answer: String(minus)
          });
        }

      }

      continue;
    }

    /* =========================
       NORMAL STRING QUESTIONS
    ========================= */

    if (val.length >= 1) {

      possibleQuestions.push({
        question: `Enter your ${key}`,
        answer: val
      });

    }

    if (val.length >= 2) {

      possibleQuestions.push({
        question: `Enter first 2 letters of your ${key}`,
        answer: val.slice(0, 2)
      });

      possibleQuestions.push({
        question: `Enter last 2 letters of your ${key}`,
        answer: val.slice(-2)
      });

    }

    if (val.length >= 3) {

      possibleQuestions.push({
        question: `Enter first 3 letters of your ${key}`,
        answer: val.slice(0, 3)
      });

    }

    possibleQuestions.push({
      question: `Enter length of your ${key}`,
      answer: String(val.length)
    });

  }

  if (possibleQuestions.length === 0) {
    return null;
  }

  /* =========================
     CHECK USED QUESTIONS
  ========================= */

  const used = await VaultUsedQuestion.find({
    userId: userData._id
  });

  const usedHashes = new Set(
    used.map(q => q.questionHash)
  );

  let available = possibleQuestions.filter(
    q => !usedHashes.has(questionHash(q.question))
  );

  /* =========================
     AUTO RESET QUESTIONS
  ========================= */

  if (available.length === 0) {

    await VaultUsedQuestion.deleteMany({
      userId: userData._id
    });

    available = possibleQuestions;

  }

  const selected =
    available[Math.floor(Math.random() * available.length)];

  return selected;
}


export async function markQuestionUsed(userId, questionText) {

  await VaultUsedQuestion.create({
    userId,
    questionHash: questionHash(questionText)
  });

}